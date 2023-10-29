import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PdfTextDisplay from "./PdfTextDisplay";

const PdfUpload = ({ onUploadSuccess }) => {
  const [pdfTexts, setPdfTexts] = useState([]);
  const [selectedPdfText, setSelectedPdfText] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const fetchPdfTexts = async () => {
    try {
      const res = await axios.get("/pdf_texts");
      setPdfTexts(res.data);
    } catch (error) {
      console.error("Failed to fetch PDF texts:", error);
    }
  };

  const uploadPdf = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/upload_pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Po úspešnom nahratí pridajte nový súbor do zoznamu pdfTexts
      setPdfTexts((prevPdfTexts) => [...prevPdfTexts, response.data]);
      // A nastavte ho ako aktuálny vybraný súbor pre zobrazenie
      setSelectedPdfText(response.data);

      setSelectedFile(null); // Clear the selected file after upload

      fetchPdfTexts(); // Re-fetch the list of PDFs after a successful upload
    } catch (error) {
      console.error("Failed to upload PDF:", error);
    }
  };

  const deletePdfText = async (id) => {
    try {
      await axios.delete(`/delete_pdf_text/${id}`);
      if (selectedPdfText && selectedPdfText.id === id) {
        setSelectedPdfText(null);
      }
      await fetchPdfTexts();
    } catch (error) {
      console.error("Failed to delete PDF text:", error);
    }
  };

  useEffect(() => {
    fetchPdfTexts();
  }, []);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const cancelUpload = (event) => {
    event.stopPropagation(); // Stops the click event from reaching the parent div
    setSelectedFile(null);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const enhancedUploadPdf = async () => {
    setIsUploading(true);
    await uploadPdf();
    setIsUploading(false);
  };
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">PDF Texts</h1>
      <div className="mt-5 border-dashed border-4 border-gray-400 rounded relative">
        <input
          type="file"
          accept=".pdf"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-0"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          ref={fileInputRef}
        />
        {selectedFile ? (
          <div className="flex items-center space-x-2 p-5">
            <span>{selectedFile.name}</span>
            <button
              onClick={cancelUpload}
              className="text-red-500 z-10 bg-white rounded-full p-1"
            >
              x
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 z-10">
            <p className="mb-2">Drag & Drop file here</p>
            <p className="mb-2">OR</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Browse Files
            </button>
          </div>
        )}
      </div>
      <button
        onClick={enhancedUploadPdf}
        disabled={!selectedFile || isUploading}
        className="mt-5 px-6 py-2 bg-green-500 text-white rounded shadow-lg hover:bg-green-600"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      <div className="mt-5">
        {pdfTexts.length > 0 && (
          <div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="w-1/3  border-b border-gray-200 bg-gray-50 text-left px-4 py-2 text-gray-600 uppercase tracking-wider">
                    Icon
                  </th>
                  <th className="w-1/3  border-b border-gray-200 bg-gray-50 text-left px-4 py-2 text-gray-600 uppercase tracking-wider">
                    Filename {/* Zmenili sme názov stĺpca */}
                  </th>
                  <th className="w-1/3  border-b border-gray-200 bg-gray-50 text-left px-4 py-2 text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pdfTexts.map((text) => (
                  <tr key={text.id} className="text-gray-700">
                    <td className="w-1/3 text-left py-3 px-4">
                      <i className="far fa-file-pdf text-xl"></i>
                    </td>
                    <td className="w-1/3 text-left py-3 px-4">
                      {text.filename}
                    </td>{" "}
                    {/* Zmenili sme z text.id na text.filename */}
                    <td className="w-1/3 text-left py-3 px-4">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => deletePdfText(text.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;
