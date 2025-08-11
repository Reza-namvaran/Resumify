import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as resumeService from '../api/resumeService';

export default function EditResumePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    resumeService.getResumeById(id).then(res => {
      if (!res) {
        navigate('/');
        return;
      }
      setResume(res);
      setTitle(res.title);
    });
  }, [id, navigate]);

  const handleSave = async () => {
    const updated = { ...resume, title };
    await resumeService.updateResume(updated);
    navigate('/');
  };

  if (!resume) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>
      <input
        className="border rounded p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
