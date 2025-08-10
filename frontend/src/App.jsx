import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditResumePage from './pages/EditResumePage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 flex gap-4">
        <Link to="/" className="font-bold text-lg text-blue-600">Resumify</Link>
      </nav>

      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditResumePage />} />
        </Routes>
      </main>
    </div>);
}