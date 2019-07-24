import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHeader from '../components/TableHeader';
import TableData from '../components/TableData';
import TableFooter from '../components/TableFooter';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TodoModal from '../components/TodoModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchTodos, addTodo, removeTodo, editTodo } from '../actions/todos';

const styles = (theme) => ({
    paperWrapper: {
        padding: '25px',
        marginBottom: '60px'
    },
    buttonWrapper: {
        flex: 1,
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }
});

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: null,
            data: [],
            firstTimeLoading: true,
            hasFilters: false,
            pagination: {
                page: 0,
                rowsPerPage: 5
            },
            isModalOpen: false,
            items: []
        }
    }

    componentWillMount() {
        this.props.fetchTodos()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.todos.data !== this.props.todos.data) {
            this.setState({ firstTimeLoading: true })
        }

        if (nextProps.todos.filters !== this.props.todos.filters) {
            this.filtersChanged(this.state.pagination, nextProps.todos.filters);
        }
    }

    handleFiltersChange = (filters, data) => {
        console.log(data)
        let filteredData = []
        if (filters.description) {
            filteredData = data.filter(o => {
                const description = o.description.toUpperCase();
                return description.includes(filters.description.toUpperCase())
            });
        }

        if (filters.done || filters.done === false) {
            filteredData = data.filter(o => o.done === filters.done);
        }
        console.log(filteredData);

        return filteredData;
    }

    filtersChanged = (pagination, filters) => {
        const { page, rowsPerPage } = pagination;
        const todos = this.hasFilters(filters) ? this.handleFiltersChange(filters, this.props.todos.rawData) : this.props.todos.rawData;
        const data = this.handlePaginationChange(todos, page, rowsPerPage);

        this.setState({ data });
    }

    hasFilters = (filters) => {
        console.log(filters)
        return (filters && filters.description && filters.description !== '') || (filters && filters.done !== null)
    }

    handlePaginationChange = (data, page, rowsPerPage) => {
        return data.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    handleChangePage = (e, page) => {
        if (!e) return;
        this.state.pagination.page = page;

        this.filtersChanged(this.state.pagination, this.props.todos.filter);
    }

    handleChangeRowsPerPage = (e) => {
        if (!e) return;
        this.state.pagination.rowsPerPage = e.target.value;

        this.filtersChanged(this.state.pagination, this.props.todos.filter);
    }

    handleEdit = (item) => {
        this.setState({ isModalOpen: true, edit: item });
    }

    handleDone = (item) => {
        const data = { ...item, done: !item.done };

        this.props.editTodo(data);
    }

    handleRemove = (id) => {
        this.props.removeTodo(id);
    }

    handleAddTodo = (e) => {
        this.setState({ isModalOpen: true, edit: null });
    }

    handleFormSubmit = (data) => {
        if (this.state.edit) {
            data.id = this.state.edit.id;
            this.props.editTodo(data);
            this.setState({ edit: null });
        } else {
            this.props.addTodo(data);
        }
    }

    handleModalClose = () => {
        this.setState({ isModalOpen: false, edit: null });
        this.props.fetchTodos();
    }

    render() {
        const { classes, todos, filters } = this.props;
        const { headers, data, pagination, isModalOpen, firstTimeLoading, edit } = this.state;
        const { page, rowsPerPage } = pagination;

        if (todos.data.length === 0) {
            return null
        }

        if (todos.data.length > 0 && firstTimeLoading) {
            this.setState({ firstTimeLoading: false, edit: null })
            this.filtersChanged(pagination, filters);
        }

        return (
            <div className={classes.paperWrapper}>
                <Paper>
                    <div className={classes.tableWrapper}>
                        <Table>
                            <TableHeader title={'Todos'} />
                            <TableData
                                data={data}
                                handleEdit={this.handleEdit}
                                handleRemove={this.handleRemove}
                                handleDone={this.handleDone}
                            />
                        </Table>
                        <TableFooter
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPage={rowsPerPage}
                            length={todos.data.length}
                            page={page} />
                    </div>
                    <div className={classes.buttonWrapper}>
                        <Fab color="primary" onClick={this.handleAddTodo} aria-label="Add" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </div>
                    <TodoModal isOpen={isModalOpen} editData={edit} handleClose={this.handleModalClose} handleSubmit={this.handleFormSubmit} />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({ todos: state.todos })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchTodos, addTodo, removeTodo, editTodo }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(List));