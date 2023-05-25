import React, {useState, useRef} from 'react';
import * as Tone from 'tone';
import styles from './AudioUploader.module.css';

type AudioUploaderProps = {
  onAudioSelected: (audioBuffer: AudioBuffer | undefined) => void;
};

function AudioUploader({ onAudioSelected }: AudioUploaderProps) {
  // Ref for input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check if a file is uploaded
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  
  // Uploads file and converts it to an audio buffer
  const UploadFile = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);
        onAudioSelected(audioBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Sets Uploaded file if file is uploaded
  const handleFileUpload = (file : File) => {
    setUploadedFile(file);
  }

  // Drag and Drop functions
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      UploadFile(file);
      handleFileUpload(file);
    }
  };

  // Click functions
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      UploadFile(file);
      handleFileUpload(file);
    }
  };

  return (
    <div>
      {/* AudioUploader Component initialization */}
      <div
      className={styles.audioUploader}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      >

      {/* Input Audio File proprieties for click option */}
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />

      {/* AudioUploader Component displayed text */}
      <div className={styles.text}>
        {uploadedFile ? (
          <p>{uploadedFile.name}</p>
        ) : ( 
          <p>Click or Drag and drop an audio file here.</p>
        )}
      </div>
    </div>
  </div>
  );
}

export default AudioUploader;

