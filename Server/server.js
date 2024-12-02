const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuid4 } = require('uuid')
const app = express()
const cors = require('cors')
const pool = require('./database')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')

app.use(cors())
app.use(express.json())

app.get('/todos/:userEmail', async (req,res) => {
    const {userEmail } = req.params

    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
       res.json({ todos: todos.rows, token });

    } catch (err) {
        console.error(err)

        res.status(500).json({ message: "Error creating todo" }); //! Send error response
    }
})

//* create a newtodo

app.post('/todos', async (req, res) => {
   const {user_email, title, progress, date} = req.body
   console.log(user_email, title, progress, date)
   const id = uuid4()

    try {
          const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1,$2, $3, $4, $5 )`,
        [id, user_email, title, progress, date])
      res.json(newToDo)

    } catch (err) {
       console.log(err) 
       res.status(500).json({message:"Error creating code"})
    }
})

//* edit a new todo

app.put('/todos/:id' , async(req, res) =>{
   const {id} = req.params
   const {user_email, title, progress, date } = req.body

   try {
    const editToDo = await pool.query('UPDATE todos SET user_email = $1, title =$2, progress = $3, date = $4 WHERE id = $5;',[user_email, title, progress, date, id])
    res.json(editToDo)
    }

    catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error updating todo" });
   }
}
)

//* delete a todo

app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
        res.json(deleteToDo)
    } catch (err) {
      console.log(err)  
    }
})

//* Sign UP

app.post('/signup', async (req, res) => {
    const {email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
    const signup = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2) ` ,
    [email, hashedPassword])

    const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        res.json({email, token})

} catch (err) {
    console.log(err)
}
})

//* Sign IN

app.post('/signin', async (req, res) => {
    const {email, password} = req.body
    try {
      const users =  await pool.query('SELECT * FROM users WHERE email = $1', [email]) 

      if (!users.rows.length) 
        return res.json({detail: 'User does not exist!'})

        const success = await bcrypt.compare(password, users.rows[0].hashedPassword)
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        
        if (success){
            res.json({'email' : users.rows[0].email, token})
        }
        else{
            res.json({detail: 'Login Failed'})
        }

    } catch (err) {
        console.log(err)
    }
    })

app.listen(PORT,() => console.log(`server running on PORT ${PORT}`))