const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

app.use(
	cors({
		// origin: ['http://localhost:5173/', 'https://taskcentral.netlify.app/'],
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -- routes --
const tasks = require('./routes/task.route.js')
const home = require('./routes/home.route.js')
app.use('/tasks', tasks)
app.use('/', home)

// -- connect to MONGO --
const mongoose = require('mongoose')

mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => {
		console.log('Connected to mongoDB! 💾\n')

		// the server starts on an endpoint, iff connection to db is successful
		const port = process.env.PORT
		app.listen(port, () => {
			console.log('server running at port: ' + port)
		})
	})
	.catch((err) =>
		console.log('Could not connect to mongoDB! 🛑\n\nError:\n', err)
	)
