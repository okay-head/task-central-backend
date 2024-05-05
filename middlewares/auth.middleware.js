const { findSession } = require('../utils/manageSessions')

// middleware for login
const checkLoginSession = (req, res, next) => {
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
			// cookie present but not session
			res.cookie('session_id', false, { maxAge: 0 })
			throw new Error("Session timed out! You've been logged out")
		}

		// if all goes well, set request auth
		const { user_id } = findSession(cookie.session_id)
		req.uid = user_id
		next()
	} catch (error) {
		const errMsg = error?.message || 'Logout failed'
		res.status(400).json({ message: errMsg })
	}
}

module.exports = { checkLoginSession }
