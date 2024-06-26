const Task = require('../models/task.model')
/* 
  countDocuments() not working
  mongoose.Types.ObjectId.isValid(id)

 */

// GET
// get all entries by user
const getAllFn = async (req, res) => {
	try {
		const uid = req.uid
		const response = await Task.find({ user_id: uid }).sort({ updatedAt: -1 })
		res.status(200).json(response)
	} catch (error) {
		const errMsg = error?.message || 'error'
		res.status(404).json({ message: errMsg })
	}
}

const getOneFn = async (req, res) => {
	try {
		const response = await Task.findOne({ _id: req?.params?.id })
		if (!response) throw new Error('No entry found')

		res.status(200).json(response)
	} catch (error) {
		const errMsg = error?.message || 'error'
		res.status(404).json({ message: errMsg })
	}
}

// POST
const postFn = async (req, res) => {
	const { title, description } = req.body
	//  [ IMPROVEMENT ]
	// we need a zod schema validation mechanism here, before it hits the DB
	try {
		if (!title || !description)
			throw new Error('Request body has insufficient fields')
		const response = await Task.create({ title, description, user_id: req.uid })
		res.status(201).json(response)
	} catch (error) {
		const errMsg = error?.message || 'Validation failed'
		res.status(400).json({ message: errMsg })
	}
}

// PATCH
const patchFn = async (req, res) => {
	const id = req.params.id
	try {
		// first check if the resource exists
		let doc = await Task.findById(id)
		if (!doc) throw new Error('Nonexistent resource. Check request id')

		// then check if the current user is the owner (🧊 edge case)
		if (req.uid.toString() !== doc.user_id.toString()) {
			return res.status(403).json({
				message: 'You do not have permissions to modify this document',
			})
		}

		// else perform the update
		const { title, description } = req.body
		if (!title && !description)
			throw new Error('Title and description are required')

		// A proper patch - patch only the fields that've changed (unsure how this scales)
		doc.title = title || doc.title
		doc.description = description || doc.description
		await doc.save()
		res.status(200).json(doc)
	} catch (error) {
		const errMsg = error?.message || 'Patch failed'
		res.status(400).json({ message: errMsg })
	}
}

// DELETE
const deleteFn = async (req, res) => {
	const id = req.params.id
	try {
		// first check if the resource exists
		let doc = await Task.findById(id)
		if (!doc) throw new Error('Task is not present')

		// then check if the current user is the owner (🧊 edge case)
		if (req.uid.toString() !== doc.user_id.toString()) {
			return res.status(403).json({
				message: 'You do not have permissions to modify this document',
			})
		}

		// else perform delete
		await Task.findByIdAndDelete(id)
		return res.status(204).json()
	} catch (error) {
		const errMsg = error?.message || 'Deletion failed'
		res.status(400).json({ message: errMsg })
	}
}

module.exports = { postFn, getAllFn, getOneFn, patchFn, deleteFn }
