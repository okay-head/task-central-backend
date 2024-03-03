const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (_, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})
router.get('/items', (req, res) => {
	res.status(200).send(`<h1>Items home</h1>`)
})
router.get('/items/:id', (req, res) => {
	const id = req.params.id
	res.status(200).send(`<h1>Item #${id}</h1>`)
})
router.get('*', (req, res) => {
	const id = req.params.id
	res.status(200).send(`<h1>404 Not found</h1>`)
})

module.exports = router
