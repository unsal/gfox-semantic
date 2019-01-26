
// API URL Settings

const urlRoot = window.location.origin.toString()
// const apiHost = urlRoot+'/service' // nginx > gunicorn local
const apiHost = 'http://127.0.0.1:8000' // nginx gunicorn local

// Python API configs
export const config = {

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

  // dropdownlar için
  URL_OPTIONS_PROFILLER: apiHost+'/options/profiller',
  URL_OPTIONS_BOLUMLER: apiHost+'/options/bolumler', //Özel liste getirdiği için ayrı..
  URL_OPTIONS_SURECLER: apiHost+'/options/surecler', //Özel liste getirdiği için ayrı..
  URL_OPTIONS_KURUMLAR: apiHost+'/options/kurumlar',
  URL_OPTIONS_KANALLAR: apiHost+'/options/kanallar',
  URL_OPTIONS_ISLEMEAMACLARI: apiHost+'/options/islemeamaclari',
  URL_OPTIONS_PAYLASIMAMACLARI: apiHost+'/options/paylasimamaclari',
  URL_OPTIONS_PAYLASIMSEKILLERI: apiHost+'/options/paylasimsekilleri',
  URL_OPTIONS_DAYANAKLAR: apiHost+'/options/dayanaklar',
  URL_OPTIONS_ORTAMLAR: apiHost+'/options/ortamlar',
  URL_OPTIONS_ISLEMLER: apiHost+'/options/islemler',
  URL_OPTIONS_TEDBIRLER: apiHost+'/options/tedbirler',
  URL_OPTIONS_KVKATEGORILER: apiHost+'/options/kvkategoriler',
  URL_OPTIONS_SURELER: apiHost+'/options/sureler',
  URL_OPTIONS_BIRIMLER: apiHost+'/options/birimler',
  URL_OPTIONS_SORUMLULAR: apiHost+'/options/sorumlular',

  // in change progress..
  URL_OPTIONS_KV: apiHost+'/tanimlar/kv/get',
  URL_OPTIONS_SISTEMLER: apiHost+'/tanimlar/sistemler/get',
  URL_OPTIONS_ULKELER: apiHost+'/tanimlar/ulkeler/get',

  //************* AUTH ************************
  URL_AUTH_CIDS: apiHost+'/auth/cids',
  URL_LOGIN: apiHost+'/auth/login',

  //export excel download
  URL_EXPORT: apiHost +'/download',

  //ANAVERILER
  URL_ANAVERILER: apiHost+'/anaveriler',
  //AKTARIMLAR
  URL_AKTARIMLAR: apiHost+'/aktarimlar',
   //TALEPLER
  URL_TALEPLER: apiHost+'/talepler',
  //KİŞİLER
  URL_KISILER: apiHost+'/kisiler',


   //TANIMLAR
  URL_TANIMLAR: apiHost+'/tanimlar',
  URL_TANIMLAR_BOLUMLER: apiHost+'/bolumler',
  URL_TANIMLAR_SURECLER: apiHost+'/surecler',
  URL_TANIMLAR_KV: apiHost+'/kv',
  URL_TANIMLAR_ULKELER: apiHost+'/ulkeler',
  URL_TANIMLAR_SISTEMLER: apiHost+'/sistemler',
  URL_TANIMLAR_BIRIMLER: apiHost+'/birimler',
  URL_TANIMLAR_SORUMLULAR: apiHost+'/sorumlular',

// CHARTS
  URL_CHART_MAX_KV: apiHost+'/chart/01',
  URL_CHART_MAX_KURUMLAR: apiHost+'/chart/02',
  URL_CHART_MAX_PROFILLER: apiHost+'/chart/03',
  URL_CHART_MAX_SURECLER: apiHost+'/chart/04',
  URL_CHART_TALEPLER: apiHost+'/chart/05',
  URL_CHART_TREE_BIRIMKV: apiHost+'/chart/06',
  URL_CHART_TREE_PROFILKV: apiHost+'/chart/07',
  URL_CHART_TREE_BIRIMKURUM: apiHost+'/chart/08',
  URL_CHART_MAP: apiHost+'/chart/09',


}


// React App Settings
export const settings = {
  urlRoot: urlRoot,
  urlLogin: urlRoot+'/login'
}


