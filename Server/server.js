const PORT = process.env.PORT ?? 8000;
const express = require('express');
const { v4: uuid4 } = require('uuid');
const app = express();
const cors = require('cors');
const pool = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

//* Get todos by user email

app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params;

    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        const token = jwt.sign({ email: userEmail }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ todos: todos.rows, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching todos" });
    }
});

//* Create a new todo

app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuid4();

    try {
        const newToDo = await pool.query(
            `INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`,
            [id, user_email, title, progress, date]
        );
        res.status(201).json({ message: "Todo created successfully", id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating todo" });
    }
});

//* Edit a todo

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;

    try {
        await pool.query(
            'UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5',
            [user_email, title, progress, date, id]
        );
        res.json({ message: "Todo updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating todo" });
    }
});

//*  Delete a todo

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting todo" });
    }
});

//*  Sign up

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        await pool.query(
            `INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
            [email, hashedPassword]
        );
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ email, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error signing up" });
    }
});

//* Sign in

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (!users.rows.length) {
            return res.status(404).json({ detail: 'User does not exist!' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, users.rows[0].hashed_password);
        if (isPasswordCorrect) {
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ email: users.rows[0].email, token });
        } else {
            res.status(401).json({ detail: 'Login failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error signing in" });
    }
});



app.listen(PORT,() => console.log(`server running on PORT ${PORT}`))