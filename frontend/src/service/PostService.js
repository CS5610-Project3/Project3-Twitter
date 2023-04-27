import axios from "../axios";

export const PostService = {
  getAllPosts: function () {
    return axios.get("api/post");
  },
  getPostsByUser: function (username) {
    return axios.get(`api/post/${username}`);
  },
  createPost: function (username) {
    return axios.post(`api/post/${username}`);
  },
  updatePostById: function (postId, newContent) {
    return axios.put(`api/post/${postId}`, { content: newContent });
  },
  deletePostById: function (postId) {
    return axios.delete(`api/post/${postId}`);
  },
};
