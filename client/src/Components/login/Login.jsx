import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export default function Login() {
  const { loginWithPopup, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();


  function callApi() {
    axios.get('https://dinamitahostel.herokuapp.com/login').then(responds => console.log(responds.data)).catch(e=> console.log(e))
}

async function callProtected() {
   // axios.get('http://localhost:4000/protected').then(responds => console.log(responds.data)).catch(e=> console.log(e))
   try {

   const token = await getAccessTokenSilently();
   const responds = await axios.get('https://dinamitahostel.herokuapp.com.herokuapp.com/', {
      headers:{
         authorization:`Bearer ${token}`
      }
   });
   console.log(responds.data);
  } catch (error) {
    console.log(error);
  }
}






async function getProfile() {
    try {
      const token = await getAccessTokenSilently();
      
       const info = await axios.get('https://dinamitahostel.herokuapp.com/login/profile', {
         // const info = await axios.get('http://localhost:4000/login/profile', {
         headers:{
            authorization:`Bearer ${token}`
         }
       })
       console.log(info.data);
    } catch (error) {
       console.log(error);
    }
}

     return(
             //auth0
      <div className='App'>
         <ul>
            <li><button onClick={loginWithPopup}>login with Propup</button></li>
            <li><button onClick={logout}>logout</button></li>
         </ul>

           <h3>User is {isAuthenticated ? 'logged in ' : 'Not logged in'}</h3>
             
          <ul>
            <li><button onClick={callApi}>Call Api route</button></li>
            <li><button onClick={callProtected}>Call Protected Api route</button></li>
            <li><button onClick={getProfile}>Get info profile</button></li>
          </ul>

            {
               isAuthenticated && <pre style={{textAlign: 'start'}}>{JSON.stringify(user, null, 2)}</pre>
            }
      </div>
     );
}

