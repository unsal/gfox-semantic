export const NEW_REQUEST = "NEW_REQUEST";
export const GFOX_STORE_DATA = "GFOX_STORE_DATA";

// KV Talepleri Yeni talep varsa..
export const updateStoreNewRequest = newRequest => {
  return { type: NEW_REQUEST, newRequest };
};

export const updateStoreData = data => {
  return { type: GFOX_STORE_DATA, data };
};
