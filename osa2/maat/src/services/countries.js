import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/'

const getAll = () => {
    const request = axios.get(`${baseUrl}all`)
    return request.then(result => result.data)
}

const get = (countryObject) => {
    const request = axios.get(`${baseUrl}name/${countryObject}`)
    return request.then(result => result.data)
    
}

const exportedObject = {
    getAll, get
}


export default exportedObject

