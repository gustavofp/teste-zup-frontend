import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableRow, TableHead, TableCell, Typography } from '@material-ui/core';

const styles = {
    title: {
        flex: '0 0 auto',
        padding: '15px'
    }
}

const renderData = (data) => {
    return data.map(i => (<TableCell>{i}</TableCell>));
}

const TableHeader = (props) => {
    const { classes, title } = props;
    return (
        <TableHead>
            <TableRow>
                <div className={classes.title}>
                    <Typography variant="h6">
                        { title }
                    </Typography>
                </div>
            </TableRow>
            <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Done</TableCell>
                <TableCell align="right">Options</TableCell>
            </TableRow>
        </TableHead>
    );
}

export default withStyles(styles)(TableHeader);