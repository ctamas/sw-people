import './cards.css';
import React from 'react';
import iconBlack from '../../sw-black.png';
import iconRed from '../../sw-red.png';

function Cards(props) {
    return (
        <React.Fragment>
            {props.characters?.map((character, index) => {
                return (
                    <div key={index} className='character-card' data-testid='test-character-card'>
                        <img src={index % 2 ? iconRed : iconBlack} alt='Star wars icon' className='character-picture' />
                        <span className='character-name'>{character.name}</span>
                    </div>
                );
            })}
        </React.Fragment>
    )
}
export default Cards;
