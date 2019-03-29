import { createStore } from "redux";
import {
  GFOX_STORE_DATA,
  GFOX_STORE_INITIAL_DATA,
  GFOX_SEARCH_MODE,
  GFOX_URL,
  GFOX_ACTIVE_MENU,
  GFOX_AUTH,
} from "./actions";

const initialState = { data: [], mode: "DEFAULT", error: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GFOX_STORE_DATA:
      return { ...state, data: action.data };
    case GFOX_STORE_INITIAL_DATA:
      return { ...state, initialData: action.initialData };
    case GFOX_URL:
      return { ...state, url: action.url };
    case GFOX_SEARCH_MODE:
      return { ...state, searchMode: action.searchMode };
    case GFOX_ACTIVE_MENU: //Charts Menusu için
      return { ...state, activeMenu: action.activeMenu };
    case GFOX_AUTH:
      return { ...state, auth: action.auth };
      // auth: {uid, dpo, admin}
    default:
      return state;
  }
};

export const store = createStore(reducer);
