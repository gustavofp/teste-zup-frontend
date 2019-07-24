import { combineReducers } from 'redux';

import { toastsReducer as toasts } from 'react-toastify-redux';
import todos from './todos';
import auth from './auth';

export default combineReducers({
    toasts,
    todos,
    auth
});
