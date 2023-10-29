import React, { useState, useEffect, useRef } from 'react';

function PDFTokenViewer(props) {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/tokenize_pdf/${props.pdfTextId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTokens(data);
        // Save the tokens to the backend
        return fetch(`/save_tokens/${props.pdfTextId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tokens: data })
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save tokens.');
        }
        console.log("Tokens saved successfully.");
      })
      .catch(err => {
        setError(err);
        console.error("Error:", err);
      });
  }, [props.pdfTextId]);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <div className='mt-10 border-t-stone-700 border-black' id="tokenContainer">
        <h1>TOKENIZED</h1> <br/>
        {tokens.join(" token: ")}

      </div>
    </div>
  );
}

export default PDFTokenViewer;
