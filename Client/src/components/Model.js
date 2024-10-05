import { useState } from "react";

const Model = ({mode, setShowModel}) => {

const editmode = mode === 'edit' ? true : false;

const [data, setData] = useState({
user_email: "", //* Set default value if needed
title: "",
progress: 0, //* Set default value if needed
date: editmode ? " " : new Date()
});

const handleChange = (e) => {
console.log("changing", e);
const { name, value } = e.target;


setData((data) => ({
  ...data,
  [name]: value,
}))



}

const handleSubmit = (event) => {
  event.preventDefault(); //* Prevent default form submission

  //* Access form data from state: data.user_email, data.title, etc.
  console.log("Form data:", data);

  //* Send data to server or perform other actions
  
}

return (
          <div className = "overlay">
            <div className = "modal">
              <div className = "form-title-container">
               <h3>Let's {mode} your task </h3>
               <button onClick = { () => setShowModel (false)} > X </button>
              </div>


    <form onSubmit={(event) => handleSubmit(event)}>

      <input
        required
        maxLength = {30}
        placeholder = "Your task goes here"
        name = "title"
        value = {data.title}
        onChange = {handleChange}
      />

      <br/>

      <label htmlFor = {'range'} >Drag to select your current progress </label>
      <input
        required
        type = "range"
        id = "range"
        min = "0"
        max = "100"
        name = "progress"
        value = {data.progress}
        onChange = {handleChange}
      />

      <input
        className = {mode} type="submit" value="Submit"
      />
    </form>
  </div>
</div>



)
}

export default Model;