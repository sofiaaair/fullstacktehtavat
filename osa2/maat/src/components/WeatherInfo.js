const WeatherInfo = ({city,temperature, wind, icon}) => {
    if(city && temperature && wind && icon){
    return(
        <div>
            <h1>Weather in {city} </h1>
            <p>temperature: {temperature}°C</p>
            <img src={icon} alt="Weather icon"/>
            <p>wind: {wind} m/s</p>
        </div>
    )
    }


}
export default WeatherInfo