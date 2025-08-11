import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as resumeService from '../api/resumeService';

// Section Editors
function PersonalInfoEditor({ info, onChange }) {
  const setField = (field, value) => onChange({ ...info, [field]: value });
  const setContactField = (field, value) =>
    onChange({ ...info, contact: { ...info.contact, [field]: value } });

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
      <input placeholder="Name" value={info.name} onChange={e => setField('name', e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="Photo URL" value={info.photo} onChange={e => setField('photo', e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="Job Title" value={info.jobTitle} onChange={e => setField('jobTitle', e.target.value)} className="border p-2 w-full mb-2" />
      <textarea placeholder="Bio" value={info.bio} onChange={e => setField('bio', e.target.value)} className="border p-2 w-full mb-2" />

      <h3 className="font-semibold mt-4 mb-2">Contact</h3>
      {['email', 'phone', 'github', 'linkedin', 'website'].map(key => (
        <input
          key={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={info.contact[key] || ''}
          onChange={e => setContactField(key, e.target.value)}
          className="border p-2 w-full mb-2"
        />
      ))}
    </div>
  );
}

function ListEditor({ title, items, onChange, fields }) {
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addItem = () => onChange([...items, fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})]);
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {items.map((item, idx) => (
        <div key={idx} className="border p-3 rounded mb-3">
          {fields.map(f => (
            <input
              key={f.name}
              placeholder={f.placeholder}
              value={item[f.name] || ''}
              onChange={e => updateItem(idx, f.name, e.target.value)}
              className="border p-2 w-full mb-2"
            />
          ))}
          <button
            onClick={() => removeItem(idx)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </div>
  );
}

function StringListEditor({ title, items, onChange }) {
  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const addItem = () => onChange([...items, '']);
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            value={item}
            onChange={e => updateItem(idx, e.target.value)}
            className="border p-2 flex-grow"
          />
          <button onClick={() => removeItem(idx)} className="bg-red-500 text-white px-3 py-1 rounded">X</button>
        </div>
      ))}
      <button onClick={addItem} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
    </div>
  );
}

// Main Edit Page
export default function EditResumePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    resumeService.getResumeById(id).then(res => {
      if (!res) {
        navigate('/');
        return;
      }
      setResume(res);
    });
  }, [id, navigate]);

  const handleSave = async () => {
    await resumeService.updateResume(resume);
    navigate('/');
  };

  if (!resume) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Edit Resume: <input
          value={resume.title}
          onChange={e => setResume({ ...resume, title: e.target.value })}
          className="border p-1 ml-2"
        />
      </h1>

      <PersonalInfoEditor
        info={resume.personalInfo}
        onChange={(val) => setResume({ ...resume, personalInfo: val })}
      />

      <ListEditor
        title="Skills"
        items={resume.skills}
        onChange={(val) => setResume({ ...resume, skills: val })}
        fields={[
          { name: 'name', placeholder: 'Skill Name' },
          { name: 'level', placeholder: 'Level (Beginner/Intermediate/Expert)' }
        ]}
      />

      <ListEditor
        title="Education"
        items={resume.education}
        onChange={(val) => setResume({ ...resume, education: val })}
        fields={[
          { name: 'school', placeholder: 'School/University' },
          { name: 'major', placeholder: 'Major' },
          { name: 'start', placeholder: 'Start Date' },
          { name: 'end', placeholder: 'End Date' },
          { name: 'description', placeholder: 'Description' }
        ]}
      />

      <ListEditor
        title="Experience / Projects"
        items={resume.experience}
        onChange={(val) => setResume({ ...resume, experience: val })}
        fields={[
          { name: 'org', placeholder: 'Organization / Project' },
          { name: 'role', placeholder: 'Role' },
          { name: 'start', placeholder: 'Start Date' },
          { name: 'end', placeholder: 'End Date' },
          { name: 'achievements', placeholder: 'Achievements' }
        ]}
      />

      <ListEditor
        title="Certificates"
        items={resume.certificates}
        onChange={(val) => setResume({ ...resume, certificates: val })}
        fields={[
          { name: 'name', placeholder: 'Certificate Name' },
          { name: 'issuer', placeholder: 'Issuer' },
          { name: 'date', placeholder: 'Date' },
          { name: 'link', placeholder: 'Link' }
        ]}
      />

      <StringListEditor
        title="Hobbies / Interests"
        items={resume.hobbies}
        onChange={(val) => setResume({ ...resume, hobbies: val })}
      />

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save
      </button>
    </div>
  );
}
