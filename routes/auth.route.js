const express = require('express')
const { signup, signin, logout } = require('../controllers/auth.controller')
const { getSessions } = require('../utils/manageSessions')

const router = express.Router()

router.get('/home', (req, res) => {
	console.log(req.auth)
	res
		.status(200)
		.json({ message: 'Protected route. Also temporary', more: req?.auth?.user })
})

router.get('/sessions', (_, res) => {
	const sessions = getSessions()
	res.status(200).json({ sessions })
})

// public routes
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)

module.exports = router
