require('dotenv').config()

const PORT = process.env.PORT
const mongoUrl =
    process.env.NODE_ENV === 'test'
        ? process.env.test_mongoUrl
        : process.env.mongoUrl

module.exports = {
    PORT,
    mongoUrl,
}
