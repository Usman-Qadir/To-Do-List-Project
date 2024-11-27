import { useState } from "react";

const Model = ({mode, setShowModel, getData, task}) => {

const editmode = mode === 'edit' ? true : false;

const [data, setData] = useState({
user_email: editmode ? task.user_email : 'usman.qadir.cps@gmail.com', //* checking if date 
title: editmode ? task.title : '',
progress: editmode ? task.progress : 50, //* Set default value if needed
date: editmode ? task.date : new Date().toISOString()
});

const postData = async (e) => {
  e.preventDefault()
  try {
        const response = await fetch('http://localhost:8000/todos', 
        { method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
         })
         if (response.status === 200){
          console.log('WORKED')
          setShowModel(false)
          getData()
         }
  } catch (err) {
    console.log(err)
  }
}

//* edit a todo
const editData = async (e) => {
  e.preventDefault()
  try{
    const response = await fetch (`http://localhost:8000/todos/${task.id} `,
    {method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  if (response.status === 200){
    setShowModel(false)
    getData()
  }
  }
  catch (err){
    console.log(err)
  }

}


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


    <form onSubmit={editmode ? editData : postData}>


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

      <input className = {mode} type="submit" value="Submit"  />
    </form>
  </div>
</div>



)
}

export default Model;