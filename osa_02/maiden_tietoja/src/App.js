import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
 
const CountryFilter = ({ handler, filter }) => {
  return (
    <>
      Find countries: <input onChange={handler} value={filter} />
    </>
  )
}
 
const NameAndButton = ({ country, setFilter }) => {
  return (
    <div>
      <p>{country.name} <button onClick={() => { setFilter(country.name) }}>more info</button></p>
    </div>
  )
}
 
const Countries = ({ countries, filter, setFilter }) => {
  if (countries.length === 1) {
    return countries.map(country => <Country key={country.name} country={country} />)
  } else if (countries.length > 1 && countries.length <= 10) {
    return countries.map(country => <NameAndButton key={country.name} country={country} setFilter={setFilter} />)
  } else if (countries.length > 10 && filter === '') {
    return <p>Search for countries</p>
  } else if (countries.length > 10) {
    return <p>Too many results, specify search</p>
  } else if (countries.length === 0) {
    return <p>I don't think that country exists</p>
  }
}
 
const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
      </ul>
      <img src={country.flag} width="120px" alt="Flag of the country"></img>
      <h3>Weather in {country.capital}</h3>
      <Weather country={country} />
    </div>
  )
}
 
const Weather = ({ country }) => {
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [icons, setIcons] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
 
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => {
      setTemperature(response.data.current.temperature)
      setIcons(response.data.current.weather_icons)
      setWind(response.data.current.wind_speed)
    })
  },[])
 
  return (
    <div>
      <p><b>Temperature: </b>{temperature}°C</p>
      <img src={icons[0]} alt="Icon representing current weather"></img>
      <p><b>Wind speed: </b>{wind}m/s</p>
    </div>
  )
}
 
const App = () => {
 
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
 
 
  const handleChange = (event) => (
    setFilter(event.target.value)
  )
 
  const filteredCountries = countries
    .filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
 
 
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
 
 
  return (
    <div>
      <CountryFilter handler={handleChange} filter={filter} />
      <Countries countries={filteredCountries} filter={filter} setFilter={setFilter} />
    </div>
  )
}
 
export default App;