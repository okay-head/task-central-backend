const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { clearServerSessions } = require('./utils/manageSessions.js')
const { checkLoginSession } = require('./middlewares/auth.middleware.js')

app.use(
	cors({
		// origin: ['http://localhost:5173/', 'https://taskcentral.netlify.app/'],
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
)
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -- routes --
const tasks = require('./routes/task.route.js')
const auth = require('./routes/auth.route.js')
const home = require('./routes/home.route.js')
app.use('/tasks', checkLoginSession, tasks) // 🔒
app.use('/auth', auth)
app.use('/', home)

// -- connect to MONGO --
const mongoose = require('mongoose')
mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => {
		console.log('Connected to mongoDB! 💾')

		// the server starts on an endpoint, iff connection to db is successful
		const port = process.env.PORT
		app.listen(port, () => {
			console.log('server running at port: ' + port + '\n')
			clearServerSessions() // periodically clear sessions after 24 hours
		})
	})
	.catch((err) =>
		console.log('Could not connect to mongoDB! 🛑\n\nError:\n', err)
	)
