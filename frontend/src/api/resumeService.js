let resumes = [
    { id: 1, title: 'My First Resume', sections: []},
    { id: 2, title: 'Test Awsome Resume', sections: []}
]

let nextID = 3

export function getResumes() {
    return Promise.resolve([...resumes]);
}

export function getResumeById(id) {
    const resume = resumes.find(r => r.id === id);
    return Promise.resolve(resume ? { ...resume } : null);
}

export function createResume() {
    const newResume = { id: String(nextID++), title: 'Untitled Resume', sections: []};
    resumes.push(newResume);
    return Promise.resolve({ ...newResume });
}

export function updateResume(updated) {
    const index = resumes.findIndex(r => r.id === updated.id);
    if (index !== -1) {
      resumes[index] = { ...updated };
      return Promise.resolve({ ...resumes[index] });
    }
    return Promise.reject(new Error('Resume not found'));
  }
  
export function deleteResume(id) {
    resumes = resumes.filter(r => r.id !== id);
    return Promise.resolve();
}