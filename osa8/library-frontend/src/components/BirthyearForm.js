import { useState } from "react"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "./queries"
import { useMutation, useQuery } from "@apollo/client"
import Select from "react-select"

const Birthyear = () => {

    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [selectedName, setSelectedName] = useState(null)
    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {refetchQueries: [{query: ALL_AUTHORS}]})

    const submit = async (event) => {
        event.preventDefault()
        

        updateAuthor({ variables: {name, year}})

        setName('')
        setYear('')

    }

    const result = useQuery(ALL_AUTHORS)
  
    if(result.loading){
        return <div>loading...</div>
    }

  const authors = result.data.allAuthors.map(a=>( {value: a.name, label: a.name}))

    return(
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    <Select defaultValue={selectedName}  
                    onChange={(selectedOption) => {
                        setSelectedName(selectedOption)
                        setName(selectedOption.value)
                    }} options={authors}/>
                </div>
                <div>
                    born <input value={year} onChange={({target}) => setYear(parseInt(target.value))}/>
                </div>
                <button type="submit">Update Author</button>
            </form>
        </div>
    )


}

export default Birthyear