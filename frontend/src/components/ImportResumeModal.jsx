import React, { useState } from "react";

const TEMPLATE = {  
    "title": "",
    "personalInfo": {
      "name": "",
      "photo": "",
      "jobTitle": "",
      "bio": ".",
      "contact": {
        "email": "",
        "phone": "",
        "github": "",
        "linkedin": "",
        "website": ""
      }
    },
    "skills": [
      { "name": "", "level": "" }
    ],
    "education": [
      {
        "school": "",
        "major": "",
        "start": "",
        "end": "",
        "description": ""
      }
    ],
    "experience": [
      {
        "organization": "",
        "role": "",
        "start": "",
        "end": "",
        "achievements": ["", ""]
      }
    ],
    "certificates": [
      {
        "name": "",
        "issuer": "",
        "date": "",
        "link": ""
      }
    ],        id: crypto.randomUUID ? crypto.randomUUID() : uuidv4(),

    "hobbies": ["", ""]
}

export default function ImportResumeModal({ isOpen, onClose, onImport }) {
    const [error, setError] = useState("");
    const [jsonText, setJsonText] = useState(JSON.stringify(TEMPLATE, null, 2));

    if (!isOpen) return null;

    const validateTemplate = (data) => {
        return Object.keys(TEMPLATE).every(key => key in data);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload= (event) => {
            try {
                const json = JSON.parse(event.target.result);
                if (!validateTemplate(json)) {
                    setError("Invalid JSON structure. Please follow the template.");
                    return;
                }

                onImport(json);
                onClose();
            } catch {
                setError("Invalid JSON file.");
            }
        };
        
        reader.readAsText(file);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 text-gray-500">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Import Resume</h2>
    
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              rows={8}
            />
    
            {error && <p className="text-red-500 mb-2">{error}</p>}
    
            <input
              type="file"
              accept="application/json"
              onChange={handleFileChange}
              className="hidden"
              id="resumeFileInput"
            />
    
            <div className="flex justify-between items-center mb-4 text-gray-900">
                Note: Use template above.
            </div>
    
            <div className="flex justify-end gap-2">
            <label
                htmlFor="resumeFileInput"
                className="mr-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer !transition !duration-200 !ease-in-out hover:scale-105"
              >
                Choose JSON File
              </label>

              <button
                onClick={onClose}
                className="px-4 py-2 !bg-gray-300 rounded hover:!border-gray-100 hover:!bg-gray-400 text-gray-900 !transition !duration-200 !ease-in-out hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  try {
                    const parsed = JSON.parse(jsonText);
                    if (!validateTemplate(parsed)) {
                      setError("Invalid JSON structure. Please follow the template.");
                      return;
                    }
                    onImport(parsed);
                    onClose();
                  } catch {
                    alert("Invalid JSON format.");
                  }
                }}
                className="px-4 py-2 !bg-green-600 !text-white rounded hover:!border-gray-100 hover:!bg-green-700 !transition !duration-200 !ease-in-out hover:scale-105"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      );
    
    
}