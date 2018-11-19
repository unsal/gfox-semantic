export const NEW_REQUEST = "NEW_REQUEST";
export const GFOX_STORE_DATA = "GFOX_STORE_DATA";
export const GFOX_MODE = "GFOX_MODE"; // ADD, DELETE, UPDATE, DEFAULT
export const GFOX_ERROR = "GFOX_ERROR"
export const GFOX_CID = "GFOX_CID"
export const GFOX_UID = "GFOX_UID"
export const GFOX_TOKEN = "GFOX_TOKEN"
export const GFOX_CID_OPTIONS = "GFOX_CID_OPTIONS"


// KV Talepleri Yeni talep varsa..
export const updateStoreNewRequest = newRequest => {
  return { type: NEW_REQUEST, newRequest };
};

export const updateStoreData = data => {
  return { type: GFOX_STORE_DATA, data };
};


export const updateErrorStatus = (error) => {
  return {type: GFOX_ERROR, error}
}

export const updateStoreCID = (cid) => {
  return {type: GFOX_CID, cid}  //data: [{cid:1, uid:'admin@grcfox.com}]
}

export const updateStoreUID = (uid) => {
  return {type: GFOX_UID, uid}  //data: [{cid:1, uid:'admin@grcfox.com}]
}

export const updateStoreToken = (token) => {
  return {type: GFOX_TOKEN, token}  //data: [{cid:1, uid:'admin@grcfox.com}]
}

//Headerdaki seçilen CID'leri yüklemek için...
// Her sayfada KVKKLayout çağrıldığı için headerda tekrar tekrar yüklendiği için storea yüklendi
export const updateStoreCIDOptions = (cidOptions) => {
  return {type: GFOX_CID_OPTIONS, cidOptions}  //data: [{cid:1, uid:'admin@grcfox.com}]
}

