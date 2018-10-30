export const NEW_REQUEST = "NEW_REQUEST";
export const GFOX_STORE_DATA = "GFOX_STORE_DATA";
export const GFOX_MODE = "GFOX_MODE"; // ADD, DELETE, UPDATE, DEFAULT
export const GFOX_ERROR = "GFOX_ERROR"

// KV Talepleri Yeni talep varsa..
export const updateStoreNewRequest = newRequest => {
  return { type: NEW_REQUEST, newRequest };
};

export const updateStoreData = data => {
  return { type: GFOX_STORE_DATA, data };
};

export const updateStoreMode = (mode) => {
  return {type: GFOX_MODE, mode}
};

export const updateErrorStatus = (error) => {
  return {type: GFOX_ERROR, error}
};

