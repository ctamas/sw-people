import './dialog.css';
import React from 'react';
import Button from '@mui/material/Button';
import BootstrapDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Dialog(props) {
    return (
        <React.Fragment>
            {props.personDetails && (
                <BootstrapDialog
                    onClose={props.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={props.open}
                >
                    <DialogTitle id="form-dialog-title">{props.personDetails?.name}</DialogTitle>
                    <Divider />
                    <DialogContent className='dialog-container'>
                        <Typography paragraph>
                            Height: {props.personDetails?.height}
                        </Typography>
                        <Typography paragraph>
                            Mass: {props.personDetails?.mass}
                        </Typography>
                        <Typography paragraph>
                            Hair color: {props.personDetails?.hair_color}
                        </Typography>
                        <Typography paragraph>
                            Hair color: {props.personDetails?.eye_color}
                        </Typography>
                        <Typography paragraph>
                            Birth year: {props.personDetails?.birth_year}
                        </Typography>
                        <Typography paragraph>
                            Gender: {props.personDetails?.gender}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            )}
        </React.Fragment>
    )
}
export default Dialog;
