import { useQuery } from "@apollo/client"
import { ALL_BOOKS, GET_ME } from "./queries"

const RecommendBooks = () => {

    const result = useQuery(ALL_BOOKS)
    const user = useQuery(GET_ME)

    if(result.loading || user.loading){
        return <div>loading...</div>
    }

    const books = result.data.allBooks
    const genre = user.data.me.favoriteGenre

    return(
        <div>
            <h2>Recommendations</h2>
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {
                   books.filter((b) => b.genres.includes(genre)).map((a) => (
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                    </tr>
                  ))
                }
                </tbody>


            </table>



        </div>
    )

}

export default RecommendBooks