import React, { useEffect, useState } from 'react'
import clevertap from 'clevertap-web-sdk'
import crypto from 'crypto'

const CreateUser = () => {

  const [formData, setFormData]=useState({
    name:"",
    email:"",
    phone:"",
    gender:""
  })

  const [user,setUser]=useState('')

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

  function generateIdentity() {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

  const handleSubmit=(e)=>{
    e.preventDefault();

    const identity=generateIdentity()

    clevertap.onUserLogin.push({
      "Site":{
        "Name":formData.name,
        "Email":formData.email,
        "Phone":formData.phone,
        "Gender": formData.gender,
        "Identity":identity,
        "MSG-email": true,
        "MSG-push": true
      }
    })

  alert(`User synced to Account: ${clevertap.getCleverTapID()}`);
  setFormData({ name: '', email: '', phone: '', gender: '' });
  
  // const u=getCookie("WZRK_G")
  // console.log(u);
  // setUser(u)
    console.log(getCookie("WZRK_G"))
  }

  function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }

  return null;
}

const handleUpdate = () => {
  clevertap.profile.push({
    Site: {
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone,
      Gender: formData.gender,
    }
  });

  alert(`Profile updated for ${clevertap.getCleverTapID()}`);
};


  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-md font-sans">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile Info</h2>
        <h2>Current user:{user}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="p-2.5 text-base border border-gray-300 rounded-md outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
            className="p-2.5 text-base border border-gray-300 rounded-md outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Phone (Include Country Code)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+14155551234"
            required
            className="p-2.5 text-base border border-gray-300 rounded-md outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="p-2.5 text-base bg-white border border-gray-300 rounded-md outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="mt-2 p-3 text-base font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 transition duration-150 cursor-pointer text-center"
        >
            Create User
        </button>
        <button
  type="button"
  onClick={handleUpdate}
  className="mt-2 p-3 text-base font-bold text-white bg-green-600 rounded-md"
>
  Update Profile
</button>
        

      </form>
    </div>
  )
}

export default CreateUser