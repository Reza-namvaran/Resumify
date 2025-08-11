import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumes } from '../hooks/useResumes';
import ResumeList from '../components/ResumeList';

export default function HomePage() {
  const { resumes, create, remove } = useResumes();
  const navigate = useNavigate();

  const handleCreate = async () => {
    const newResume = await create();
    navigate(`/edit/${newResume.id}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
        <h1 className="text-3xl font-bold mb-4 text-stone-700">Your Resumes</h1>
        <button
          onClick={handleCreate}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:!bg-green-600"
        >
          Create New Resume
        </button>
        <ResumeList resumes={resumes} onDelete={remove} />
      </div>
    </div>
  );
}
