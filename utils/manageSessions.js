let sessions = []

const addSession = (session_id, user_id) => {
	const obj = { session_id, user_id }
	sessions.push(obj)
}

const getSessions = () => sessions

const findSession = (session_id) => {
	const found = sessions.find((x) => x.session_id === session_id)
	return found
}

// logout
const removeSession = (session_id) => {
	sessions = sessions.filter((x) => x.session_id != session_id)
}

// clear all server sessions after 24 hours
const clearServerSessions = () => {
	setInterval(() => {
		sessions.length = 0
	}, 86400000)
}

// no need to clear interval as a server restart will clear all intervals

module.exports = {
	addSession,
	getSessions,
	removeSession,
	findSession,
	clearServerSessions,
}
