import React from "react";
import { Link } from 'react-router-dom'

export default function ResumeList({ resumes, onDelete }) {
    if (resumes.length === 0) return <p>No resumes yet.</p>;

    return (
        <ul className="space-y-4">
          {resumes.map(r => (
            <li key={r.id} className="border rounded p-4 flex justify-between items-center">
              <Link to={`/edit/${r.id}`} className="text-blue-600 font-semibold hover:underline">
                {r.title}
              </Link>
              <button
                onClick={() => onDelete(r.id)}
                className="!bg-rose-700 text-sky-50 hover:!bg-red-800"
                aria-label={`Delete resume ${r.title}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      );
}