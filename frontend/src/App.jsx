import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EditResumePage from "./pages/EditResumePage.jsx";
import ViewResumePage from "./pages/ViewResumePage.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/Resumify">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditResumePage />} />
        <Route path="/view/:id" element={<ViewResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}
