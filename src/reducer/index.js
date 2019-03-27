import { createStore } from "redux";
import {
  GFOX_STORE_DATA,
  GFOX_STORE_INITIAL_DATA,
  GFOX_SEARCH_MODE,
  GFOX_ERROR,
  GFOX_CID,
  GFOX_CID_NAME,
  GFOX_CID_CHANGED,
  GFOX_CID_OPTIONS,
  GFOX_UID,
  GFOX_TOKEN,
  GFOX_URL,
  GFOX_ACTIVE_MENU,
  GFOX_BIRIM
} from "./actions";

const initialState = { data: [], mode: "DEFAULT", error: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GFOX_STORE_DATA:
      return { ...state, data: action.data };
    case GFOX_STORE_INITIAL_DATA:
      return { ...state, initialData: action.initialData };
    case GFOX_ERROR:
      return { ...state, error: action.error };
    case GFOX_CID:
      return { ...state, cid: action.cid };
    case GFOX_CID_NAME:
      return { ...state, cidName: action.cidName };
    case GFOX_CID_CHANGED:
      return { ...state, cidChanged: action.cidChanged };
    case GFOX_CID_OPTIONS:
      return { ...state, cidOptions: action.cidOptions };
    case GFOX_UID:
      return { ...state, uid: action.uid };
    case GFOX_TOKEN:
      return { ...state, token: action.token };
    case GFOX_URL:
      return { ...state, url: action.url };
    case GFOX_SEARCH_MODE:
      return { ...state, searchMode: action.searchMode };
    case GFOX_ACTIVE_MENU:
      return { ...state, activeMenu: action.activeMenu };
    case GFOX_BIRIM:
      return { ...state, birim: action.birim };
    default:
      return state;
  }
};

export const store = createStore(reducer);
