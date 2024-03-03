// we separate the routes and then use them in the main server.js app
const express = require('express')
const router = express.Router() //we use the express router because we don't have access to the app instance in this filek

// get the schema
const Item = require('./../schema/item')

// all routes

// at what endpoint are we hitting mongodb??
router.get('/', async (req, res) => {
	try {
		const response = await Item.find()
		res.status(200).json(response)
	} catch (error) {
		res.status(500).json({ err: error })
	}
	// res.sendFile(path.join(__dirname, '..', 'index.html'))
})

router.post('/', async (req, res) => {
	const { name, quantity, price } = req.body

	const newItem = new Item({
		name,
		quantity,
		price,
	})

	try {
		// const response = await newItem.save({isNew: true})
		const response = await newItem.save()
		res.status(201).json(response)
	} catch (error) {
		res.status(400).json({ err: error })
	}
	// res.sendFile(path.join(__dirname, '..', 'index.html'))
})
// router.post
// router.patch
// router.delete

module.exports = router
