const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {v1: uuid} = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery', false)
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
   bookCount: Int
   authorCount: Int
   allBooks(author:String genre:String): [Book]
   allAuthors: [Author]
   me: User
  }

  type Mutation {
    addBook(
        title: String
        author: String
        published : Int
        genres: [String]
    ): Book
    editAuthor(name:String setBornTo:Int): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        if (!args.author && !args.genre) return await Book.find().populate('author')
        if(args.author && args.genre) {

          const author = await Author.findOne({name : args.author})


          const book = await Book.find({author : author._id, 'genres': args.genre }).populate('author')
          return book
          
        }
        if(args.genre) {
          const book = await Book.find({'genres': args.genre}).populate('author')
          return book
        }
        const author = await Author.findOne({name : args.author})
    const book = await Book.find({author : author._id}).populate('author')
    return book},
    allAuthors: async () => {
      return await Author.find({})
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount : async (root) => {

      const author = await Author.findOne({name : root.name})
      const books = await Book.find({author : author._id})

        return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const exist = await Author.findOne( {name : args.author})

        if(!exist){

            const authorToAdd = new Author({
                name: args.author,
            })
            try{
            await authorToAdd.save()
            }catch (error){
              throw new GraphQLError('Error in author input', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name, error
                }
              })
            }
            const author = await Author.findOne({name : args.author})

            const book = new Book ({title : args.title, 
              author : author, 
              published: args.published,
              genres: args.genres})

              try{
              await book.save()
              } catch(error){
                throw new GraphQLError('Error in book input', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name, error
                  }
                })
              }
    
            return book
        
        }else{
        const book = new Book ({title : args.title, 
          author : exist, 
          published: args.published,
          genres: args.genres})

        try{
        await book.save()
        } catch(error){
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name, error
            }
          })
        }
        return book
        }
    },
    editAuthor: async (root, args, context) =>{

      const currentUser = context.currentUser

      if (!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const author = await Author.findOne({name: args.name})

      if(author){
        author.born = args.setBornTo

        try{
          return await author.save()
          } catch(error){
            throw new GraphQLError('Editing author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name, error
              }
            })
          }
          
      }

      return null

    },
    createUser : async(root, args) => {

      const user = new User({ username : args.username, favoriteGenre : args.favoriteGenre })

      try{

        return await user.save()

      }catch(error){
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs : args.name, error
          }
        })
      }

    },
    login: async (root, args, context) => {


      const user = await User.findOne({username : args.username})

      if(!user || args.password !== 'secret'){
        throw new GraphQLError('Wrong username or password', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username : user.username,
        id: user._id
      }

      return {value : jwt.sign(userForToken, process.env.JWT_SECRET)}

    },
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    

    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
  console.log('connecting to MONGODB')
  mongoose.connect(MONGODB_URI)
  .then(()=> {console.log('Connected to MongoDB')}).catch((error)=> {
    console.log('error connection to MongoDB', error.message)
  })
})