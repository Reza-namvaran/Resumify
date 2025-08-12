import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResumes } from "../hooks/useResumes";
import ResumeList from "../components/ResumeList";
import TypingText from "../components/TypingText";
import ConfirmModal from "../components/ConfirmModal";
import ImportResumeModal from "../components/ImportResumeModal";
import * as resumeService from "../api/resumeService";
import { v4 as uuidv4 } from 'uuid';


export default function HomePage() {
  const { resumes, create, remove } = useResumes();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const [importOpen, setImportOpen] = useState(false);

  const handleImport = async (jsonData) => {
    try {
      const newResume = {
        ...jsonData,
        id: crypto.randomUUID ? crypto.randomUUID() : uuidv4(),
      };
      const created = await resumeService.createResumeFromJSON(newResume);
      if (created) {
        window.location.reload();
      }
    } catch (error) {
      alert("Failed to import resume: " + error.message);
    }
  };


  const handleCreate = async () => {
    const newResume = await create();
    navigate(`/edit/${newResume.id}`);
  };

  const openDeleteModal =(id) => {
    setSelectedResumeId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedResumeId) {
      remove(selectedResumeId);
      setModalOpen(false);
      setSelectedResumeId(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setSelectedResumeId(null);
  };

  return (
    <>
    <div className={`relative w-full h-full`}>
    <div className={`fixed inset-0 transition ${isModalOpen ? 'backdrop-blur-sm bg-opacity-40 pointer-events-auto' : 'pointer-events-none'}`}
      style={{ transition: 'backdrop-filter 0.3s ease, background-color 0.3s ease' }}></div>
    <main className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-8 transition-all duration-300`}>
      <h1 className="text-5xl font-extrabold text-white mb-10 tracking-tight drop-shadow-lg">
        Resumify
      </h1>

      <button
        onClick={handleCreate}
        className="mb-5 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg !transform !transition-transform duration-300 ease-in-out hover:scale-105 hover:!bg-gray-100 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Create new resume"
      >
        + Create New Resume
      </button>
      <button
            onClick={() => setImportOpen(true)}
            className="mb-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:!border-black !transform !transition-transform duration-300 ease-in-out hover:scale-105">
            Import Resume (JSON)
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
                  openDeleteModal(resume.id);
                }}
                className="mt-4 self-start !bg-rose-600 text-white px-3 py-1 rounded hover:!border-gray-100 hover:!bg-red-600 !transition !duration-300 !ease-in-out hover:scale-105" 
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      )}
      
    </main>
    </div>

    <ImportResumeModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImport}
      />



  <ConfirmModal
    isOpen={isModalOpen}
    onConfirm={confirmDelete}
    onCancel={cancelDelete}
    title="Delete Resume"
    message="Are you sure you want to delete this resume? This action cannot be undone."
  />
  </>
  );
}
