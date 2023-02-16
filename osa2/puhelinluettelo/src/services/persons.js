import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response=> response.data)
}

const create = nameObject => {
    const request = axios.post(baseUrl, nameObject)
    return request.then(response => response.data)
}

const deletion = id => {
    axios.delete(`${baseUrl}/${id}`)
    return id
    
}

const replacement = (nameObject, id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, nameObject)
    return request.then(response => response.data)
    
}

const logger = {
    getAll,
    create,
    deletion,
    replacement
}
export default logger