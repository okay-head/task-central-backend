const User = require('../models/user.model')
const { createHash } = require('../utils/createHash')
const {
	addSession,
	removeSession,
	findSession,
} = require('../utils/manageSessions')

// const getUsers = async (req, res) => {
// 	try {
// 		const response = await User.find().sort({ createdAt: -1 })
// 		res.status(200).json(response)
// 	} catch (error) {
// 		const errMsg = error?.message || 'Logout failed'
// 		res.status(400).json({ message: errMsg })
// 	}
// }

const signup = async (req, res) => {
	// create a user
	const { username, email, password } = req.body
	try {
		if (!username || !email || !password)
			throw new Error('Request body has insufficient fields')
		const doc = await User.create({
			username,
			email,
			password: password && createHash(password),
		})

		// a middleware will grab the sess id from cookie, find user id, then map it to req.auth.id
		// another middleware will check if the user is logged in

		// Now you have the entire user object, take the id and link it to session
		const session_id = crypto.randomUUID()
		res.cookie('session_id', session_id.toString(), {
			maxAge: 86400000,
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		})
		addSession(session_id, doc._id)

		res.status(200).json(doc)
	} catch (error) {
		const errMsg = error?.message || 'Signup failed'
		res.status(400).json({ message: errMsg })
	}
}

const signin = async (req, res) => {
	const { email, password } = req.body
	try {
		if (!email || !password)
			throw new Error('Request body has insufficient fields')

		// first check if email exists
		let doc = await User.findOne({
			email: email,
		})
		if (!doc) throw new Error('User not found')

		// then check if pass is correct
		doc = await User.findOne({
			email: email,
			password: password && createHash(password),
		})
		if (!doc) throw new Error('Incorrect login credentials!')

		// finally login and create a session
		const session_id = crypto.randomUUID()
		res.cookie('session_id', session_id.toString(), {
			maxAge: 86400000,
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		})
		addSession(session_id, doc._id)

		res.status(200).json(doc)
	} catch (error) {
		const errMsg = error?.message || 'Signin failed'
		res.status(400).json({ message: errMsg })
	}
}

const logout = async (req, res) => {
	try {
		const cookie = req.cookies
		// if no cookies are present or if the cookie set is not a session id
		if (
			!cookie ||
			Object.keys(cookie).length == 0 ||
			Object.keys(cookie)[0] !== 'session_id'
		)
			throw new Error('You must login first!')

		if (!findSession(cookie.session_id)) {
			// cookie present but not session; invalidate user cookie
			res.cookie('session_id', false, {
				maxAge: 0,
				httpOnly: true,
				secure: true,
				sameSite: 'none',
			})
			throw new Error("Session timed out!\nYou've been logged out")
		}

		// if all goes well, logout user
		removeSession(cookie.session_id) // remove from server memory
		res.cookie('session_id', false, {
			maxAge: 0,
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		}) // invalidate user cookie
		res.status(200).json({ message: 'Logged out' })
	} catch (error) {
		const errMsg = error?.message || 'Logout failed'
		res.status(400).json({ message: errMsg })
	}
}

module.exports = { logout, signin, signup }
