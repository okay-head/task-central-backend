// create a SCHEMA with the help of kaala mongoose
const mongoose = require('mongoose')

// create a MODEL that can interact w the collection in db
const itemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Item', itemSchema)
