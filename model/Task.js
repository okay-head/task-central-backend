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

module.exports = mongoose.model('Task', taskSchema)
