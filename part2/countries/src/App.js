

import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const WeatherObject = (props) => {

  return (
    {
    temperature: props.main.temp,
    image: props.weather[0].icon,
    wind: props.wind.speed
    }
  )
}

const Weather = ({ country, weather, setWeather }) => {
  const weatherInfo = weather.map(WeatherObject)  
  const capital = (country.capital[0] === undefined) 
    ? country.name
    : country.capital[0]

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather([response.data])
    })
  }, [])

  if (weatherInfo.length === 0) {
    return (
      <div> </div>
    )
  }
  else {
    return (
      <>
        <h2>Weather in {capital}</h2>
        <div> temperature {weatherInfo[0].temperature} Celsius </div>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo[0].image}@2x.png`} alt="weather" />
        <div>wind {weatherInfo[0].wind} m/s</div>
      </>
    )
  } 
}


const View = ({ country, weather, setWeather }) => {

  return (
    <>
      <h1>{country.name} </h1>
      <div>capital {country.capital.join(', ').toString()} </div>
      <div>area {country.area} </div>
      <h2>languages: </h2>
      <ul>
        {country.languages.map(language => <li key={language}>{language} </li>)}
      </ul>
      <img src={country.flag} alt="The country's flag" />
      <Weather country={country} weather ={weather} setWeather={setWeather}/>
    </>
  )
}


const List = ({ countries, handleClick }) => {

  return (
    <div>
      {countries.map(country => 
      <div key={country.name}> 
        {country.name}     <input id={country.name} type="button" value="show" onClick={handleClick} />
      </div>)} 
    </div>
  )
}


const Filter = ({ countries, handleClick, weather, setWeather }) => {
  if (countries.length === 0) {
    return (
      <div> </div>
    )
  }
  else if (countries.length === 1) {
    return (
        <View country={countries[0]} weather={weather}  setWeather={setWeather} />
    )
  } 
  else if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter </div>
    )
  } 
  else {  
    return (
      <List countries={countries} handleClick={handleClick}  />
    )
  }
}


const CountryObject = (props) => {

  return (
    {
      name: props.name.common,        
      capital: (props.capital === undefined) ? [] : props.capital,         
      area: props.area,             
      languages: (props.capital === undefined) ? [] : Object.values(props.languages),   
      flag: props.flags.png,         
    }
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")
  const [weather, setWeather] = useState([])
  const countryList = countries.map(CountryObject)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleClick = (event) => {
    setNewFilter(event.target.id)
  }


  const countriesToShow = (newFilter === "")
    ? countryList
    : countryList.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase())) 

  return (
    <>
      <div>
          find countries<input value={newFilter} onChange={handleChangeFilter} />
      </div>
      <Filter countries={countriesToShow} handleClick={handleClick} weather={weather} setWeather={setWeather} />
    </>
  )
}

export default App;
