import React from "react";
import { useNavigate } from "react-router-dom";
import { useResumes } from "../hooks/useResumes";
import ResumeList from "../components/ResumeList";
import TypingText from "../components/TypingText";

export default function HomePage() {
  const { resumes, create, remove } = useResumes();
  const navigate = useNavigate();

  const handleCreate = async () => {
    const newResume = await create();
    navigate(`/edit/${newResume.id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold text-white mb-10 tracking-tight drop-shadow-lg">
        Your Resumes
      </h1>

      <button
        onClick={handleCreate}
        className="mb-10 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Create new resume"
      >
        + Create New Resume
      </button>

      {resumes.length === 0 ? (
        <TypingText text="No resumes yet. Start by creating a new one:)" speed={100}/>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer flex flex-col justify-between"
              onClick={() => navigate(`/view/${resume.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/view/${resume.id}`);
              }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2 truncate">
                {resume.title || "Untitled Resume"}
              </h2>
              <p className="text-gray-700 line-clamp-3">
                {resume.personalInfo?.bio || "No bio added yet."}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(resume.id);
                }}
                className="mt-4 self-start bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
