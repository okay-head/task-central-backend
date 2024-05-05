const User = require('../models/user.model')
const crypto = require('crypto')
const {
	addSession,
	removeSession,
	findSession,
} = require('../utils/manageSessions')

const signup = async (req, res) => {
	// create a user
	const { username, email, password } = req.body
	try {
		if (!username || !email || !password)
			throw new Error('Request body has insufficient fields')
		const response = await User.create({
			username,
			email,
			password: password && crypto.hash('sha256', password.toString()),
		})

		// a middleware will grab the sess id from cookie, find user id, then map it to req.auth.id
		// another middleware will check if the user is logged in

		// Now you have the entire user object, take the id and link it to session
		const session_id = crypto.randomUUID()
		res.cookie('session_id', session_id.toString(), {
			maxAge: 86400000,
			httpOnly: true,
		})
		addSession(session_id, response._id)

		res.status(200).json(response)
	} catch (error) {
		const errMsg = error?.message || 'Signup failed'
		res.status(400).json({ message: errMsg })
	}
}

const signin = async (req, res) => {
	const { session, user } = req.body
	// mock code remove later
	addSession(session, user)
	res.status(200).json({ message: 'handle signin' })
}

const logout = async (req, res) => {
	try {
		const cookie = req.cookies
		if (!cookie || Object.keys(cookie).length == 0)
			// no cookies
			throw new Error('You must login first!')

		if (!findSession(cookie.session_id)) {
			// cookie present but not session
			res.cookie('session_id', false, { maxAge: 0 })
			throw new Error("Session timed out! You've been logged out")
		}

		// if all goes well, logout user
		removeSession(cookie.session_id) // remove from server memory
		res.cookie('session_id', false, { maxAge: 0 }) // invalidate user cookie
		res.status(200).json({ message: 'Logged out' })
	} catch (error) {
		const errMsg = error?.message || 'Logout failed'
		res.status(400).json({ message: errMsg })
	}
}

module.exports = { logout, signin, signup }
