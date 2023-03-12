import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import Card from './components/card'

function App() {
  const [characters, setCharacters] = React.useState([1]);

  const loadPeople = (page = 1) => {
    // Let chart component know loading is in progress.
    fetch("https://swapi.dev/api/people/?page=" + page)
      .then(res => res.json())
      .then(
        result => {
          console.log(result, 'result')
          setCharacters(result.results)
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  React.useEffect(() => {
    loadPeople()
  }, [])

  return (
    <div className="App">
      <nav className="navbar">
        <a
          className="navbar-brand"
          href="https://ctamas.github.io/sw-people/"
        >
          <i className="far fa-chart-bar" />
          <span id="title">Star Wars Character Search</span>
        </a>
      </nav>
      <div className='search-container'>
        <TextField className='search-field' label="Search Character" variant="standard" />
        <Button className='search-button' variant="outlined">Search Character</Button>
      </div>
      <div className='app-content'>
        <div className='results-container'>
          <span>Showing x results of y</span>
          <InputLabel className='filter-label'>Sort by</InputLabel>
          <Select
            value={'A'}
            className='filter'
            onChange={() => { }}
          >
            <MenuItem value={'A'}>A-Z</MenuItem>
            <MenuItem value={'Z'}>Z-A</MenuItem>
            <MenuItem value={'M'}>Male</MenuItem>
            <MenuItem value={'F'}>Female</MenuItem>
          </Select>
        </div>
        <div className='results-list'>
          <div className='character-card-container'>
          {characters.map((character, index) => {
            return (
             <Card key={index} character={character}/>)
          })}
          </div>
          <Button className='load-more-button' variant="outlined">Load More</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
