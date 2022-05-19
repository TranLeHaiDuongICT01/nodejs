const customError = require('../errors/errors')
const Posts = require('../models/post-model')

const getAllPosts = async (req, res, next) => {
    const { page } = req.query
    try {
        const limit = 8
        const startIndex = (Number(page) - 1) * limit
        const total = await Posts.countDocuments()
        const posts = await Posts.find({}).sort({ _id: -1 }).limit(limit).skip(startIndex)
        return res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / limit) })
    } catch (error) {
        return next(error)
    }
}

const getPostById = async (req, res, next) => {
    const { postId } = req.params
    try {
        const post = await Posts.findById(postId)
        if (!post || post.length === 0) {
            return next(new customError(`Post with id ${postId} not found`, 404))
        }
        return res.status(200).json({ post })
    } catch (error) {
        return next(error)
    }
}

const createPost = async (req, res, next) => {
    const { title, message, name, tags, selectFile } = req.body
    try {
        if (!title || !message || !name || !tags || !selectFile) {
            return next(new customError('Please fill all field', 404))
        }
        if (!req.userId) {
            return next(new customError('Unathenticated', 402))
        }
        const post = await Posts.create({ title, message, name, creator: req.userId, tags, selectFile })
        return res.status(201).json({ post })
    } catch (error) {
        return next(error)
    }
}

const updatePost = async (req, res, next) => {
    const { title, message, name, tags, selectFile } = req.body
    const { postId } = req.params
    try {
        const post = await Posts.findById(postId)
        if (!post || post.length === 0) {
            return next(new customError(`Post with id ${postId} not found`, 404))
        }

        if (!req.userId || String(post.creator) !== String(req.userId)) {
            return next(new customError('Unauthorized', 403))
        }

        let updateInfo = {}
        if (title) updateInfo['title'] = title
        if (message) updateInfo['message'] = message
        if (name) updateInfo['name'] = name
        if (tags) updateInfo['tags'] = tags
        if (selectFile) updateInfo['selectFile'] = selectFile

        // console.log(updateInfo);
        // console.log(req.body);

        const postUpdate = await Posts.findByIdAndUpdate(postId, updateInfo, {
            new: true, runValidators: true
        })
        // res.json("Hello")
        return res.status(200).json({ post: postUpdate })
    } catch (error) {
        return next(error)
    }
}

const deletePost = async (req, res, next) => {
    const { postId } = req.params
    try {
        // console.log(postId);
        const post = await Posts.findById(postId)
        if (!post || post.length === 0) {
            return next(new customError(`Post with id ${postId} not found`, 404))
        }
        if (!req.userId || String(post.creator) !== String(req.userId)) {
            return next(new customError('Unauthorized', 403))
        }
        await Posts.findByIdAndDelete(postId)
        return res.status(200).json({ id: postId })
    } catch (error) {
        return next(error)
    }
}

const updateLikePost = async (req, res, next) => {
    const { postId } = req.params
    try {
        if (!req.userId) {
            return next(new customError('Unauthenticated', 403))
        }
        let post = await Posts.findById(postId)

        let index = await post.likes.findIndex((id) => id === String(req.userId))

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }
        if (!post || post.length === 0) {
            return next(new customError(`Post with id ${postId} not found`, 404))
        }
        let updatePost = await Posts.findByIdAndUpdate(postId, post, {
            new: true
        })
        res.status(200).json({ post: updatePost })
    } catch (error) {
        return next(error)
    }
}

const getPostBySearch = async (req, res, next) => {
    const { searchQuery, tags } = req.query
    try {
        const tagsList = tags.split(',').map(tag => new RegExp(tag, 'i'))
        const posts = await Posts.find({ tags: { $in: tagsList } })
        if (searchQuery === 'none') {
            return res.status(200).json({ data: posts })
        }
        const postByTitle = posts.filter(post => {
            if (String(post.title).toLowerCase().indexOf(String(searchQuery).toLowerCase()) !== -1) return post
        })
        res.status(200).json({ data: postByTitle })
    } catch (error) {
        return next(error)
    }
}

const commentPost = async (req, res, next) => {
    const { postId } = req.params
    const { value } = req.body
    try {
        if (!req.userId) {
            return next(new customError('Unauthenticated', 403))
        }
        let post = await Posts.findById(postId)
        if (!post || post.length === 0) {
            return next(new customError(`Post with id ${postId} not found`, 404))
        }
        post.comments.push(value)
        const updatedPost = await Posts.findByIdAndUpdate(postId, post, { new: true })
        res.status(200).json({ post: updatedPost })
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    updatePost,
    updateLikePost,
    getPostBySearch,
    commentPost
}
