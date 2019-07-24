import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { filterChanged } from '../actions/todos';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {DebounceInput} from 'react-debounce-input';

const styles = (theme) => ({
    paperWrapper: {
        padding: '25px',
    },
    buttonWrapper: {
        flex: 1,
    },
    fab: {
        margin: theme.spacing.unit
    },
    formControl: {
        margin: theme.spacing.unit * 3,
        marginRight: '50px'
    },
    title: {
        margin: theme.spacing.unit * 3,
    }
});
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null,
            done: null,
        }
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });

        this.props.filterChanged({ ...this.state, description: e.target.value });
    }

    handleDoneChange = (e) => {
        if (!this.state.done) {
            this.setState({ done: true })
        }

        this.setState({ done: !this.state.done }, this.props.filterChanged({ ...this.state, done: !this.state.done }))
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.paperWrapper}>
                <Paper>
                    <Typography variant='h6' className={classes.title}>
                        Filters
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <FormLabel component="legend">Description</FormLabel>
                        <DebounceInput element={TextField} debounceTimeout={300} onChange={(e) => this.handleDescriptionChange(e)}></DebounceInput>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel component="legend">Done</FormLabel>
                        <Checkbox
                            checked={this.state.done}
                            onChange={this.handleDoneChange}
                            color="primary"
                        />
                    </FormControl>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({ todos: state.todos })
const mapDispatchToProps = dispatch => bindActionCreators({ filterChanged }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filter));