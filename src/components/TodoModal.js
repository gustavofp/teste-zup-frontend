import React, { Component } from 'react';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
      right: '35%',
      top: '8%'
    },
    modal: {
        top: `50%`,
        margin: 'auto',
        transform: `translate(-50%, -50%)`,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
      },
  });

class TodoModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            description: null,
            id: null,
            when: moment().format('YYYY-MM-DDTHH:mm'),
            rememberMeWhen: moment().format('YYYY-MM-DDTHH:mm'),
            prediction: moment().format('YYYY-MM-DDTHH:mm')
         }
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.handleSubmit(this.state)
        this.props.handleClose();
    }

    render() { 
        const { isOpen, classes, editData, handleClose } = this.props;
        const { when, rememberMeWhen, prediction, description, id } = editData || this.state

        return ( 
            <Modal open={isOpen} onClose={handleClose} >
                <div className={classes.paper}>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">Description</FormLabel>
                            <TextField defaultValue={description} onChange={this.handleDescriptionChange}></TextField>
                        </FormControl>
                        <FormControl style={{ display: 'block' }} className={classes.formControl}>
                            <Button type="submit" color="primary" variant="contained" className={classes.button}>
                                { editData ? `Edit` : `Submit`}
                            </Button>
                        </FormControl>
                    </form> 
                </div>
            </Modal>
        );
    }
}
 
export default withStyles(styles)(TodoModal);