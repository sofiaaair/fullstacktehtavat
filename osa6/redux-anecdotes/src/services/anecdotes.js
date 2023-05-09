/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async(content) => {
    const object = {content, votes:0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const replace = async(anecdote) => {
    const object = {
        content: anecdote.content,
        votes: anecdote.votes+1}
    const url = `${baseUrl}/${anecdote.id}`
    const request = await axios.put(url, object)
    return request.data
}

export default { 
    getAll, 
    createNew,
replace}