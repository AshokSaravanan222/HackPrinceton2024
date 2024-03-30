'use client'

import React from 'react'
import { useState, ChangeEvent,useEffect } from 'react'

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [labelDetails, setLabelDetails] = useState<string>('');

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files[0];
    setFile(selected);
  
    if (selected) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(selected);
        reader.onloadend = async () => {
          const base64Data = reader.result?.toString().split(',')[1]; 
          
          const s3_res = await fetch('https://jeiq0otl56.execute-api.us-east-2.amazonaws.com/default/slo-images', {
            method: 'POST',
            body: JSON.stringify({ image: base64Data })
          });

          
          const s3_data = await s3_res.json();
  
          const res = await fetch('http://localhost:5000/vision1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: s3_data.id })
          });
  
          const data = await res.json();
          setName(data[0].clothing_name);
        };
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChangeLabel = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files[0];
    setLabel(selected);
  
    if (selected) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(selected);
        reader.onloadend = async () => {
          const base64Data = reader.result?.toString().split(',')[1]; 
          
          const s3_res = await fetch('https://jeiq0otl56.execute-api.us-east-2.amazonaws.com/default/slo-images', {
            method: 'POST',
            body: JSON.stringify({ image: base64Data })
          });

          
          const s3_data = await s3_res.json();
  
          const res = await fetch('http://localhost:5000/vision2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: s3_data.id })
          });
  
          const data = await res.json();
          setLabelDetails(JSON.stringify(data));
        };
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) return

    const formData = new FormData()


  }

  useEffect(() => {
  }, [name, label]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <input type="file" onChange={handleChange} />
        {file && <img width={100} src={URL.createObjectURL(file)} alt="preview" />}
        <h1>{name}</h1>
        <input type="file" onChange={handleChangeLabel} />
        {label && <img width={100} src={URL.createObjectURL(label)} alt="preview" />}
        <h3>{labelDetails}</h3>
        <button onClick={handleSubmit}>Upload</button>
      </div>

    </main>
  )
}

export default Upload