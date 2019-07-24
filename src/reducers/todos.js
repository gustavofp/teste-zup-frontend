import { TODOS_FETCH_STARTED, TODOS_FETCH_SUCCESS, TODOS_FETCH_ERROR, FILTER_CHANGED, EDIT_TODO_SUCCESS, REMOVE_TODO_SUCCESS, ADD_TODO_SUCCESS } from '../actions/todos';
const INITIAL_STATE = {
    data: [],
    rawData: [],
    error: null,
    edited: null,
    added: null,
    removed: null,
    filters: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TODOS_FETCH_STARTED:
            return { ...state }
        case TODOS_FETCH_SUCCESS:
            return { ...state, data: action.payload, rawData: action.payload }
        case TODOS_FETCH_ERROR:
            return { ...state, error: action.payload }
        case FILTER_CHANGED:
            return { ...state, filters: action.payload }
        case EDIT_TODO_SUCCESS:
            return { ...state, edited: action.payload }
        case REMOVE_TODO_SUCCESS:
            return { ...state, removed: action.payload }
        case ADD_TODO_SUCCESS:
            return { ...state, added: action.payload }
        default:
            return { ...state }

    }

}