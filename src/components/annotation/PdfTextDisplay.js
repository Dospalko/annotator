import React, { useState } from "react";
import PDFTokenViewer from "./PDFTokenViewer";

const PdfTextDisplay = ({ pdfTexts, onDelete }) => {
  const [selectedPdfText, setSelectedPdfText] = useState(null);
  const [showText, setShowText] = useState(false);
  const [showTokenizedText, setShowTokenizedText] = useState(false);

  const handleDelete = async (id) => {
    await onDelete(id);
    setSelectedPdfText(null); // Reset selected PDF text after deletion
    setShowText(false); // Hide the text display
    setShowTokenizedText(false); // Hide the tokenized text
  };

  return (
    <div className="my-4">
      {pdfTexts.length > 0 ? (
        <div className="flex items-center space-x-3">
          <label className="text-lg font-medium">Select PDF:</label>
          <select
            className="border rounded-md p-2 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 transition"
            onChange={(e) => {
              const selectedText = pdfTexts.find(
                (text) => text.id === parseInt(e.target.value)
              );
              setSelectedPdfText(selectedText);
              // If you want to auto-show the text upon selection:
              if (selectedText) {
                setShowText(true);
              }
            }}
          >
            <option value="">--Choose PDF--</option>
            {pdfTexts.map((text) => (
              <option key={text.id} value={text.id}>
                {text.filename} {/* Display filename instead of ID */}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-gray-500">No PDFs available for selection.</p>
      )}

      {selectedPdfText && (
        <div className="mt-5 border p-4 rounded">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setShowText(!showText)}
          >
            {showText ? "Hide Text" : "Show Text"}
          </button>
          <button
            className="px-4 py-2 ml-3 bg-red-500 text-white rounded"
            onClick={() => handleDelete(selectedPdfText.id)}
          >
            Delete
          </button>
          {showText && <p>{selectedPdfText.text}</p>}
          {/* Toggle button for tokenized text */}
          <button
            className="px-4 py-2 ml-3 bg-green-500 text-white rounded"
            onClick={() => setShowTokenizedText(!showTokenizedText)}
          >
            {showTokenizedText ? "Hide Tokens" : "Show Tokens"}
          </button>
          {showTokenizedText && (
            <PDFTokenViewer pdfTextId={selectedPdfText.id} />
          )}
        </div>
      )}
    </div>
  );
};

export default PdfTextDisplay;
