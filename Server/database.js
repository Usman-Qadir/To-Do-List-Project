const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({

    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: 'To-Do-App-Project'
})

module.exports = pool;