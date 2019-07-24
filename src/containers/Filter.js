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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
        // Material-Ui select only accepts string values
        this.SELECT_FILTER_DEFAULT = "none"
        this.state = {
            description: null,
            done: this.SELECT_FILTER_DEFAULT
        }
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value }, this.props.filterChanged({ ...this.state, description: e.target.value }));
    }

    handleDoneChange = (e) => {
        const { description } = this.state;
        const doneString = e.target.value;
        const done = (doneString === this.SELECT_FILTER_DEFAULT) ? null : (doneString == 'true');

        this.setState({ done: doneString }, this.props.filterChanged({ description, done }))
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
                            <Select
                            value={this.state.done}
                            onChange={this.handleDoneChange}
                            inputProps={{
                                name: 'Done',
                                id: 'done-select',
                            }}
                            >
                            <MenuItem value={this.SELECT_FILTER_DEFAULT}>
                                <em>None</em>
                            </MenuItem>
                                <MenuItem value={"true"}>True</MenuItem>
                                <MenuItem value={"false"}>False</MenuItem>
                            </Select>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({ todos: state.todos })
const mapDispatchToProps = dispatch => bindActionCreators({ filterChanged }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filter));