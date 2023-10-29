import React, { useState, useEffect } from "react";
import axios from "axios";

const AnnotationForm = () => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [annotations, setAnnotations] = useState([]);

  const fetchAnnotations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/annotations'); // Adjust URL if needed
      setAnnotations(res.data);
    } catch (error) {
      console.error('Could not fetch annotations:', error);
    }
  };

  useEffect(() => {
    fetchAnnotations();
  }, []);


  const addAnnotation = async () => {
    try {
      await axios.post("http://localhost:5000/add", {
        // Adjust URL if needed
        text,
        color,
      });
      setText("");
      setColor("#ffffff");
      await fetchAnnotations();
      console.log("Annotation added successfully");
    } catch (error) {
      console.log("Failed to add annotation:", error);
    }
  };

  const deleteAnnotation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      await fetchAnnotations();
    } catch (error) {
      console.error(`Could not delete annotation with id ${id}:`, error);
    }
  };
  

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Add Annotation</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addAnnotation();
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-1 p-2 w-16"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      <h1 className="text-2xl font-bold mb-4 mt-10">Annotations</h1>
      <ul>
        {annotations.map((annotation) => (
          <li
            key={annotation.id}
            className={`p-4 rounded mb-2 flex items-center justify-between ${
              annotation.color === "#ffffff"
                ? "bg-white text-black border border-gray-300"
                : "text-white"
            }`}
            style={{ backgroundColor: annotation.color }}
          >
            {annotation.text}
            <button
              onClick={() => deleteAnnotation(annotation.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnotationForm;
