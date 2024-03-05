const express = require('express')
const app = express()
require('dotenv').config() //load all env variable from .env
const cors = require('cors')

app.use(
	cors({
		// origin: ['http://localhost:5173/', 'https://taskcentral.netlify.app/'],
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
)

// parse incoming req body as json
app.use(express.json())

// -- routes --
const routes = require('./routes/routes')
app.use(routes)

// -- connect to MONGO --
const mongoose = require('mongoose')

mongoose
	.connect(process.env.CONNECTION_STRING)
	.then((db) => {
		console.log('Connected to mongoDB! 💾\n')

		// the server starts on an endpoint, iff connection to db is successful
		const PORT = process.env.PORT
		app.listen(PORT, () => {
			console.log('server running at port: ' + PORT)
		})
	})
	.catch((err) =>
		console.log('Could not connect to mongoDB! 🛑\n\nError:\n', err)
	)
