
// API URL Settings

const urlRoot = window.location.origin.toString()
// const apiHost = urlRoot+'/service' // nginx > gunicorn local
const apiHost = 'http://127.0.0.1:8000' // nginx gunicorn local

// Python API configs
export const config = {
  // ss > common > related > dropdownlar için
  URL_GET_KURUMLAR: apiHost+'/tanimlar/kurumlar',
  URL_GET_SISTEMLER: apiHost+'/tanimlar/sistemler',
  URL_GET_KANALLAR: apiHost+'/tanimlar/kanallar',
  URL_GET_PROFILLER: apiHost+'/tanimlar/profiller',
  URL_GET_BIRIMLER: apiHost+'/tanimlar/birimler',
  URL_GET_KV: apiHost+'/tanimlar/kv',
  URL_GET_ISLEMEAMACLARI: apiHost+'/tanimlar/islemeamaclari',
  URL_GET_PAYLASIMAMACLARI: apiHost+'/tanimlar/paylasimamaclari',
  URL_GET_PAYLASIMSEKILLERI: apiHost+'/tanimlar/paylasimsekilleri',
  URL_GET_ULKELER: apiHost+'/tanimlar/ulkeler',
  URL_GET_DOKUMANLAR: apiHost+'/tanimlar/dokumanlar',
  URL_GET_DAYANAKLAR: apiHost+'/tanimlar/dayanaklar',
  URL_GET_ORTAMLAR: apiHost+'/tanimlar/ortamlar',
  URL_GET_SURELER: apiHost+'/tanimlar/sureler',
  URL_GET_ISLEMDURUMLARI: apiHost+'/tanimlar/islemdurumlari',
  URL_GET_YAYINDURUMLARI: apiHost+'/tanimlar/yayindurumlari',
  URL_GET_TEDBIRLER: apiHost+'/tanimlar/tedbirler',
  URL_GET_KVKATEGORILER: apiHost+'/tanimlar/kvkategoriler',


  // Tanımlar ******************************************
  URL_GetTanimlar: apiHost+'/tanimlar',
  URL_AddTanimlar: apiHost+'/tanimlar/add',
  URL_DelTanimlar: apiHost+'/tanimlar/del',

  // SS ******************************************
  URL_GetSSCommon: apiHost+'/ss/common',
  URL_AddSSCommon: apiHost+'/ss/common/add',
  URL_DeleteSSCommon: apiHost+'/ss/common/delete',

  // *****************************KV Dokumanlar*****************************
  URL_GetSSDokumanlar: apiHost+'/ss/dokumanlar',
  URL_AddSSDokumanlar: apiHost+'/ss/dokumanlar/add',
  URL_DeleteSSDokumanlar: apiHost+'/ss/dokumanlar/del',

    // ***************KV Profil*****************************
  URL_GET_KVPROFIL: apiHost+'/verbis/kvprofil',
  URL_ADD_KVPROFIL: apiHost+'/verbis/kvprofil/add',
  URL_UPDATE_KVPROFIL: apiHost+'/verbis/kvprofil/update',
  URL_DELETE_KVPROFIL: apiHost+'/verbis/kvprofil/delete',

  // *************** KV Paylasim *****************************
  URL_GET_KVPAYLASIM: apiHost+'/verbis/kvpaylasim',
  URL_ADD_KVPAYLASIM: apiHost+'/verbis/kvpaylasim/add',
  URL_UPDATE_KVPAYLASIM: apiHost+'/verbis/kvpaylasim/update',
  URL_DELETE_KVPAYLASIM: apiHost+'/verbis/kvpaylasim/delete',

  // *************** KV Anaveri *****************************
  URL_GET_KVANAVERI: apiHost+'/verbis/kvanaveri',
  URL_ADD_KVANAVERI: apiHost+'/verbis/kvanaveri/add',
  URL_UPDATE_KVANAVERI: apiHost+'/verbis/kvanaveri/update',
  URL_DELETE_KVANAVERI: apiHost+'/verbis/kvanaveri/delete',

  // *************** KV TALEPLER *****************************
  URL_GET_KVTALEPLER: apiHost+'/verbis/kvtalepler',
  URL_ADD_KVTALEPLER: apiHost+'/verbis/kvtalepler/add',
  URL_UPDATE_KVTALEPLER: apiHost+'/verbis/kvtalepler/update',
  URL_DELETE_KVTALEPLER: apiHost+'/verbis/kvtalepler/delete',


  //************* AUTH ************************
  URL_GET_AUTH_CIDS: apiHost+'/auth/cids',
  URL_LOGIN: apiHost+'/auth/login',

  //export excel download
  URL_EXPORT: apiHost +'/download',

  //Bolumler
  URL_GET_BOLUMLER: apiHost+'/tanimlar/bolumler',
  URL_ADD_BOLUM: apiHost+'/tanimlar/bolumler/add',
  URL_DELETE_BOLUM: apiHost+'/tanimlar/bolumler/delete',

  //Surecler
  URL_GET_SURECLER: apiHost+'/tanimlar/surecler',
  URL_GET_SURECLERDD: apiHost+'/tanimlar/sureclerdd', //for Dropdown on anaveriler.js
  URL_ADD_SUREC: apiHost+'/tanimlar/surecler/add',
  URL_DELETE_SUREC: apiHost+'/tanimlar/surecler/delete',

  //Surecler
  URL_GET_ANAVERILER: apiHost+'/verbis/anaveriler',
  URL_UPDATE_ANAVERILER: apiHost+'/verbis/anaveriler/update',
  URL_ADD_ANAVERILER: apiHost+'/verbis/anaveriler/add',


  //axios GET, OST header için config
  axios: { headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
  },

  export: {
    'responseType': 'blob',
    headers: {
    'Content-Type': 'application/json',
    // 'responseType': 'application/vnd.ms-excel',
    // 'responseType': 'arraybuffer',
    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Access-Control-Allow-Origin': '*'}
  },
}


// React App Settings
export const settings = {
  urlRoot: urlRoot,
  urlLogin: urlRoot+'/login'
}


