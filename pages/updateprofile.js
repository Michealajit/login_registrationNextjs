import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
const updateprofile = ({user}) => {
  console.log(user);
    

    const router = useRouter();
    const [inputs,setInputs] =useState(null);
    const [User,setUser] =useState(null);
    const handleValidation = () => {
      if(inputs['password'] !== undefined && inputs['confirmpassword'] === undefined){
        alert("confirm password can't be null");
          return false;
      }
      if(inputs['password'] === undefined && inputs['confirmpassword'] !== undefined){
        alert(" password can't be null");
          return false;
      }
      if(inputs['password'] !== undefined && inputs['confirmpassword'] !== undefined){
        const { password, confirmpassword} = inputs;
        if (password !== confirmpassword) {
          alert("confirm password and password has to be same")
           return false;
        }   
      }
      if(inputs['email'] !== undefined){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { email } = inputs;
        if (!regex.test(email)){
          alert("email not valid");
          return false;
        }
      }
     if(inputs['mobileNumber'] !== undefined){
      const { mobileNumber } = inputs;
      if (mobileNumber.length !== 10) {
        alert("contact number should be equal to 10 digits..");
        return false;
      }
     }
     
      return true;
    };

    useEffect(()=>{

      if (!localStorage.getItem( "assessment")) {
        router.push("/login");
        
       }else{

        const name = localStorage.getItem( "assessment");
        // console.log(name);
         const data = JSON.parse(name);
         const {username,password} = data;
        fetch('/api/myprofile',{
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({username})
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Process the fetched data
          setUser(data.user);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
     


       }
         
      
    },[]);
   
     



    




     
  const handleChange =(e)=>{
    setInputs(
      (prev) =>  {
  return        { ...prev,
        [e.target.id]:e.target.value}
      }
    )
    }
    const  handleLg = ()=>{
      localStorage.clear();
      router.push("/");
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
   // console.log(inputs);
   handleValidation();

    try {
      const name = localStorage.getItem( "assessment");
              // console.log(name);
               const data = JSON.parse(name);
               const {username,password} = data;
               console.log(username);
               inputs['id'] = User?._id;
               console.log(inputs);
      await fetch('/api/myprofile', {
          method: 'PUT',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({inputs})
      })
      router.push("/myprofile");
  } catch (error) {
      console.log(error);
  }
   };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    backgroundColor: '#fca311',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Update Profile</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Name:</label>
          <input
            type="text"
            id="name"
            value={User?.username}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="bio" style={labelStyle}>Bio:</label>
          <textarea
            id="bio"
            value={User?.bio}
            onChange={handleChange}
            style={inputStyle}
          ></textarea>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="age" style={labelStyle}>Age:</label>
          <input
            type="text"
            id="age"
            value={User?.age}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="mobileNumber" style={labelStyle}>Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={User?.mobile}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            value={User?.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="password"
            
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Update Profile</button>
      </form>
      <Link href="/" >
      <button
             style={{
               position: 'fixed',
               top: '20px',
               right: '20px',
               padding: '10px 20px',
               backgroundColor: '#fca311',
               color: '#fff',
               border: 'none',
               borderRadius: '4px',
               cursor: 'pointer',
             }}
           >
            My Profile
           </button>
           </Link>
           <button
             style={{
               position: 'fixed',
               top: '20px',
               left: '20px',
               padding: '10px 20px',
               backgroundColor: '#f54242',
               color: '#fff',
               border: 'none',
               borderRadius: '4px',
               cursor: 'pointer',
             }}
             onClick={handleLg}
           >
             Logout
           </button>
    </div>
  );
};





export default updateprofile;
