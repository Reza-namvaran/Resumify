package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/Reza-namvaran/Resumify/backend/handler"
	"github.com/Reza-namvaran/Resumify/backend/internal/storage"
)

func main() {
	store := storage.NewFileStorage("resumes.json")
	resumeHandler := handler.NewResumeHandler(store)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Route("/resumes", resumeHandler.RegisterRoutes)

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
