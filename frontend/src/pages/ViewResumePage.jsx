import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as resumeService from "../api/resumeService";
import { Mail, Phone, Github, Linkedin, Award, Briefcase, GraduationCap, Heart } from "lucide-react";

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

  if (!resume) {
    return <p className="text-center mt-10 text-gray-500 animate-pulse">Loading resume...</p>;
  }

  const { personalInfo, skills, education, experience, certificates, hobbies } = resume;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl">
      {/* Personal Info */}
      <div className="flex items-center gap-6 border-b pb-6 mb-8">
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />
        )}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">{personalInfo.name || "Unnamed"}</h1>
          <p className="text-lg text-indigo-600 font-medium">{personalInfo.jobTitle}</p>
          <p className="mt-2 text-gray-600 italic">{personalInfo.bio}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
            {personalInfo.contact.email && (
              <span className="flex items-center gap-1"><Mail size={16} /> {personalInfo.contact.email}</span>
            )}
            {personalInfo.contact.phone && (
              <span className="flex items-center gap-1"><Phone size={16} /> {personalInfo.contact.phone}</span>
            )}
            {personalInfo.contact.github && (
              <a href={personalInfo.contact.github} className="flex items-center gap-1 text-indigo-600 hover:underline" target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub
              </a>
            )}
            {personalInfo.contact.linkedin && (
              <a href={personalInfo.contact.linkedin} className="flex items-center gap-1 text-indigo-600 hover:underline" target="_blank" rel="noreferrer">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <Section title="Skills">
        {skills.length === 0 ? (
          <EmptyText>No skills listed.</EmptyText>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm shadow-sm">
                {s.name} {s.level && `- ${s.level}`}
              </span>
            ))}
          </div>
        )}
      </Section>

      {/* Education */}
      <Section title="Education" icon={<GraduationCap size={20} />}>
        {education.length === 0 ? (
          <EmptyText>No education history.</EmptyText>
        ) : (
          education.map((edu, i) => (
            <div key={i} className="mb-4 border-l-4 border-indigo-400 pl-3">
              <p className="font-bold text-gray-800">{edu.school}</p>
              <p className="text-sm text-gray-600">{edu.major} ({edu.start} - {edu.end})</p>
              <p className="text-gray-500">{edu.description}</p>
            </div>
          ))
        )}
      </Section>

      {/* Experience */}
      <Section title="Experience / Projects" icon={<Briefcase size={20} />}>
        {experience.length === 0 ? (
          <EmptyText>No experience listed.</EmptyText>
        ) : (
          experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold text-gray-800">{exp.organization}</p>
              <p className="text-sm text-gray-600">{exp.role} ({exp.start} - {exp.end})</p>
              <ul className="list-disc pl-5 text-gray-600 mt-1">
                {exp.achievements?.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </Section>

      {/* Certificates */}
      <Section title="Certificates" icon={<Award size={20} />}>
        {certificates.length === 0 ? (
          <EmptyText>No certificates listed.</EmptyText>
        ) : (
          certificates.map((cert, i) => (
            <div key={i} className="mb-3">
              <p className="font-bold text-gray-800">{cert.name}</p>
              <p className="text-sm text-gray-600">{cert.issuer} - {cert.date}</p>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                  View Certificate
                </a>
              )}
            </div>
          ))
        )}
      </Section>

      {/* Hobbies */}
      <Section title="Hobbies / Interests" icon={<Heart size={20} />}>
        {hobbies.length === 0 ? (
          <EmptyText>No hobbies listed.</EmptyText>
        ) : (
          <ul className="list-disc pl-5 text-gray-600">
            {hobbies.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </Section>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <Link to="/" className="px-5 py-2 bg-gray-200 !text-gray-800 rounded-lg hover:bg-gray-300 !transition !duration-200 !ease-in-out hover:scale-105">
          Back
        </Link>
        <Link to={`/edit/${id}`} className="px-5 py-2 bg-indigo-600 !text-white rounded-lg shadow hover:bg-indigo-700 !transition !duration-200 !ease-in-out hover:scale-105">
          Edit Resume
        </Link>
      </div>
    </div>
  );
}

/* Reusable section component */
function Section({ title, children, icon }) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700 border-b pb-2 mb-3">
        {icon && <span className="text-indigo-500">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

function EmptyText({ children }) {
  return <p className="text-gray-500 italic">{children}</p>;
}
