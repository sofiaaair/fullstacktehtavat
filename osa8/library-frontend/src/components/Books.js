import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_BOOK_BY_GENRE, ALL_BOOKS} from "./queries"
import Select from "react-select"

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS)
  const { loading, data } = useQuery(GET_BOOK_BY_GENRE, { variables: { genre: selectedGenre } })

  useEffect(() => {
    
  }, [selectedGenre])

  if (loading || result.loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks 
  const booksToGenres = result.data.allBooks

  const uniqueGenres = new Set()

  booksToGenres.forEach((b) => {
    b.genres.forEach((genre) => uniqueGenres.add(genre))
  })

  const uniqueGenreSelector = Array.from(uniqueGenres).map((g) => ({ value: g, label: g }))

  return (
    <div>
      <h2>Books</h2>
      <h2>Select genre:</h2>
      <Select
        value={selectedGenre}
        onChange={(selectedOption) => setSelectedGenre(selectedOption.value)}
        options={uniqueGenreSelector}
      />

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(selectedGenre))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
