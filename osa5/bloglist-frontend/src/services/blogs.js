import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  const url = `${baseUrl}/${updatedObject.id}`
  const response = await axios.put(url, updatedObject)
  return response.data
}

const remove = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blogObject.id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }
