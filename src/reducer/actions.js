export const GFOX_STORE_DATA = "GFOX_STORE_DATA";
export const GFOX_STORE_INITIAL_DATA = "GFOX_STORE_INITIAL_DATA";
export const GFOX_UID = "GFOX_UID";
export const GFOX_URL = "GFOX_URL";
export const GFOX_SEARCH_MODE = "GFOX_SEARCH_MODE";
export const GFOX_ACTIVE_MENU = "GFOX_ACTIVE_MENU";
export const GFOX_AUTH = "GFOX_AUTH"; // dpo, admin bilsini json olarak döner

export const updateStoreData = data => {
  return { type: GFOX_STORE_DATA, data };
};

//ilk yüklenen datayı korumak için
export const updateStoreInitialData = initialData => {
  return { type: GFOX_STORE_INITIAL_DATA, initialData };
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

// Auth
export const updateStoreAuth = auth => {
  return { type: GFOX_AUTH, auth };
};