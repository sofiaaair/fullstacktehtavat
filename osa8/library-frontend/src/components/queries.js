import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
    allBooks { 
      title 
      author {
        name
      }
      published 
      genres
    }
  }
`

export const GET_BOOK_BY_GENRE = gql`
query getBookByGenre($genre:String!){
    allBooks(genre: $genre){
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String, $author: String, $published: Int, $genres: [String]){
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ){
        title
        author {
          name
        }
        published
        genres
    }
  }`


  export const GET_ME = gql`
    query {
      me{
        favoriteGenre
      }
    }
  `

  export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String, $year: Int){
        editAuthor(
            name: $name,
            setBornTo: $year
        ){
            name
            born
        }
    }
  `

  export const LOGIN = gql`
    mutation login($username: String!, $password:String!){
      login(username : $username, password: $password) {
        value
      }
    }
  `