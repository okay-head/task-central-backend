// now we need to create a schema with the help of kaala mongoose
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
})

module.exports = mongoose.model('Item', itemSchema)
