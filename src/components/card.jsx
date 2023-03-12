import '../App.css';
import iconBlack from '../sw-black.png';
import iconRed from '../sw-red.png';
import React from 'react';

function Card(props) {
    return (
        <div className='character-card'>
            <img src={props.index % 2 ? iconRed : iconBlack} height='64px' width='64px' alt='Star wars icon' className='character-picture' />
            <span className='character-name'>{props.character?.name}</span>
        </div>
    );
}

export default Card;
