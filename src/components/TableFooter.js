import React from 'react';
import { TablePagination } from '@material-ui/core';


const TableFooter = (props) => {
    const { length, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = props;
    return ( 
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
     );
}
 
export default TableFooter;