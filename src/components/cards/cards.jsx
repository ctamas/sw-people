import './cards.css';
import React from 'react';
import iconBlack from '../../sw-black.png';
import iconRed from '../../sw-red.png';
import Button from '@mui/material/Button';
import BootstrapDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

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
            {personDetails && (
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle id="form-dialog-title">{personDetails?.name}</DialogTitle>
                    <Divider />
                    <DialogContent className='dialog-container'>
                        <Typography paragraph>
                            Height: {personDetails?.height}
                        </Typography>
                        <Typography paragraph>
                            Mass: {personDetails?.mass}
                        </Typography>
                        <Typography paragraph>
                            Hair color: {personDetails?.hair_color}
                        </Typography>
                        <Typography paragraph>
                            Hair color: {personDetails?.eye_color}
                        </Typography>
                        <Typography paragraph>
                            Birth year: {personDetails?.birth_year}
                        </Typography>
                        <Typography paragraph>
                            Gender: {personDetails?.gender}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            )}
        </React.Fragment>
    )
}
export default Cards;
