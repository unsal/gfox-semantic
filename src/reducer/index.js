import {createStore} from 'redux';
import {NEW_REQUEST, GFOX_STORE_DATA, GFOX_MODE, GFOX_ERROR} from './actions';

const initialState = {newRequest: true, data: [],  mode: 'DEFAULT', error: false}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case NEW_REQUEST     : return {...state, newRequest: action.newRequest};
       case GFOX_STORE_DATA : return {...state, data: action.data}
       case GFOX_MODE  : return {...state, mode: action.mode}
       case GFOX_ERROR  : return {...state, error: action.error}
       default: return state;
    }

}

export const store = createStore(reducer);