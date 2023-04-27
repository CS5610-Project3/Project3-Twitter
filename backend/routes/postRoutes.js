const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController.js');

// Get all posts
router.get('/', PostController.handleGetAllPosts);

// Get all posts by current user
router.get('/:username', PostController.handleGetPostsByUsername);

// Create a new post by username
router.post('/:username', PostController.handleCreatePostByUsername);

// Get a post by id
router.delete('/:postId', PostController.handleDeletePost);

// Update a post by id
router.put('/:postId', PostController.handleUpdatePost);

module.exports = router;
