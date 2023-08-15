const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const bcrypt = require('bcrypt')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('12345', 10)

    const newUser = new User({
        username: 'KroisosP',
        name: 'Kroisos Pennonen',
        passwordHash,
    })
    await newUser.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the size of bloglist is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('the size of list increases if one blog is added', async () => {
    const login = {
        username: 'KroisosP',
        password: '12345',
    }
    const result = await api.post('/api/login').send(login)

    const token = result.body.token

    const newBlog = {
        title: 'Kuinka tulla onnekkaaksi',
        url: 'www.hannuhanhi.fi',
        author: 'Hannu Hanhi',
        likes: 500,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map((blog) => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Kuinka tulla onnekkaaksi')
})

test('likes are zero if not defined', async () => {
    const login = {
        username: 'KroisosP',
        password: '12345',
    }
    const result = await api.post('/api/login').send(login)

    const token = result.body.token

    const newBlog = {
        title: 'Kuinka tulla onnekkaaksi',
        author: 'Hannu Hanhi',
        url: 'www.hannuhanhi.fi',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')

    expect(response.body[6].likes).toEqual(0)
})

test('the status code is 400 if there is no url', async () => {
    const login = {
        username: 'KroisosP',
        password: '12345',
    }
    const result = await api.post('/api/login').send(login)

    const token = result.body.token

    const noUrl = {
        title: 'Kuinka tulla onnekkaaksi',
        author: 'Hannu Hanhi',
        likes: 500,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(noUrl)
        .expect(400)
})

test('the status code is 400 if there is no title', async () => {
    const login = {
        username: 'KroisosP',
        password: '12345',
    }
    const result = await api.post('/api/login').send(login)

    const token = result.body.token

    const noTitle = {
        author: 'Hannu Hanhi',
        url: 'www.hannuhanhi.fi',
        likes: 500,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(noTitle)
        .expect(400)
})

test('blog does not found after deletion', async () => {
    const login = {
        username: 'KroisosP',
        password: '12345',
    }
    const result = await api.post('/api/login').send(login)

    const token = result.body.token

    const newBlog = {
        title: 'Kuinka tulla onnekkaaksi',
        url: 'www.hannuhanhi.fi',
        author: 'Hannu Hanhi',
        likes: 500,
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    blogToDelete = response.body
    const blogsAtStart = await helper.blogsInDb()

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map((blog) => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
})
describe('update of a blog', () => {
    test('likes are updated correctly', async () => {
        const blogsAtStart = await helper.blogsInDb()
        blogToUpdate = blogsAtStart[0]
        randomlikes = Math.random() * 601

        const blog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: randomlikes,
        }

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const blogToStudy = blogsAtEnd[0]

        expect(blogToStudy.likes).not.toEqual(blogToUpdate.likes)
        expect(blogToStudy.likes).toEqual(randomlikes)
    })
    test('url is updated correctly', async () => {
        const blogsAtStart = await helper.blogsInDb()
        blogToUpdate = blogsAtStart[1]
        newUrl = 'https://fi.wikipedia.org/wiki/Edsger_Dijkstra'
        const blog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: newUrl,
            likes: blogToUpdate.likes,
        }

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const blogToStudy = blogsAtEnd[1]

        expect(blogToStudy.url).not.toEqual(blogToUpdate.url)
        expect(blogToStudy.url).toEqual(newUrl)
    })
    test('author is updated correctly', async () => {
        const blogsAtStart = await helper.blogsInDb()
        blogToUpdate = blogsAtStart[0]
        newAuthor = 'Matti Meikalainen'

        const blog = {
            title: blogToUpdate.title,
            author: newAuthor,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes,
        }

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const blogToStudy = blogsAtEnd[0]

        expect(blogToStudy.author).not.toEqual(blogToUpdate.author)
        expect(blogToStudy.author).toEqual(newAuthor)
    })

    test('title is updated correctly', async () => {
        const blogsAtStart = await helper.blogsInDb()
        blogToUpdate = blogsAtStart[0]
        newTitle = 'Lempiblogini'

        const blog = {
            title: newTitle,
            author: newAuthor,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes,
        }

        await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const blogToStudy = blogsAtEnd[0]

        expect(blogToStudy.title).not.toEqual(blogToUpdate.title)
        expect(blogToStudy.title).toEqual(newTitle)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
