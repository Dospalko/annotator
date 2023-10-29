import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AnnotationForm from '../components/annotation/AnnotationForm';
import PdfUpload from '../components/annotation/PdfUpload';
import FileUploader from '../components/annotation/FileUploader';
import PdfTextDisplay from '../components/annotation/PdfTextDisplay';
function FeaturesPage() {
  const [pdfTexts, setPdfTexts] = useState([]);
 

  const fetchPdfTexts = async () => {
    try {
      const res = await axios.get("/pdf_texts");
      setPdfTexts(res.data);
    } catch (error) {
      console.error("Failed to fetch PDF texts:", error);
    }
  };

  const deletePdfText = async (id) => {
    try {
      await axios.delete(`/delete_pdf_text/${id}`);
      await fetchPdfTexts();
    } catch (error) {
      console.error("Failed to delete PDF text:", error);
    }
  };
  const handleUploadSuccess = (updatedPdfTexts) => {
    setPdfTexts(updatedPdfTexts);
  };
  useEffect(() => {
    fetchPdfTexts();
  }, []);
  return (
    <div className='w-full h-full'>
      <Header/>
      <h1>Welcome to the Features Page</h1>
      <AnnotationForm/>
      <PdfUpload onUploadSuccess={handleUploadSuccess} />
      <FileUploader/>
      <PdfTextDisplay pdfTexts={pdfTexts} onDelete={deletePdfText} />
      <Footer/>
    </div>
  );
}

export default FeaturesPage;
