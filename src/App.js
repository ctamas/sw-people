import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
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
      </div>
    </div>
  );
}

export default App;
