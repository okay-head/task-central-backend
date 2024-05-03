const mongoose = require('mongoose')
const { Schema, model } = mongoose

// create a MODEL that can interact w the collection in db
const taskSchema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
)

module.exports = model('Task', taskSchema)
