package storage

import (
	"encoding/json"
	"errors"
	"os"
	"sync"

	"github.com/Reza-namvaran/Resumify/backend/internal/model"
)

type FileStorage struct {
	filePath string
	mu sync.Mutex
}

func NewFileStorage(filePath string) *FileStorage {
	return &FileStorage{filePath: filePath}
}

func (fs *FileStorage) load() ([]model.Resume, error) {
	file, err := os.ReadFile(fs.filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return []model.Resume{}, nil
		}
		return nil, err
	}

	var resumes []model.Resume
	if err := json.Unmarshal(file, &resumes); err != nil {
		return nil, err
	}

	return resumes, nil
}

func (fs *FileStorage) save(resumes []model.Resume) error {
	data, err := json.MarshalIndent(resumes, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(fs.filePath, data, 0644)
}

func (fs *FileStorage) GetAllResumes() ([]model.Resume, error) {
	fs.mu.Lock()
	defer fs.mu.Unlock()
	return fs.load()
}

func (fs *FileStorage) GetResumeByID(id string) (*model.Resume, error) {
	fs.mu.Lock()
	defer fs.mu.Unlock()

	resumes, err := fs.load()
	if err != nil {
		return nil, err
	}

	for _, r := range resumes {
		if r.ID == id {
			return &r, nil
		}
	}
	return nil, errors.New("resume not found")
}

func (fs *FileStorage) CreateResume(resume model.Resume) error {
	fs.mu.Lock()
	defer fs.mu.Unlock()

	resumes, err := fs.load()
	if err != nil {
		return err
	}

	resumes = append(resumes, resume)
	return fs.save(resumes)
}

func (fs *FileStorage) UpdateResume(resume model.Resume) error {
	fs.mu.Lock()
	defer fs.mu.Unlock()

	resumes, err := fs.load()
	if err != nil {
		return err
	}

	for i, r := range resumes {
		if r.ID == resume.ID {
			resumes[i] = resume
			return fs.save(resumes)
		}
	}
	return errors.New("resume not found")
}

func (fs *FileStorage) DeleteResume(id string) error {
	fs.mu.Lock()
	defer fs.mu.Unlock()

	resumes, err := fs.load()
	if err != nil {
		return err
	}

	for i, r := range resumes {
		if r.ID == id {
			resumes = append(resumes[:i], resumes[i+1:]...)
			return fs.save(resumes)
		}
	}
	return errors.New("resume not found")
}