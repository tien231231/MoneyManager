const express = require('express')
const cors = require('cors');
const dotenv = require("dotenv")
const {readdirSync} = require('fs')
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()

const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("conect to mongoDB >>>")
}) 

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()