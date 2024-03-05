const path = require('path')
const express = require('express')
const router = express.Router()
const {
	postFn,
	getAllFn,
	findNextId,
	getOneFn,
	patchFn,
	deleteFn,
} = require('./../controllers/controller')

router.get('/', (_, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})
// GET
router.get('/tasks', getAllFn)
router.get('/tasks/:id', getOneFn)
router.get('/tasks/next', findNextId)

// POST
router.post('/tasks', postFn)

// PATCH
router.patch('/tasks/:id', patchFn)

// DELETE
router.delete('/tasks/:id', deleteFn)

// NOT FOUND
router.get('*', (_, res) => {
	res.status(404).send({ error: '404 Not found' })
})

module.exports = router
