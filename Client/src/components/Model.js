import { useState } from "react";

const Model = () => {
  const [data , setData] = useState({
    user_email: "",
    title:"",
    progress:"",
    date:

  })

  const mode = "edit";
  const handleChange = () => {
    console.log ("changing")
  }
    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} your task  </h3>
            <button> X </button>
          </div>

<form>
  <input 
  required
  maxLength ={30}
  placeholder = "Your task goes here"
  name = "title"
  value = {""}
  onChange = {handleChange}
  />

   <br/>
<label for = "range ">Drag to select your current progress</label>
  <input 
  required 
  type = "range"
  id = "range"
  min="0"
  max ="100"
  name = "progress"
  value ={""}
  onChange = {handleChange}
  />
    

  <input className = {mode} type = "submit " />
</form>
        </div>
        
      </div>
    );
  }
  
  export default Model;
  