// create a SCHEMA with the help of kaala mongoose
const mongoose = require('mongoose')

// create a MODEL that can interact w the collection in db
const taskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
)

// note that the collection would be created as follows
// Name of the model, lowercased -> task
// Plural, since it is a collection of docs -> tasks

module.exports = mongoose.model('Task', taskSchema)
