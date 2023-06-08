import React, { useState } from 'react'
// import {useDispatch} from 'react-redux';
// import { login } from '../redux/apiCalls';

import {useRouter} from 'next/router';

 const index = () => {
  const router = useRouter();
  const [inputs,setInputs] =useState({});
  const handleValidation = () => {
    const { password, confirmpassword, mobile,email } = inputs;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (password !== confirmpassword) {
     alert("confirm password and password has to be same")
      return false;
    
     } else if (mobile.length !== 10) {
      alert("contact number should be equal to 10 digits..");
      return false;
    } else if (!regex.test(email)){
      alert("email not valid");
      return false;
    }
    return true;
  };
   // const dispatch = useDispatch();
    const handleChange =(e)=>{
      setInputs(
        (prev) =>  {
    return        { ...prev,
          [e.target.name]:e.target.value}
        }
      )
      }
    const handleClick = async (e)=>{
      
        e.preventDefault();
       // login(dispatch,{username,password});
       console.log(inputs);
       handleValidation();
       const {username,password,age,email,mobile} =inputs;
       console.log("success");
        try {
          const data = {username,password,age,email,mobile};
          const res = await fetch('/api/register', {
              method: 'POST',
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({data})
          })
          console.log(res);
          //const {username,password} = data;
          if(res.status===200){
             
            const {username,password} = inputs;
                  localStorage.setItem(
                   "assessment",
                    JSON.stringify({username,password})
                  );
                 router.push("/");
                
              
          }
      } catch (error) {
          console.log(error);
      }
  }

    
  return (
    <div  style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <input style={{ padding: 10, marginBottom: 20 }} name="username" type='text' onChange={handleChange} placeholder='username' />
        <input style={{ padding: 10, marginBottom: 20 }} name="email" type='text' onChange={handleChange} placeholder='email' />
        <input style={{ padding: 10, marginBottom: 20 }} name="mobile" type='number' onChange={handleChange} placeholder='Mobile Number' />
        <input name="confirmpassword" type='password' style={{ padding: 10, marginBottom: 20 }} onChange={handleChange} placeholder='Password' />
        <input name="password" type='password' style={{ padding: 10, marginBottom: 20 }} onChange={handleChange} placeholder='Confirm Password' />
        <p>Already have An Account <a href="/login">Log In</a></p>
        <button style={{ padding: 10, width:100 }} onClick={handleClick}>Register</button>
    </div>
  )
}

export default index