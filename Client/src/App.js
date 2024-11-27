import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem"
import {useEffect, useState} from 'react'


const App = () => {
const userEmail  = 'usman.qadir.cps@gmail.com'
const [tasks, setTasks] = useState(null)

 const getData = async () => {
  try {
    const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
    const json = await response.json()
    setTasks(json)


  } catch (err) {
    console.error(err) 
    
    
  }

 }
 useEffect( () => getData, [])

 console.log(tasks)

 /*sorting tasks*/

 const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      <ListHeader listName={' ✈️ Holiday Tick List'} getData = {getData} />
      {sortedTasks?.map((task) => <ListItem key = {task.id} task = {task} getData = {getData} /> )}

    </div>
  );
}

export default App;
