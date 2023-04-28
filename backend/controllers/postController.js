const { response } = require('express');
const Post = require('../models/Post');

// Get all posts
const handleGetAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 }).exec();
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.log(error);
  }
};

// Get all posts by username
const handleGetPostsByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const posts = await Post.find({ username: username })
      .sort({ updatedAt: -1 })
      .exec();
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
};

// Create a new post by username
const handleCreatePostByUsername = async (req, res) => {
  const { content } = req.body;
  const { username } = req.params;

  if (!content) {
    return res.status(400).send('Content is required to create a new post');
  }

  try {
    const newPost = {
      username,
      content,
    };

    const createPostResponse = await Post.create(newPost);
    console.log(createPostResponse);
    res.status(200).json({
      message: 'Post Successfully Created',
      post: createPostResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

// Delete a post by Id
const handleDeletePost = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming the post ID is sent as a path parameter

    // Find and delete the post by its ID
    const deletedPost = await Post.findByIdAndDelete(postId);

    // If the post is not found, return a 404 status
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // If the post is deleted successfully, return a 200 status and the deleted post
    res
      .status(200)
      .json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (error) {
    // If there is an error, return a 500 status and the error message
    res
      .status(500)
      .json({ message: 'Error deleting the post', error: error.message });
  }
};

// Update a post bg Id
const handleUpdatePost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: { content } },
      { new: true, useFindAndModify: false }
    ).exec();

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json({ post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update post' });
  }
};

module.exports = {
  handleGetAllPosts,
  handleGetPostsByUsername,
  handleCreatePostByUsername,
  handleDeletePost,
  handleUpdatePost,
};
