import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import Card from './components/card'

function App() {
  const [characters, setCharacters] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const [errorText, setErrorText] = React.useState('')
  const [characterCount, setCharacterCount] = React.useState(0)
  const [searchText, setSearchText] = React.useState('')
  const [sortSelector, setSortSelector] = React.useState('Unsorted')
  const previousSearch = React.useRef('')
  const nextPage = React.useRef(1);

  function loadPeople() {
    setLoading(true);
    if (previousSearch.current !== searchText) {
      nextPage.current = 1;
    }
    // Let chart component know loading is in progress.
    fetch("https://swapi.dev/api/people/?page=" + nextPage.current + "&search=" + searchText)
      .then(res => res.json())
      .then(
        result => {
          // Only keep the data we need
          const slimResult = result?.results?.map((result) => {
            return { name: result.name, gender: result.gender }
          })
          console.log('previousSearch.current', previousSearch.current, 'searchText', searchText)
          if (previousSearch.current !== searchText) {
            setCharacters(sortResults(slimResult));
          } else {
            setCharacters(sortResults([...characters, ...slimResult]));
          }
          if (result.next) {
            nextPage.current = result.next.replace(/\D/g, '');
          }
          previousSearch.current = searchText;
          setCharacterCount(result.count);
          setLoading(false);
        },
        error => {
          setLoading(false);
          setErrorText(error);
        }
      );
  };


  function sortResults(results, sorting = sortSelector) {
    switch (sorting) {
      case 'A-Z':
        return results.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      case 'Z-A':
        return results.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
      case 'Male':
        var maleSortOrder = ['male', 'female', 'hermaphrodite', 'n/a', 'none'];
        return results.sort((a, b) => {
          return maleSortOrder.indexOf(a.gender) - maleSortOrder.indexOf(b.gender);
        });
      case 'Female':
        var femaleSortOrder = ['female', 'male', 'hermaphrodite', 'n/a', 'none'];
        return results.sort((a, b) => {
          return femaleSortOrder.indexOf(a.gender) - femaleSortOrder.indexOf(b.gender);
        });
      default: return results;
    }
  }

  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  };

  function handleSortChange(event) {
    setSortSelector(event.target.value);
    setCharacters(sortResults(characters, event.target.value))

  };

  React.useEffect(() => {
    loadPeople();
  }, []);

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
        <TextField className='search-field' label="Search Character" onChange={handleSearchTextChange} value={searchText} variant="standard" />
        <Button className='search-button' onClick={loadPeople} variant="outlined">Search Character</Button>
      </div>
      <div className='app-content'>
        {characters?.length > 0 && (
          <div className='results-container'>
            <span>Showing {characters?.length} results of {characterCount}</span>
            <InputLabel className='filter-label'>Sort by</InputLabel>
            <Select
              value={sortSelector}
              className='filter'
              onChange={handleSortChange}
            >
              <MenuItem value={'Unsorted'}>Unsorted</MenuItem>
              <MenuItem value={'A-Z'}>A-Z</MenuItem>
              <MenuItem value={'Z-A'}>Z-A</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </div>
        )}
        <div className='results-list'>
          <div className='character-card-container'>
            {loading && !characters?.length && (
              <span>Loading...</span>
            )}
            {!loading && !characters?.length && (
              <span>No results!</span>
            )}
            <span>{errorText}</span>
            {characters && characters.map((character, index) => {
              return (
                <Card key={index} index={index} character={character} />)
            })}
          </div>
          {nextPage && (
            <Button className='load-more-button' onClick={loadPeople} variant="outlined">Load More</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
