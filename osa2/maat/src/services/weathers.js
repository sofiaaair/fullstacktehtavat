import axios from 'axios'

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q='
const imageUrl = 'http://openweathermap.org/img/wn/'
const imageSize = '@4x.png'
const apiKey = process.env.REACT_APP_API_KEY

const get = (cityName) => {
    const request = axios.get(`${baseUrl}${cityName}&appid=${apiKey}&units=metric`)
    return request.then(result => result.data)
}

const getWeatherIcon = (weatherId) => {
    
    return `${imageUrl}${weatherId}${imageSize}`
    

}

export default {get, getWeatherIcon}