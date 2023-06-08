import React, { useEffect, useState } from 'react'
// import {useDispatch} from 'react-redux';
// import { login } from '../redux/apiCalls';
import {useRouter} from 'next/router';

 const index = () => {
  const router = useRouter();
   // const dispatch = useDispatch();
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    useEffect(()=>{
      if(localStorage.getItem("assessment")){
        router.push("/myprofile");
      }
    }


    ,[]);
    const handleClick = async (e)=>{
        e.preventDefault();
       // login(dispatch,{username,password});
        try {
          const data = {username,password}
          const res = await fetch('/api/user', {
              method: 'POST',
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({username,password})
          })
          console.log(res);

          if(res.status===200){
             
     
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
        <input style={{ padding: 10, marginBottom: 20 }} name="username" type='text' onChange={e=>setUsername(e.target.value) } placeholder='Username' />
        <input name="password" type='password' style={{ padding: 10, marginBottom: 20 }} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
        <p>Don't have an Account <a href="/register">Create It</a></p>
        <button style={{ padding: 10, width:100 }} onClick={handleClick}>LOGIN</button>
    </div>
  )
}

export default index