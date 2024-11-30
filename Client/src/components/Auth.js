import { useState } from "react";
import {useCookies}  from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLoggedIn, setIsloggedIn] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
const viewSignIN = (status) => {
  setError(null)
  setIsloggedIn(status)
}

const handleSubmit = async (e, endPoint) => {
e.preventDefault()
if (!isLoggedIn && password !== confirmPassword){
  setError('Make sure confirm passwords match')
  return
}
 const response = await fetch (`${process.env.REACT_APP_SERVERURL}/${endPoint}`, {
  method: 'POST',
  headers: {'Content-Type' : 'application/json'},
  body: JSON.stringify({email, password})
 })
 console.log('Fetch URL:', `${process.env.REACT_APP_SERVERURL}/${endPoint}`);

 const data = await response.json()

 if (data.detail){
  setError(data.detail)
 }
 else{
  setCookie('Email', data.email)
  setCookie('authToken', data.token)

  window.location.reload()
 }
 console.log(data)
}

    return (
      <div className="auth-container">
        <div className="auth-container-box">
<form>
  <h2>{isLoggedIn ? 'Please log IN!': 'Please Sign UP!'} </h2>
  
  <input type = "email" placeholder = "email" onChange={(e) => setEmail(e.target.value)}/>
  <input type = "password" placeholder = "password" onChange={(e) => setPassword(e.target.value)}/>
  {! isLoggedIn && <input type = "password" placeholder = "confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>}
  <input type="submit" className="create" onClick = { (e) => handleSubmit(e, isLoggedIn ? 'signin': 'signup' )}/>
  {error && <p>{error}</p>}
</form>
<div className="auth-options">
<button onClick = {() => viewSignIN(false)} >Sign UP!</button>
<button onClick = {() => viewSignIN(true)} >Sign IN!</button>
</div>
        </div>
      </div>
    );
  }
  
  export default Auth;
   