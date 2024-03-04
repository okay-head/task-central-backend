const Item = require('../model/item')
/* 
  countDocuments() not working
  mongoose.Types.ObjectId.isValid(id)

 */

// GET
const getOneFn = async (req, res) => {
	try {
		const { id } = req.params
		const response = await Item.findOne({ _id: id })
		return res.status(200).json(response)
	} catch (error) {
		res.status(400).json({ error })
	}
}
const getAllFn = async (req, res) => {
	try {
		const response = await Item.find().sort({ createdAt: -1 })
		return res.send(response)
	} catch (error) {
		res.status(404).json({ error: 'Resource Not found' })
	}
}
const findNextId = async (req, res) => {
	try {
		const response = await Item.find()
		const nextId = response.length + 1
		return res.json({ nextId })
	} catch (error) {
		res.status(400).json({ error: 'Bad request' })
	}
}

// POST
const postFn = async (req, res) => {
	const { name, quantity, price } = req.body
	//  [ IMPROVEMENT ]
	// we need a zod schema validation mechanism here, before it hits the DB
	try {
		const response = await Item.create({ name, quantity, price })
		return res.status(201).json(response)
	} catch (err) {
		res.status(400).json({ error: err.message })
		console.log(err)
	}
}

// PATCH
const patchFn = async (req, res) => {
	const payload = { ...req.body }
	const id = req.params.id
	try {
		// first check if the resource exists
		const exists = await Item.exists({ _id: id })
		if (!exists) throw new Error('Item is not present')

		// else perform the update
		const response = await Item.updateOne({ _id: id }, payload)
		return res.json(response)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

// PATCH
const deleteFn = async (req, res) => {
	const id = req.params.id
	try {
		// first check if the resource exists
		const exists = await Item.exists({ _id: id })
		if (!exists) throw new Error('Item is not present')

		// else perform delete
		const response = await Item.deleteOne({ _id: id })
		return res.json(response)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

module.exports = { postFn, getAllFn, findNextId, getOneFn, patchFn, deleteFn }
