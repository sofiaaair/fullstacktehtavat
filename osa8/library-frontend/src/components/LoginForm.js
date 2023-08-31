import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "./queries"

const LoginForm = ({setToken}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(()=> {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('booklist-user-token', token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
        login({variables: {username, password}})
    }


    return(
        <div>
            <form onSubmit={submit}>
                <div>
                username <input type='text'
                value= {username} 
                onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                password <input type='password'
                value={password}
                onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )


}

export default LoginForm