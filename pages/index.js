import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

const myprofile = () => {
  const router = useRouter();
    const [inputs,setInputs] =useState(null);


   useEffect(() =>{
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
          setInputs(data.user);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);


       })
       } 
   },[]);

    // useEffect( () =>  {
      
     
   
                 
             
       
    //   }, []);


     
  
  


      const handleUpdate= () =>{
          router.push('/updateprofile');
      } 

      const  handleLg = ()=>{
        localStorage.clear();
        router.push("/");
    }

  return (
    <>
    <div>
    
         <div style={{
          marginTop:'100px'
         }
         }>
         <h1 style={{ textAlign: 'center' }}>My Profile</h1>
         <div
           style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             flexDirection: 'column',
             maxWidth: '600px',
             margin: '0 auto',
           }}
         >
           <div style={{ marginBottom: '20px' }}>
             <label style={{ fontWeight: 'bold' }}>Name:</label>
             <span style={{ marginLeft: '10px' }}>{inputs?.username}</span>
           </div>
           <div style={{ marginBottom: '20px' }}>
             <label style={{ fontWeight: 'bold' }}>Bio:</label>
             <span style={{ marginLeft: '10px' }}>
               {inputs?.bio}
             </span>
           </div>
           <div style={{ marginBottom: '20px' }}>
             <label style={{ fontWeight: 'bold' }}>Age:</label>
             <span style={{ marginLeft: '10px' }}>{inputs?.age}</span>
           </div>
           <div style={{ marginBottom: '20px' }}>
             <label style={{ fontWeight: 'bold' }}>Mobile Number:</label>
             <span style={{ marginLeft: '10px' }}>{inputs?.mobile}</span>
           </div>
           <div style={{ marginBottom: '20px' }}>
             <label style={{ fontWeight: 'bold' }}>Email:</label>
             <span style={{ marginLeft: '10px' }}>{inputs?.email}</span>
           </div>
           
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
             }} onClick={handleUpdate}
           >
             Update My Profile
           </button>
           
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
       </div>
      
    </div>
   
    </>
  )
}


export default myprofile