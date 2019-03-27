export const GFOX_STORE_DATA = "GFOX_STORE_DATA";
export const GFOX_STORE_INITIAL_DATA = "GFOX_STORE_INITIAL_DATA";
export const GFOX_ERROR = "GFOX_ERROR";
export const GFOX_CID = "GFOX_CID";
export const GFOX_CID_NAME = "GFOX_CID_NAME";
export const GFOX_CID_CHANGED = "GFOX_CID_CHANGED";
export const GFOX_CID_OPTIONS = "GFOX_CID_OPTIONS";
export const GFOX_UID = "GFOX_UID";
export const GFOX_TOKEN = "GFOX_TOKEN";
export const GFOX_URL = "GFOX_URL";
export const GFOX_SEARCH_MODE = "GFOX_SEARCH_MODE";
export const GFOX_ACTIVE_MENU = "GFOX_ACTIVE_MENU";
export const GFOX_BIRIM = "GFOX_BIRIM"; // kullanıcı birimini sorgularda pass etmek için.

export const updateStoreData = data => {
  return { type: GFOX_STORE_DATA, data };
};

//ilk yüklenen datayı korumak için
export const updateStoreInitialData = initialData => {
  return { type: GFOX_STORE_INITIAL_DATA, initialData };
};

export const updateErrorStatus = error => {
  return { type: GFOX_ERROR, error };
};

export const updateStoreCID = cid => {
  return { type: GFOX_CID, cid }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

export const updateStoreCIDName = cidName => {
  return { type: GFOX_CID_NAME, cidName }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

export const updateStoreCIDChanged = cidChanged => {
  return { type: GFOX_CID_CHANGED, cidChanged }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

export const updateStoreUID = uid => {
  return { type: GFOX_UID, uid }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

export const updateStoreToken = token => {
  return { type: GFOX_TOKEN, token }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

//Headerdaki seçilen CID'leri yüklemek için...
// Her sayfada Layout çağrıldığı için headerda tekrar tekrar yüklendiği için storea yüklendi
export const updateStoreCIDOptions = cidOptions => {
  return { type: GFOX_CID_OPTIONS, cidOptions }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

// Bulunulan sayfanın GET URL'i store'a atılır ki CID değiştirildiğinde refreshStoreData ile sayfa refresh edebilsin.
export const updateStoreURL = url => {
  return { type: GFOX_URL, url }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

// Header > Menu > Sorgula
export const updateStoreSearchMode = searchMode => {
  return { type: GFOX_SEARCH_MODE, searchMode }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

// Left Menu Name seçildiğinde store'da ismini kaydeder -böylece actif menu sçeilmiş olur-
export const updateStoreActiveMenu = activeMenu => {
  return { type: GFOX_ACTIVE_MENU, activeMenu }; //data: [{cid:1, uid:'admin@grcfox.com}]
};

// Kullanıcı birimini sorgularda pass etmek için.
export const updateStoreBirim = birim => {
  return { type: GFOX_BIRIM, birim };
};
