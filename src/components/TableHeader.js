import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableRow, TableHead, TableCell, Typography } from '@material-ui/core';

const styles = {
    title: {
        flex: '0 0 auto',
        padding: '15px'
    }
}

const TableHeader = (props) => {
    const { classes, title } = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={3}>
                    <Typography className={classes.title} variant="h6">
                        {title}
                    </Typography>
                </TableCell>
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