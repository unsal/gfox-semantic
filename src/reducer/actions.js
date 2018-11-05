export const NEW_REQUEST = "NEW_REQUEST";
export const GFOX_STORE_DATA = "GFOX_STORE_DATA";
export const GFOX_MODE = "GFOX_MODE"; // ADD, DELETE, UPDATE, DEFAULT
export const GFOX_ERROR = "GFOX_ERROR"
export const GFOX_CID = "GFOX_CID"
export const GFOX_UID = "GFOX_UID"
export const GFOX_AUTH = "GFOX_AUTH"


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
}

//Login olunmuşsa store'a true atar
export const updateStoreAuthenticated = (authenticated) => {
  return {type: GFOX_AUTH, authenticated}
}

export const updateStoreCompany = (cid) => {
  return {type: GFOX_CID, cid}  //data: [{cid:1, uid:'admin@grcfox.com}]
}

export const updateStoreUser = (uid) => {
  return {type: GFOX_UID, uid}  //data: [{cid:1, uid:'admin@grcfox.com}]
}

