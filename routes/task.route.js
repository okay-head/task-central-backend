const express = require('express')
const router = express.Router()
const {
	postFn,
	getAllFn,
	getOneFn,
	patchFn,
	deleteFn,
} = require('../controllers/task.controller')

// GET
router.get('/', getAllFn) // instead of getAll, you now get all by current user
router.get('/:id', getOneFn)

// POST
router.post('/', postFn)

// PATCH
router.patch('/:id', patchFn)

// DELETE
router.delete('/:id', deleteFn)

module.exports = router
