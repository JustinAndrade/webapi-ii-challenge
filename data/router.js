const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

// create a new post

router.post('/', async (req, res) => {
	try {
		const newPost = await Posts.insert(req.body);
		res.status(201).json(newPost);
	} catch (error) {
		res.status(500).json({ message: 'Error adding new post.' });
	}
});

// get the database of posts from the api

router.get('/', async (req, res) => {
	try {
		const posts = await Posts.find(req.query);
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({
			message: 'Error retreiving the posts.'
		});
	}
});

// get the post by id

router.get('/:id', async (req, res) => {
	try {
		const post = await Posts.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: 'Error finding post ID.' });
	}
});

// delete the selected post by id

router.delete('/:id', async (req, res) => {
	try {
		const count = await Posts.remove(req.params.id);
		if (count > 0) {
			res.status(200).json({ message: 'The post has been deleted.' });
		} else {
			res.status(400).json({ message: "The post couldn't be found." });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error finding ID to delete.' });
	}
});

// edit a post by id

router.put('/:id', async (req, res) => {
	try {
		const post = await Posts.update(req.params.id, req.body);
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'Error updating the selected post.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error finding the ID.' });
	}
});

module.exports = router;
