const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function getResumes() {
  const res = await fetch(`${API_URL}/resumes`);
  if (!res.ok) throw new Error(`Failed to fetch resumes: ${res.status}`);
  return res.json();
}

export async function getResumeById(id) {
  const res = await fetch(`${API_URL}/resumes/${id}`);
  if (!res.ok) throw new Error(`Resume not found: ${res.status}`);
  return res.json();
}

export async function createResume() {
  const newResume = {
    id: crypto.randomUUID(),
    title: "Untitled Resume",
    personalInfo: {
      name: "",
      photo: "",
      jobTitle: "",
      bio: "",
      contact: {
        email: "",
        phone: "",
        github: "",
        linkedin: "",
        website: ""
      }
    },
    skills: [],
    education: [],
    experience: [],
    certificates: [],
    hobbies: []
  };

  const res = await fetch(`${API_URL}/resumes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newResume),
  });

  if (!res.ok) throw new Error("Failed to create resume");
  return res.json();
}

export async function createResumeFromJSON(data) {  
  const res = await fetch(`${API_URL}/resumes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) return null;
  return await res.json();
}

export async function updateResume(updated) {
  const res = await fetch(`${API_URL}/resumes/${updated.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error(`Failed to update resume: ${res.status}`);
  return res.json();
}

export async function deleteResume(id) {
  const res = await fetch(`${API_URL}/resumes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete resume: ${res.status}`);
}
