import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../actions/auth';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12,
      },
};


const Header = props => {
    const { classes } = props;
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Todo List
                </Typography>
                <section className={classes.rightToolbar}>
                <Typography onClick={(e) => props.logOut()} variant="h6" color="inherit" className={classes.grow}>
                    Logout
                </Typography>
                </section>
            </Toolbar>
        </AppBar>

    );
}
const mapDispatchToProps = dispatch => bindActionCreators({ logOut }, dispatch);
export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));