import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as resumeService from "../api/resumeService";
import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, Award, Heart, Phone, Mail, Trash2 } from "lucide-react";

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-indigo-600 w-6 h-6" />
      <h2 className="text-2xl font-semibold text-indigo-700 border-b border-indigo-200 pb-1">
        {children}
      </h2>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block mb-4">
      <span className="text-gray-700 font-medium mb-1 block">{label}</span>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-200 rounded-lg p-3 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
          rows={4}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
        />
      )}
    </label>
  );
}

function ListEditor({ title, items, onChange, fields, icon }) {
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addItem = () => {
    onChange([...items, fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {})]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 !bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
    >
      <SectionTitle icon={icon}>{title}</SectionTitle>
      {items.length === 0 && (
        <p className="mb-4 !text-gray-500 italic">No {title.toLowerCase()} added yet.</p>
      )}
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-4 border !text-gray-700 !border-gray-200 rounded-lg mb-4 !bg-gray-50 hover:!bg-white transition relative"
        >
          {fields.map(({ name, placeholder }) => (
            <Input
              key={name}
              label={placeholder}
              placeholder={placeholder}
              value={item[name]}
              onChange={(e) => updateItem(idx, name, e.target.value)}
            />
          ))}
          <button
            onClick={() => removeItem(idx)}
            className="absolute !py-1 !px-3 top-1 right-2 !bg-white !border-black !text-black hover:!bg-rose-600 hover:!border-white hover:!text-white text-xl font-bold"
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="mt-2 !bg-indigo-600 !text-white px-5 py-2 rounded-lg shadow hover:!bg-indigo-700 !transition duration-300 !ease-in-out hover:scale-105"
      >
        + Add {title}
      </button>
    </motion.section>
  );
}

export default function EditResumePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    resumeService.getResumeById(id).then((res) => {
      if (!res) {
        navigate("/");
        return;
      }
      setResume(res);
    });
  }, [id, navigate]);

  const handleSave = async () => {
    await resumeService.updateResume(resume);
    navigate("/");
  };

  if (!resume) return <p className="text-center mt-10 text-gray-700">Loading...</p>;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
          Edit Resume:
        </h1>
        <input
          value={resume.title}
          onChange={(e) => setResume({ ...resume, title: e.target.value })}
          className="w-full border-b-2 border-indigo-400 text-indigo-900 font-semibold text-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Resume Title"
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-lg text-gray-700"
      >
        <SectionTitle icon={User}>Personal Info</SectionTitle>
        <Input
          label="Name"
          placeholder="Your full name"
          value={resume.personalInfo.name}
          onChange={(e) =>
            setResume({ ...resume, personalInfo: { ...resume.personalInfo, name: e.target.value } })
          }
          className="!text-gray-700"
        />
        <Input
          label="Photo URL"
          placeholder="Link to your photo"
          value={resume.personalInfo.photo}
          onChange={(e) =>
            setResume({ ...resume, personalInfo: { ...resume.personalInfo, photo: e.target.value } })
          }
        />
        <Input
          label="Job Title"
          placeholder="Your current role"
          value={resume.personalInfo.jobTitle}
          onChange={(e) =>
            setResume({ ...resume, personalInfo: { ...resume.personalInfo, jobTitle: e.target.value } })
          }
        />
        <Input
          label="Bio"
          type="textarea"
          placeholder="Short bio about yourself"
          value={resume.personalInfo.bio}
          onChange={(e) =>
            setResume({ ...resume, personalInfo: { ...resume.personalInfo, bio: e.target.value } })
          }
        />
        <SectionTitle icon={Phone}>Contact Info</SectionTitle>
        {["email", "phone", "github", "linkedin", "website"].map((key) => (
          <Input
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            placeholder={`Your ${key}`}
            value={resume.personalInfo.contact[key]}
            onChange={(e) =>
              setResume({
                ...resume,
                personalInfo: {
                  ...resume.personalInfo,
                  contact: { ...resume.personalInfo.contact, [key]: e.target.value },
                },
              })
            }
          />
        ))}
      </motion.section>

      <ListEditor
        title="Skills"
        items={resume.skills}
        onChange={(val) => setResume({ ...resume, skills: val })}
        fields={[
          { name: "name", placeholder: "Skill Name" },
          { name: "level", placeholder: "Level (Beginner, Intermediate, Expert)" },
        ]}
        icon={Briefcase}
      />

      <ListEditor
        title="Education"
        items={resume.education}
        onChange={(val) => setResume({ ...resume, education: val })}
        fields={[
          { name: "school", placeholder: "School / University" },
          { name: "major", placeholder: "Major" },
          { name: "start", placeholder: "Start Date" },
          { name: "end", placeholder: "End Date" },
          { name: "description", placeholder: "Description" },
        ]}
        icon={GraduationCap}
      />

      <ListEditor
        title="Experience"
        items={resume.experience}
        onChange={(val) => setResume({ ...resume, experience: val })}
        fields={[
          { name: "organization", placeholder: "Organization / Project" },
          { name: "role", placeholder: "Role" },
          { name: "start", placeholder: "Start Date" },
          { name: "end", placeholder: "End Date" },
          { name: "achievements", placeholder: "Achievements (comma separated)" },
        ]}
        icon={Briefcase}
      />

      <ListEditor
        title="Certificates"
        className="!text-gray-700"
        items={resume.certificates}
        onChange={(val) => setResume({ ...resume, certificates: val })}
        fields={[
          { name: "name", placeholder: "Certificate Name" },
          { name: "issuer", placeholder: "Issuer" },
          { name: "date", placeholder: "Date" },
          { name: "link", placeholder: "Link" },
        ]}
        icon={Award}
      />

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <SectionTitle icon={Heart}>Hobbies / Interests</SectionTitle>
        {resume.hobbies.length === 0 && (
          <p className="mb-4 italic text-gray-500">No hobbies added yet.</p>
        )}
        <div className="flex flex-col gap-2">
          {resume.hobbies.map((hobby, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="text"
                className="flex-grow border p-3 !text-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={hobby}
                onChange={(e) => {
                  const newHobbies = [...resume.hobbies];
                  newHobbies[idx] = e.target.value;
                  setResume({ ...resume, hobbies: newHobbies });
                }}
                placeholder="Hobby or Interest"
              />
              <button
                onClick={() => {
                  setResume({
                    ...resume,
                    hobbies: resume.hobbies.filter((_, i) => i !== idx),
                  });
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={() => setResume({ ...resume, hobbies: [...resume.hobbies, ""] })}
            className="!bg-indigo-600 !text-white px-5 py-2 rounded-lg shadow hover:!bg-indigo-700 !transition duration-300 !ease-in-out hover:scale-102"
          >
            + Add Hobby / Interest
          </button>
        </div>
      </motion.section>

      {/* Sticky Action Bar (TODO: Improve)*/}
      <div className="sticky bottom-4 flex justify-end gap-4 bg-white p-4 rounded-xl shadow-lg border">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 !bg-gray-200 hover:!border-gray-300 !text-gray-900 rounded-lg shadow hover:!bg-gray-300 !transition duration-300 !ease-in-out hover:scale-105"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 !bg-green-600 text-white rounded-lg shadow hover:!bg-green-700 hover:!border-green-700 !transition duration-300 !ease-in-out hover:scale-105"
        >
          Save Resume
        </button>
      </div>
    </main>
  );
}
