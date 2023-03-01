
import {useState} from 'react'
import countryService from './services/countries'
import './App.css';
import CountryInfo from './components/CountryInfo';
import WeatherService from './services/weathers'
import WeatherInfo from './components/WeatherInfo'



const App = () => {

  const [infoText, setNewInfoText] = useState(null)
  const [temperature, setNewTemperature] = useState(null)
  const [wind, setNewWind] = useState(null)
  const [icon, setNewIcon] = useState(null)
  const [city, setNewCity] = useState("")

  const handleChange = (event) => {
    
    const name = event.target.value
      countryService.getAll()
      .then(result => {
       filterCountries(result.filter(item => item.name.common.toLowerCase().includes(name.toLowerCase())))
      })

  }

  const handleButtonPress = (country) => {
    countryService.get(country)
    .then(value => filterCountries(value))
  }

  const handleWeatherChange = (city) => {
    WeatherService.get(city)
    .then(item => {
      setNewTemperature(item.main.temp)
      setNewWind(item.wind.speed)
      setNewIcon(WeatherService.getWeatherIcon(item.weather[0].icon))
      setNewCity(city)
    })
  }


  const filterCountries = (dataObject) => {
    if (dataObject.length < 1) {
      setNewInfoText("Country not found")
    }
    if (dataObject.length > 10 ) {
      setNewInfoText("Too many matches, specify another filter")
    }
    if (dataObject.length <= 10 && dataObject.length > 1) {
      setNewInfoText(dataObject.map(item => <li key = {item.name.common}>{item.name.common} <button onClick={() => handleButtonPress(item.name.common)}>show</button></li>))
      
    }
    if (dataObject.length === 1) {

      
        const countryObject =  dataObject.map(item =>
        <div key = {item.name.common}>
          <h1>{item.name.common}</h1>
          <p>Area: {item.area}</p>
          <p>Capital: {item.capital}</p>
          <img src = {item.flags.png} alt = {item.flags.alt}/>
          <ul>Languages: {Object.values(item.languages).map(item => <li key = {item}>{item}</li>)} </ul>
        </div>
        )

        dataObject.map(item =>
          handleWeatherChange(item.capital)
        )
   


      setNewInfoText(
        countryObject
      )
      
    }
  
  }

  return(
    <div>
      <h1>Countries</h1>
      
      <label>Find countries</label><input onChange = {handleChange}/>
      <CountryInfo infotext={infoText}/>
      <WeatherInfo temperature = {temperature} wind = {wind} icon={icon} city = {city}/>
    </div>
  )

}
export default App;
