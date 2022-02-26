import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './../components/Card';
import { List } from './../components/List';
import { ALL_COUNTRIES } from './../config';
import { Controls } from './../components/Controls';

export const HomePage = ({ setCountries, countries }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const navigate = useNavigate()

  const handleSearch = (search, region) => {
    let data = [...countries]

    if (region) {
      data = data.filter(c => c.region.includes(region))
    }

    if (search) {
      data = data.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilteredCountries(data)
  }

  useEffect(() => {
    if (!countries.lenght)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data))
  }, [])

  useEffect(() => {
    handleSearch()
  }, [countries])

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map(c => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: 'Population',
                desciption: c.population.toLocaleString()
              },
              {
                title: 'Region',
                desciption: c.region
              },
              {
                title: 'Capital',
                desciption: c.capital
              }
            ]
          }
          return (
            <Card
              key={c.name}
              onClick={() => navigate(`/country/${c.name}`)}
              {...countryInfo}
            />
          )
        })}
      </List>
    </>
  )
}
