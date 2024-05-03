const express = require('express')
const router = express.Router()
const {
	postFn,
	getAllFn,
	findNextId,
	getOneFn,
	patchFn,
	deleteFn,
} = require('../controllers/task.controller')

// GET
router.get('/', getAllFn)
router.get('/:id', getOneFn)
router.get('/next', findNextId)

// POST
router.post('/', postFn)

// PATCH
router.patch('/:id', patchFn)

// DELETE
router.delete('/:id', deleteFn)

module.exports = router
