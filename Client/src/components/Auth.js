import { useState } from "react";

const Auth = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true)
  const [error, setError] = useState(null)
  
const viewSignIN = (status) => {
  setError(null)
  setIsloggedIn(status)
}
    return (
      <div className="auth-conatiner">
        <div className="auth-conatiner-box">
<form>
  <h2>{isLoggedIn ? 'Please log IN!': 'Please Sign UP!'} </h2>
  
  <input type = "email" placeholder = "email"/>
  <input type = "password" placeholder = "password"/>
  {! isLoggedIn && <input type = "password" placeholder = "confirm password"/>}
  <input type="submit" className="create"/>
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
   