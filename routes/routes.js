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

// GET
router.get('/items', getAllFn)
router.get('/items/:id', getOneFn)
router.get('/items/next', findNextId)

// POST
router.post('/items', postFn)

// PATCH
router.patch('/items/:id', patchFn)

// DELETE
router.delete('/items/:id', deleteFn)

// NOT FOUND
router.get('*', (_, res) => {
	res.status(404).send({ error: '404 Not found' })
})

module.exports = router
