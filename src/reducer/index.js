import {createStore} from 'redux';
import {NEW_REQUEST, GFOX_STORE_DATA, GFOX_MODE,
        GFOX_ERROR, GFOX_CID, GFOX_UID, GFOX_AUTH} from './actions';

const initialState = {newRequest: true, data: [],  mode: 'DEFAULT', error: false}

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case NEW_REQUEST     : return {...state, newRequest: action.newRequest};
       case GFOX_STORE_DATA : return {...state, data: action.data}
       case GFOX_MODE  : return {...state, mode: action.mode}
       case GFOX_ERROR  : return {...state, error: action.error}
       case GFOX_CID  : return {...state, cid: action.cid}
       case GFOX_UID  : return {...state, uid: action.uid}
       case GFOX_AUTH  : return {...state, authenticated: action.authenticated}
       default: return state;
    }

}

export const store = createStore(reducer);
// aşağıdaki virgülden sonraki 2nci kısım chrome devtools için eklendi
// export const store = createStore(reducer, +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());