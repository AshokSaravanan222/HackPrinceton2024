'use client'

import React from 'react'
import { useState, ChangeEvent, useEffect } from 'react'

const Upload = () => {
  let setup = false;
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<File | null>(null);

  const [itemDetails, setItemDetails] = useState([{clothing_name: "", color: "", type:"", image_url: ""}]);
  const [labelDetails, setLabelDetails] = useState({});
  
  // const [itemName, setItemName] = useState<string>("");
  // const [itemColor, setItemColor] = useState<string>("");
  // const [itemImage, setItemImage] = useState<string>("");

  // const [materialName, setMaterialName] = useState<string>("");
  // const [materialPercent, setMaterialPercent] = useState<string>("");
  // const [materialRank, setMaterialRank] = useState<string>("");
  // const [materialDesc, setMaterialDesc] = useState<string>("");
  // const [materialImage, setMaterialImage] = useState<string>("");
  const [user, setUser] = useState({});

  const [coins, setCoins] = useState<string>("-1");




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
          setItemDetails(data);
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
          setLabelDetails(data);
        };
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmitClothes = async () => {
    if (!itemDetails || !labelDetails) return
    const formData = new FormData();
    formData.append('email', 'example@mail.com'); // Replace with actual email
    formData.append('name', itemDetails[0].clothing_name);
    formData.append('color', itemDetails[0].color);
    formData.append('type', itemDetails[0].type);
    formData.append('image', itemDetails[0].image_url);
    formData.append('label', JSON.stringify(labelDetails));

    const res = await fetch('http://localhost:5000/add_clothes', {
      method: 'POST',
      body: formData
    });
  }

  const handleSubmitUser = async () => {
    if (!file) return
    const formData = new FormData()
  }



  useEffect(() => {
    

  }, [itemDetails, labelDetails]);

  useEffect(() => {
    if (setup === true) return
    setup = true
    fetch('http://localhost:5000/count_coins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wallet: "0xb3ebA584B5DD1F2eF5270e937c8248ac38F48727" })
    })
      .then(res => res.json())
      .then(data => setCoins(data));

  }, []);


  if (coins === "-1") {
    return (<></>)
  }
  else return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <h1>My wallet has {coins} coins</h1>


        <form onSubmit={e => e.preventDefault()}>
          <input type="file" onChange={handleChange} />
          {file && <img width={100} src={URL.createObjectURL(file)} alt="preview" />}
          <h1>{JSON.stringify(itemDetails)}</h1>
          <input type="file" onChange={handleChangeLabel} />
          {label && <img width={100} src={URL.createObjectURL(label)} alt="preview" />}
          <h3>{JSON.stringify(labelDetails)}</h3>
          <button onClick={handleSubmitClothes}>Upload</button>
        </form>
      </div>

    </main>
  )
}

export default Upload