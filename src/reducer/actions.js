export const GFOX_STORE_DATA = "GFOX_STORE_DATA"
export const GFOX_STORE_INITIAL_DATA = "GFOX_STORE_INITIAL_DATA"
export const GFOX_ERROR = "GFOX_ERROR"
export const GFOX_CID = "GFOX_CID"
export const GFOX_UID = "GFOX_UID"
export const GFOX_TOKEN = "GFOX_TOKEN"
export const GFOX_CID_OPTIONS = "GFOX_CID_OPTIONS"
export const GFOX_URL = "GFOX_URL"
export const GFOX_SEARCH_MODE = "GFOX_SEARCH_MODE";


export const updateStoreData = data => {
  return { type: GFOX_STORE_DATA, data };
};

//ilk yüklenen datayı korumak için
export const updateStoreInitialData = initialData => {
  return { type: GFOX_STORE_INITIAL_DATA, initialData };
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

// Bulunulan sayfanın GET URL'i store'a atılır ki CID değiştirildiğinde refreshStoreData ile sayfa refresh edebilsin.
export const updateStoreURL = (url) => {
  return {type: GFOX_URL, url}  //data: [{cid:1, uid:'admin@grcfox.com}]
}

// Header > Menu > Sorgula
export const updateStoreSearchMode = (searchMode) => {
  return {type: GFOX_SEARCH_MODE, searchMode}  //data: [{cid:1, uid:'admin@grcfox.com}]
}
