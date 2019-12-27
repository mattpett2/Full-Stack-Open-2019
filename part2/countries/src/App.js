import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'

const App =() => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [selectedCountry, setSelected] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries received')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])
 
 
  const countryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }


  let filteredCountries = countries.filter(
    nation => nation.name.substring(0, country.length).toLowerCase() ===
    country.toLowerCase())

    const showCntryData = (name) => {
      console.log(name)
      const selection = countries.filter(
        nation => nation.name === name)
      console.log(selection)
      setSelected(selection)
     
    }  

  const countryRows = () => {
        if (selectedCountry.length === 1){
            filteredCountries = selectedCountry
            if (country === ''){
              setSelected([])
            }
        }


        if (filteredCountries.length >= 10){
          return(<p>Too many matches. Specify another filter</p>)
        }
        if (filteredCountries.length === 1){
          const selection = filteredCountries[0]
          let languages = [];
          selection.languages.forEach(element => languages.push(element.name))


          // Get Weather from API
          let urlTemplate = 'http://api.weatherstack.com/current?access_key=8d18059b7b5c42f2c271f4c6c23cd1b7&query='
          let capital = selection.capital
          let capArr = capital.split(' ')
          let weatherURL = urlTemplate + capArr.join('%20')
          console.log(weatherURL)
          
          axios.get(weatherURL)
            .then(response => {setWeather(response.data.current)
            console.log(response.data.current)})
          
          

          

          return(
            <>
            <h1>{selection.name}</h1>
              <ul className='cntrylist'>
              <li>capital {selection.capital}</li>
              <li>population {selection.population}</li>
              </ul>
            <h2>languages</h2>
            <ul>
            {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <br></br>
            <a href={selection.flag}>
              <img className='flag' alt='flag' src={selection.flag}/>
            </a>
            <h2>Weather in {selection.capital}</h2>
            <p>Temperature: {weather.temperature} degrees</p>
            <p>Wind {weather.wind_speed} kph direction {weather.wind_dir}</p>
            
            </>
          )
        }
        return(
            filteredCountries.map(nation => <li key={nation.name}>{nation.name}
              <button onClick={() => showCntryData(nation.name)}>show</button></li>)    
        )        
  }


  return (
      <>
      <div>find countries <input onChange={countryChange}/></div>
      <div><ul className='cntrylist'>{countryRows()}</ul></div>
      </>
  );
}

export default App;
