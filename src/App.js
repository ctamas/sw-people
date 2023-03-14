import './App.css';
import React from 'react';
import Cards from './components/cards/cards'
import Navbar from './components/navbar/navbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';

function App() {
  const [characters, setCharacters] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const [errorText, setErrorText] = React.useState('')
  const [characterCount, setCharacterCount] = React.useState(0)
  const [sortSelector, setSortSelector] = React.useState('Unsorted')
  const [searchText, setSearchText] = React.useState('');
  const [lastSearchText, setLastSearchText] = React.useState('');
  const nextPage = React.useRef('');

  // New search = discard current page and start from page 1
  // Property provides an override for a different search word compared to the input box value
  function newSearch(searchName = searchText) {
    setLoading(true);
    fetch('https://swapi.dev/api/people/?page=1&search=' + searchName)
      .then(res => res.json())
      .then(
        result => {
          // Reset sort as we are starting a new search
          setSortSelector('Unsorted');
          setCharacters(result?.results);
          // Get next page from result.next property, also works with double digit pages
          setNextPage(result.next);
          setCharacterCount(result.count);
          setLastSearchText(searchName);
          setLoading(false);
        },
        error => {
          setLoading(false);
          setErrorText(error);
        }
      );
  };

  // Reuse last query to append to current result list
  function loadMore() {
    setLoading(true);
    fetch('https://swapi.dev/api/people/?page=' + nextPage.current + '&search=' + lastSearchText)
      .then(res => res.json())
      .then(
        result => {
          // Sort again with the new additions
          setCharacters(sortResults([...characters, ...result?.results]));
          setNextPage(result.next);
          setCharacterCount(result.count);
          setLoading(false);
        },
        error => {
          setLoading(false);
          setErrorText(error);
        }
      );
  };

  function setNextPage(next) {
    nextPage.current = next?.replace(/\D/g, '');

  }

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

  function handleSearchSubmit(event) {
    event.preventDefault();
    // Prevent a search that would do nothing
    if (searchText !== lastSearchText) {
      newSearch();
    }
  };

  function handleClearSearch() {
    setSearchText('');
    newSearch('');
  };

  function handleSortChange(event) {
    setSortSelector(event.target.value);
    setCharacters(sortResults(characters, event.target.value))
  };

  function handleLoadMore() {
    // Prevent changed search field content from interfering with Load more
    setSearchText(lastSearchText);
    loadMore();
  };

  React.useEffect(() => {
    newSearch();
    // eslint-disable-next-line
  }, []);

  return (
    <div data-testid='test-root-component'>
      <Navbar />
      <div className='search-container'>
        <div className='search-field-container'>
          <form className='search-form' onSubmit={handleSearchSubmit}>
            <TextField className='search-field' label='Search Character' onChange={handleSearchTextChange} value={searchText} variant='standard' />
          </form>
          <ClearIcon className={(!searchText ? 'hidden' : '') + ' search-clear'} onClick={handleClearSearch} />
        </div>
        <Button className='search-button' onClick={handleSearchSubmit} variant='outlined' disabled={searchText === lastSearchText}>
          {loading ? (
            <RefreshIcon className='rotate' />
          ) : (
            <span>Search Character</span>
          )}
        </Button>
      </div>
      <div className='app-content'>
        {characters?.length > 0 && (
          <div className='results-container'>
            <span>Showing {characters?.length} results of {characterCount}</span>
            {lastSearchText && (<span> for '{lastSearchText}'</span>)}
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
              <span>No results {lastSearchText && (<span> for '{lastSearchText}'</span>)}!</span>
            )}
            <span>{errorText}</span>
            {characters && (
              <Cards characters={characters} />
            )}
          </div>
          {nextPage.current && (
            <Button className='load-more-button' onClick={handleLoadMore} variant='outlined'>
              {loading ? (
                <RefreshIcon className='rotate' />
              ) : (
                <span>Load More</span>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
