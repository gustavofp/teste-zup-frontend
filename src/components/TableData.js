import React from 'react';
import { TableBody, TableCell, TableRow, IconButton, Checkbox } from '@material-ui/core';
import Icon from '@material-ui/core/Icon'

const TableItem = props => {
    const { item, handleEdit, handleRemove, handleDone } = props;

    return (
        <TableRow>
            <TableCell>{ item.description }</TableCell>
            <TableCell>
                <Checkbox checked={item.done} onChange={(e) => handleDone(item)} value="checkedA" />
            </TableCell>
            <TableCell align='right'>
                <IconButton onClick={(e) => handleEdit(item)}><Icon>edit</Icon></IconButton>
                <IconButton onClick={(e) => handleRemove(item.id)}><Icon>close</Icon></IconButton>
            </TableCell>
        </TableRow>
    )
}


const renderData = (data, handleEdit, handleRemove, handleDone) => {
    return data.map((i, index) => (<TableItem item={i} key={index} handleEdit={handleEdit} handleRemove={handleRemove} handleDone={handleDone} />))
}

const TableData = (props) => {
    const { data, handleEdit, handleRemove, handleDone } = props;

    return ( 
        <TableBody>
            { renderData(data, handleEdit, handleRemove, handleDone) }
        </TableBody>
     );
}
 
export default TableData;