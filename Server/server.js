const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./database')



app.get('/todos', async (req,res) => {
    try {
        
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT,() => console.log(`server running on PORT ${PORT}`))