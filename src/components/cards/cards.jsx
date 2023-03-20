import './cards.css';
import React from 'react';
import iconBlack from '../../sw-black.png';
import iconRed from '../../sw-red.png';
import Dialog from '../dialog/dialog';

function Cards(props) {
    const [open, setOpen] = React.useState(false);
    const [personDetails, setPersonDetails] = React.useState(null);

    function handleClickOpen(event, character) {
        event.preventDefault();
        setPersonDetails(character)
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
        setPersonDetails(null)
    };

    return (
        <React.Fragment>
            {props.characters?.map((character, index) => {
                return (
                    <div key={index} onClick={(event) => handleClickOpen(event, character)} className='character-card' data-testid='test-character-card'>
                        <img src={index % 2 ? iconRed : iconBlack} alt='Star wars icon' className='character-picture' />
                        <span className='character-name'>{character.name}</span>
                    </div>
                );
            })}
            <Dialog open={open} personDetails={personDetails} handleClose={handleClose} />
        </React.Fragment>
    )
}
export default Cards;
