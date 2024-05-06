const crypto = require('crypto')

function createHash(password) {
	const hashedPass = crypto.createHash('sha256').update(password).digest('hex')
	return hashedPass
}

module.exports = { createHash }
