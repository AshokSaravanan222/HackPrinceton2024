'use client'

import React from 'react'
import { useState, ChangeEvent } from 'react'

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files && e.target.files[0]
    setFile(selected)

    if (selected) {
      try {
        const base64_file = selected
        const formData = new FormData();
        formData.append('file', base64_file);

        const res = await fetch('http://127.0.0.1:5000/vision1', {
          method: 'POST',
          body: formData
        })

        const data = await res.json()
        setName(data.clothing_name)
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    const formData = new FormData()


  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <input type="file" onChange={handleChange} />
        {file && <img width={100} src={URL.createObjectURL(file)} alt="preview" />}
        <h1>{name}</h1>
        <button onClick={handleSubmit}>Upload</button>
      </div>

    </main>
  )
}

export default Upload