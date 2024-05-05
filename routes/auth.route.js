const express = require('express')
const {
	signup,
	signin,
	logout,
	getUsers,
} = require('../controllers/auth.controller')
const { getSessions } = require('../utils/manageSessions')

const router = express.Router()

// temporary route
router.get('/sessions', (_, res) => {
	const sessions = getSessions()
	res.status(200).json({ sessions })
})
// temporary route
router.get('/users', getUsers)

// public routes
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)

module.exports = router
