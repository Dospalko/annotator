import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import Features from "./components/layout/Features";
import Works from "./components/layout/Works";
import Footer from "./components/layout/Footer";
import AnnotationForm from "./components/annotation/AnnotationForm";
import PdfUpload from "./components/annotation/PdfUpload";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";



// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />}  />
      </Routes>
    </Router>
  );
}

export default App;
