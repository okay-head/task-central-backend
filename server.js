const express = require('express')
const app = express()
require('dotenv').config() //load all env variable from .env

// parse incoming req body as json
app.use(express.json())

// -- routes --
const routes = require('./routes/routes')
app.use(routes)

// -- connect to MONGO --
const mongoose = require('mongoose')

mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => console.log('Connected to mongoDB 💾'))
	.catch((err) => console.log('Could not connect to mongoDB 🛑\n', err))

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log('server running at port: ' + PORT)
})
