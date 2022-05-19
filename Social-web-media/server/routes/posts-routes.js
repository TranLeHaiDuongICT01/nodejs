const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    updatePost,
    updateLikePost,
    getPostBySearch,
    commentPost
} = require('../controllers/posts-controller')

router.get('/search', getPostBySearch)

router.route('/').get(getAllPosts).post(checkAuth, createPost)

router.route('/:postId').get(getPostById).patch(checkAuth, updatePost).delete(checkAuth, deletePost)

router.patch('/:postId/likePost', checkAuth, updateLikePost)

router.post('/:postId/commentPost', checkAuth, commentPost)

module.exports = router