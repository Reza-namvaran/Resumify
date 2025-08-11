import { useState, useEffect } from 'react';
import * as resumeService from '../api/resumeService';

export function useResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    resumeService.getResumes().then(setResumes);
  }, []);

  const create = async () => {
    const newResume = await resumeService.createResume();
    setResumes(prev => [...prev, newResume]);
    return newResume;
  };

  const remove = async (id) => {
    await resumeService.deleteResume(id);
    setResumes(prev => prev.filter(r => r.id !== id));
  };

  return {
    resumes,
    create,
    remove,
  };
}
