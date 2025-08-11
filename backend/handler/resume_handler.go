package handler

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/Reza-namvaran/Resumify/backend/internal/model"
	"github.com/Reza-namvaran/Resumify/backend/internal/storage"
)

type ResumeHandler struct {
	store storage.Storage
}

func NewResumeHandler(store storage.Storage) *ResumeHandler {
	return &ResumeHandler{store: store}
}

func (h *ResumeHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	resumes, err := h.store.GetAllResumes()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(resumes)
}

func (h *ResumeHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	resume, err := h.store.GetResumeByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(resume)
}

func (h *ResumeHandler) Create(w http.ResponseWriter, r *http.Request) {
	var resume model.Resume
	if err := json.NewDecoder(r.Body).Decode(&resume); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if resume.ID == "" {
		http.Error(w, "missing ID", http.StatusBadRequest)
		return
	}
	if err := h.store.CreateResume(resume); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resume)
}

func (h *ResumeHandler) Update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var resume model.Resume
	if err := json.NewDecoder(r.Body).Decode(&resume); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	resume.ID = id
	if err := h.store.UpdateResume(resume); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(resume)
}

func (h *ResumeHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := h.store.DeleteResume(id); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *ResumeHandler) RegisterRoutes(r chi.Router) {
	r.Get("/", h.GetAll)
	r.Get("/{id}", h.GetByID)
	r.Post("/", h.Create)
	r.Put("/{id}", h.Update)
	r.Delete("/{id}", h.Delete)
}
