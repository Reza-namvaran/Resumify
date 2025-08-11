package model

type Contact struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
	Github string `json:"github"`
	Linkedin string `json:"linkedin"`
	Website string `json:"website"`
}

type PersonalInfo struct {
	Name string `json:"name"`
	Photo string `json:"photo"`
	JobTitle string `json:"jobTitle"`
	Bio string `json:"bio"`
	ContactInfo Contact `json:"contact"` 
}

type Skill struct {
	Name string `json:"name"`
	Level string `json:"level"`
}


type Education struct {
	School      string `json:"school"`
	Major       string `json:"major"`
	Start       string `json:"start"`
	End         string `json:"end"`
	Description string `json:"description"`
}

type Experience struct {
	Organization string   `json:"organization"`
	Role         string   `json:"role"`
	Start        string   `json:"start"`
	End          string   `json:"end"`
	Achievements []string `json:"achievements"`
}

type Certificate struct {
	Name   string `json:"name"`
	Issuer string `json:"issuer"`
	Date   string `json:"date"`
	Link   string `json:"link"`
}

type Resume struct {
	ID string `json:"id"`
	Title string `json:"title"`
	PersonalInfo PersonalInfo `json:"personalInfo"`
	Skills []Skill `json:"skills"`
	Education   []Education  `json:"education"`
	Experience  []Experience `json:"experience"`
	Certificates []Certificate `json:"certificates"`
	Hobbies     []string     `json:"hobbies"`
}