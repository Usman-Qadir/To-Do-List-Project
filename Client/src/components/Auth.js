import { useState } from "react";

const Auth = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  
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

 const data = await response.json()
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
  <input type="submit" className="create" onClick = { (e) => handleSubmit(e, isLoggedIn ? 'Sign IN': 'Sign UP' )}/>
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
   