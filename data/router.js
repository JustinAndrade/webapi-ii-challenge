const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

// create a new post

router.post('/', async (req, res) => {
	try {
		const newPost = await Posts.insert(req.body);
		if (newPost) {
			res.status(201).json(newPost);
		} else {
			res.status(400).json({ message: 'Please provide title and contents for the post.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'There was an error while saving the post to the database' });
	}
});

// get the database of posts from the api

router.get('/', async (req, res) => {
	try {
		const posts = await Posts.find(req.query);
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({
			message: 'The posts information could not be retrieved.'
		});
	}
});

// get the post by id

router.get('/:id', async (req, res) => {
	try {
		const post = await Posts.findById(req.params.id);
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({
				message: '"The post with the specified ID does not exist." '
			});
		}
	} catch (error) {
		res.status(500).json({ message: 'The post information could not be retrieved.' });
	}
});

// delete the selected post by id

router.delete('/:id', async (req, res) => {
	try {
		const post = await Posts.remove(req.params.id);
		if (post) {
			res.status(200).json({ message: 'The post has been deleted.' });
		} else {
			res.status(404).json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (error) {
		res.status(500).json({ message: 'The post could not be removed' });
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
