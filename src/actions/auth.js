import { success } from 'react-toastify-redux';

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const logIn = () => (dispatch) => {
    dispatch({ type: USER_LOGGED_IN, payload: true });
    dispatch(success('Logged in!'));
}

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const logOut = () => (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT, payload: false });
    dispatch(success('Logged out!'));
}