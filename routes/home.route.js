const path = require('path')
const express = require('express')
const router = express.Router()

// Home route
router.get('/', (_, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// NOT FOUND
router.get('*', (_, res) => {
	res
		.status(404)
		.send({ error: "404. The route you're looking for does not exist" })
})

module.exports = router
