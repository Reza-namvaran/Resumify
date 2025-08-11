let resumes = [
  {
    id: '1',
    title: 'Reza Namvaran Resume',
    personalInfo: {
      name: 'Reza Namvaran',
      photo: '',
      jobTitle: 'Software Engineer',
      bio: 'A short bio...',
      contact: {
        email: 'reza@example.com',
        phone: '',
        github: '',
        linkedin: ''
      }
    },
    skills: [
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'React', level: 'Intermediate' }
    ],
    education: [
      { school: 'BASU', major: 'CE', start: '2023', end: '2027', description: 'Studied CE' }
    ],
    experience: [
      { organization: 'test', role: 'Security Researcher', start: '2019', end: '2023', achievements: ['Pentest'] }
    ],
    certificates: [
      { name: 'AWS Certified', issuer: 'Amazon', date: '2022', link: '' }
    ],
    hobbies: ['Reading', 'Chess'],
  },
];
let nextId = resumes.length + 1;

function save() {
  localStorage.setItem('resumes', JSON.stringify(resumes));
}

export function getResumes() {
  return Promise.resolve(
    resumes.map(r => ({
      ...r,
      title: r.title || r.personalInfo?.name || 'Untitled Resume',
    }))
  );
}

export function getResumeById(id) {
  const resume = resumes.find(r => r.id === id);
  return Promise.resolve(resume ? { ...resume } : null);
}

export function createResume() {
  const newResume = {
    id: String(nextId++),
    title: 'Untitled Resume',
    personalInfo: {
      name: '',
      photo: '',
      jobTitle: '',
      bio: '',
      contact: {
        email: '',
        phone: '',
        github: '',
        linkedin: '',
        website: ''
      }
    },
    skills: [],
    education: [],
    experience: [],
    certificates: [],
    hobbies: []
  };
  resumes.push(newResume);
  save();
  return Promise.resolve({ ...newResume });
}

export function updateResume(updated) {
  const index = resumes.findIndex(r => r.id === updated.id);
  if (index !== -1) {
    resumes[index] = { ...updated };
    save();
    return Promise.resolve({ ...resumes[index] });
  }
  return Promise.reject(new Error('Resume not found'));
}

export function deleteResume(id) {
  resumes = resumes.filter(r => r.id !== id);
  save();
  return Promise.resolve();
}
