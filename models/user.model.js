const mongoose = require('mongoose')
const { Schema, model } = mongoose

// create a MODEL that can interact w the collection in db
const userSchema = new Schema(
	{
		username: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			validate: {
				validator: function (value) {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
					return emailRegex.test(value)
				},
				message: (props) => `${props.value} is not a valid email address!`,
			},
		},
		password: { type: String, trim: true, required: true },
	},
	{ timestamps: true }
)

module.exports = model('User', userSchema)
