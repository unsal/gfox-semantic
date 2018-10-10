import {createStore} from 'redux';
import {NEW_REQUEST, GFOX_STORE_DATA} from './actions';

const initialState = {newRequest: true, data: [], recordDeleted: false}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case NEW_REQUEST: return {...state, newRequest: action.newRequest};
       case GFOX_STORE_DATA: return {...state, data: action.data}
       default: return state;
    }

}

export const store = createStore(reducer);