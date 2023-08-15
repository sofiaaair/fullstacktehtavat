const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const helper = require('../tests/test_helper')
const User = require('../models/user')

describe('database with one initial user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('samasala', 10)
        const user = new User({
            username: 'AkuNakka',
            name: 'Aku Ankka',
            passwordHash,
        })
        await user.save()
    })

    test('user is created with unused username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'roopeAnk',
            name: 'Roope Ankka',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('user cannot be created with used username', async () => {
        const usersAtStart = await helper.usersInDb()

        const usedUsername = {
            username: 'AkuNakka',
            name: 'Aku Nakka',
            password: 'salainen',
        }
        await api.post('/api/users').send(usedUsername).expect(500)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password must be at least 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Iin3s',
            name: 'Iines Ankka',
            password: '11',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            'password length must be at least 3 character'
        )
        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})
