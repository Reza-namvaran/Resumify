import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as resumeService from "../api/resumeService";

export default function ViewResumePage() {
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

  if (!resume) return <p className="text-center mt-10">Loading...</p>;

  const { personalInfo, skills, education, experience, certificates, hobbies } = resume;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {/* Personal Info */}
      <div className="flex items-center gap-6 border-b pb-4 mb-4">
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-600">{personalInfo.name || "Unnamed"}</h1>
          <p className="text-gray-600">{personalInfo.jobTitle}</p>
          <p className="mt-2 text-gray-600">{personalInfo.bio}</p>
          <div className="mt-2 text-sm text-gray-500 space-x-4">
            {personalInfo.contact.email && <span>📧 {personalInfo.contact.email}</span>}
            {personalInfo.contact.phone && <span>📱 {personalInfo.contact.phone}</span>}
            {personalInfo.contact.github && (
              <a href={personalInfo.contact.github} className="text-blue-600" target="_blank" rel="noreferrer">GitHub</a>
            )}
            {personalInfo.contact.linkedin && (
              <a href={personalInfo.contact.linkedin} className="text-blue-600" target="_blank" rel="noreferrer">LinkedIn</a>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-600">Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills listed.</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-600">
            {skills.map((s, i) => (
              <li key={i}>{s.name} {s.level && `- ${s.level}`}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-600">Education</h2>
        {education.length === 0 ? (
          <p className="text-gray-500">No education history.</p>
        ) : (
          education.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold text-gray-600">{edu.school}</p>
              <p className="text-sm text-gray-600">{edu.major} ({edu.start} - {edu.end})</p>
              <p className="text-gray-600">{edu.description}</p>
            </div>
          ))
        )}
      </section>

      {/* Experience */}
      <section className="mb-6 text-gray-600">
        <h2 className="text-xl font-semibold mb-2">Experience / Projects</h2>
        {experience.length === 0 ? (
          <p className="text-gray-500">No experience listed.</p>
        ) : (
          experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{exp.organization}</p>
              <p className="text-sm">{exp.role} ({exp.start} - {exp.end})</p>
              <ul className="list-disc pl-5 text-gray-600">
                {exp.achievements?.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      {/* Certificates */}
      <section className="mb-6 text-gray-600">
        <h2 className="text-xl font-semibold mb-2">Certificates</h2>
        {certificates.length === 0 ? (
          <p className="text-gray-500">No certificates listed.</p>
        ) : (
          certificates.map((cert, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{cert.name}</p>
              <p className="text-sm">{cert.issuer} - {cert.date}</p>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noreferrer" className="text-blue-600">
                  View Certificate
                </a>
              )}
            </div>
          ))
        )}
      </section>

      {/* Hobbies */}
      <section className="text-gray-600">
        <h2 className="text-xl font-semibold mb-2">Hobbies / Interests</h2>
        {hobbies.length === 0 ? (
          <p className="text-gray-500">No hobbies listed.</p>
        ) : (
          <ul className="list-disc pl-5">
            {hobbies.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Back & Edit */}
      <div className="mt-6 flex gap-4">
        <Link to="/" className="px-4 py-2 bg-gray-300 !text-gray-800 rounded !hover:bg-gray-400">Back</Link>
        <Link to={`/edit/${id}`} className="px-4 py-2 bg-blue-600 !text-white rounded !hover:bg-blue-700">
          Edit Resume
        </Link>
      </div>
    </div>
  );
}
