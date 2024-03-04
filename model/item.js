// now we need to create a schema with the help of kaala mongoose
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
)

// 1st arg is the name of the collection
module.exports = mongoose.model('Item', itemSchema)
