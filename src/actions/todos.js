import axios from 'axios';
import config from '../config';
import { error, success } from 'react-toastify-redux';

export const TODOS_FETCH_STARTED = 'TODOS_FETCH_STARTED';
export const TODOS_FETCH_SUCCESS = 'TODOS_FETCH_SUCCESS';
export const TODOS_FETCH_ERROR = 'TODOS_FETCH_ERROR';
export const fetchTodos = () => (dispatch) => {
    dispatch({ type: TODOS_FETCH_STARTED });

    getTodosRequest()
        .then((res) => {
            dispatch({
                type: TODOS_FETCH_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: TODOS_FETCH_ERROR,
                payload: err
            })
        })
}

const getTodosRequest = () => {
    return axios.get(`${config.API}/api/todos`)
}

export const ADD_TODO_STARTED = 'ADD_TODO_STARTED';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR';
export const addTodo = (data) => (dispatch) => {
    dispatch({ type: ADD_TODO_STARTED });

    axios.post(`${config.API}/api/todos`, data)
        .then((res) => {
            dispatch({ type: ADD_TODO_SUCCESS, payload: res.data });
            dispatch(success('Todo added!'))

            return getTodosRequest()
        })
        .then((res) => {
            dispatch({
                type: TODOS_FETCH_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({ type: ADD_TODO_ERROR });
            dispatch(error('Error adding todo'))
        })

}

export const FILTER_CHANGED = 'FILTER_CHANGED';
export const filterChanged = (filters) => (dispatch) => {
    dispatch({
        type: FILTER_CHANGED,
        payload: filters
    })

}

export const REMOVE_TODO_STARTED = 'REMOVE_TODO_STARTED';
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS';
export const REMOVE_TODO_ERROR = 'REMOVE_TODO_ERROR';
export const removeTodo = (id) => (dispatch) => {
    dispatch({ type: REMOVE_TODO_STARTED });

    axios.delete(`${config.API}/api/todos/${id}`)
        .then((res) => {
            dispatch({ type: REMOVE_TODO_SUCCESS, payload: res.data });
            dispatch(success('Todo removed!'));

            return getTodosRequest()
        })
        .then((res) => {
            dispatch({
                type: TODOS_FETCH_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({ type: REMOVE_TODO_ERROR });
            dispatch(error('error removing todo!'))
        })
}

export const EDIT_TODO_STARTED = 'EDIT_TODO_STARTED';
export const EDIT_TODO_SUCCESS = 'EDIT_TODO_SUCCESS';
export const EDIT_TODO_ERROR = 'EDIT_TODO_ERROR';
export const editTodo = (data) => (dispatch) => {
    dispatch({ type: EDIT_TODO_STARTED });

    axios.put(`${config.API}/api/todos/${data.id}`, data)
        .then((res) => {
            dispatch({ type: EDIT_TODO_SUCCESS, payload: res.data });
            dispatch(success('Todo edited!'));

            return getTodosRequest()
        })
        .then((res) => {
            dispatch({
                type: TODOS_FETCH_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({ type: EDIT_TODO_ERROR });
            dispatch(error('error editing todo!'))
        })
}
