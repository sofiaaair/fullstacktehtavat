const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const Comment = require('../models/comment.js')
const { userExtractor } = require('../utils/middleware.js')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.get('/:id/comments', async(request, response) => {

    const comments = await Comment.find({ blog: request.params.id}).populate('blog', { title: 1, author:1 })
    response.json(comments)
})

blogRouter.post('/', userExtractor, async (request, response) => {
    const user = await User.findById(request.user)

    const blogItem = ({ title, author, url, likes } = request.body)
    blogItem.user = user.id
    const blog = new Blog(blogItem)

    if (!blog.title) {
        response.status(400).json({ error: 'Title is missing' }).end()
    } else if (!blog.url) {
        response.status(400).json({ error: 'Url is missing' }).end()
    } else {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.status(201).json(result)
    }
})

blogRouter.post('/:id/comments', userExtractor, async(request, response) => {

    const blog = await Blog.findById(request.params.id)

    const commentItem = ({ comment } = request.body)

    commentItem.blog = blog.id

    const commentToPush = new Comment(commentItem)


    if(!commentItem.comment) {
        response.status(400).json({ error: 'Comment is missing' }).end()
    }else{
        const result = await commentToPush.save()
        response.status(201).json(result)
    }
})


blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = await User.findById(request.user)
    const blogToDelete = await Blog.findById(request.params.id)
    if (blogToDelete.user._id.toString() === user._id.toString()) {
        const deletion = await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(400).json({ error: 'invalid token...' })
    }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    })
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter
