import React, { useRef } from 'react';
import { Mic } from 'lucide-react';
const AudioRecorder = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      console.log(file);
      formData.append('file', file);

      fetch('http://0.0.0.0:8000/chat/voice-chat', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              throw new Error(`Error: ${errorData.message}`);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <>
      <button 
        size="icon" 
        variant="secondary" 
        onClick={handleButtonClick}
      >
        <div className="p-2">
          <Mic className="h-5 w-5" />
        </div>
      </button>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
    </>
  );
};

export default AudioRecorder;

