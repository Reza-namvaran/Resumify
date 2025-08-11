package storage 

import "github.com/Reza-namvaran/Resumify/backend/internal/model"

type Storage interface {
	GetAllResumes() ([]model.Resume, error)
	GetResumeByID(id string) (*model.Resume, error)
	CreateResume(resume model.Resume) error
	UpdateResume(resume model.Resume) error
	DeleteResume(id string) error
}