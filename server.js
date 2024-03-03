const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config() //load all env variable from .env

// parse incoming files as json
app.use(express.json())


// _connect to mongo_
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING) // get connection string from vscode

// get an instance of the connection
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to db ig'))

// _routes_
const routes = require('./routes/routes')
app.use(routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log('server running at port:' + PORT)
})
