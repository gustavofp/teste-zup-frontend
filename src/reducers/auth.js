import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/auth';
const INITIAL_STATE = {
    isLoggedIn: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload }
        case USER_LOGGED_OUT:
            return { ...state, isLoggedIn: action.payload }
        default:
            return { ...state }

    }
}