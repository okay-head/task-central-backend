const cookie = require('cookie')
const { findSession } = require('../utils/manageSessions')

// middleware for login
const checkLoginSession = (req, res, next) => {
	try {
		const userCookie = req.cookies
		// if no cookies are present or if the cookie set is not a session id
		if (
			!userCookie ||
			Object.keys(userCookie).length == 0 ||
			Object.keys(userCookie)[0] !== 'session_id'
		)
			throw new Error('You must login first!')

		if (!findSession(userCookie.session_id)) {
			// cookie present but not session; invalidate user cookie
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('session_id', false, {
					path: '/',
					httpOnly: true,
					maxAge: 0,
					secure: true,
					sameSite: 'none',
					partitioned: true,
				})
			)
			// res.cookie('session_id', false, {
			// 	maxAge: 0,
			// 	httpOnly: true,
			// 	secure: true,
			// 	sameSite: 'none',
			// 	partitioned: true,
			// })
			throw new Error("Session timed out!\nYou've been logged out")
		}

		// if all goes well, set request auth
		const { user_id } = findSession(userCookie.session_id)
		req.uid = user_id
		next()
	} catch (error) {
		const errMsg = error?.message || 'Logout failed'
		res.status(400).json({ message: errMsg })
	}
}

module.exports = { checkLoginSession }
