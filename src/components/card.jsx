import '../App.css';
import Button from '@mui/material/Button';
import React from 'react';

function Card(props) {
  const [characters, setCharacters] = React.useState([1]);

  console.log('character', props.character);
  return (
    <div className='character-card'>
        <span className='character-picture'></span>
        <span className='character-name'>{props.character?.name}</span>
    </div>
  );
}

export default Card;
