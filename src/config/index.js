// API URL Settings

const urlRoot = window.location.origin.toString();
// export const apiHost = "http://bt.ozyegin.edu.tr:8000/api"; //server ubuntu > /etc/nginx/config.d>virtual.conf> 8000 içerde 8001'e yönlendiriyor.. 8000 olarak karşılıyor, değiştirme!!!
export const apiHost = "http://0.0.0.0:8001"; // local

// Python API configs
export const config = {
  //axios GET, OST header için config
  axios: {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  },

  export: {
    responseType: "blob",
    headers: {
      "Content-Type": "application/json",
      // 'responseType': 'application/vnd.ms-excel',
      // 'responseType': 'arraybuffer',
      Accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Access-Control-Allow-Origin": "*"
    }
  },

  // dropdownlar için
  URL_OPTIONS_PROFILLER: apiHost + "/options/profiller",
  URL_OPTIONS_BIRIMLER: apiHost + "/options/birimler",
  URL_OPTIONS_BOLUMLER: apiHost + "/options/bolumler", //Özel liste getirdiği için ayrı..
  URL_OPTIONS_SURECLER: apiHost + "/options/surecler", //Özel liste getirdiği için ayrı..
  URL_OPTIONS_KURUMLAR: apiHost + "/options/kurumlar",
  URL_OPTIONS_KANALLAR: apiHost + "/options/kanallar",
  URL_OPTIONS_ISLEMEAMACLARI: apiHost + "/options/isleme_amaclari",
  URL_OPTIONS_PAYLASIMAMACLARI: apiHost + "/options/paylasim_amaclari",
  URL_OPTIONS_PAYLASIMSEKILLERI: apiHost + "/options/paylasim_sekilleri",
  URL_OPTIONS_DAYANAKLAR: apiHost + "/options/dayanaklar",
  URL_OPTIONS_ORTAMLAR: apiHost + "/options/ortamlar",
  URL_OPTIONS_ISLEMLER: apiHost + "/options/islemler",
  URL_OPTIONS_TEDBIRLER: apiHost + "/options/tedbirler",
  URL_OPTIONS_KVKATEGORILER: apiHost + "/options/kv_kategoriler",
  URL_OPTIONS_SURELER: apiHost + "/options/sureler",
  URL_OPTIONS_SORUMLULAR: apiHost + "/options/sorumlular",

  // in change progress..
  URL_OPTIONS_KV: apiHost + "/tanimlar/kv/get",
  URL_OPTIONS_SISTEMLER: apiHost + "/tanimlar/sistemler/get",
  URL_OPTIONS_ULKELER: apiHost + "/tanimlar/ulkeler/get",

  //************* AUTH ************************
  URL_AUTH_CIDS: apiHost + "/auth/cids",
  URL_LOGIN: apiHost + "/auth/login",

  //export excel download
  URL_EXPORT: apiHost + "/download",

  //ANAVERILER
  URL_ANAVERILER: apiHost + "/anaveriler",
  URL_ENVANTER: apiHost + "/envanter",
  //AKTARIMLAR
  URL_AKTARIMLAR: apiHost + "/aktarimlar",
  //TALEPLER
  URL_TALEPLER: apiHost + "/talepler",
  //KİŞİLER
  URL_KISILER: apiHost + "/kisiler",

  //TANIMLAR
  URL_TANIMLAR: apiHost + "/tanimlar",
  URL_TANIMLAR_BOLUMLER: apiHost + "/bolumler",
  URL_TANIMLAR_SURECLER: apiHost + "/surecler",
  URL_TANIMLAR_KV: apiHost + "/kv",
  URL_TANIMLAR_ULKELER: apiHost + "/ulkeler",
  URL_TANIMLAR_SISTEMLER: apiHost + "/sistemler",
  URL_TANIMLAR_BIRIMLER: apiHost + "/birimler",
  URL_TANIMLAR_SORUMLULAR: apiHost + "/sorumlular",

  // CHARTS
  URL_CHART: apiHost + "/chart",
  URL_CHART_KV_KV: apiHost + "/chart/01",
  URL_CHART_KV_KURUM: apiHost + "/chart/02",
  URL_CHART_KV_PROFIL: apiHost + "/chart/03",
  URL_CHART_KV_BIRIM: apiHost + "/chart/10",
  URL_CHART_KV_SUREC: apiHost + "/chart/04",
  URL_CHART_TALEPLER: apiHost + "/chart/05",
  URL_CHART_TREE_BIRIMKV: apiHost + "/chart/06",
  URL_CHART_TREE_PROFILKV: apiHost + "/chart/07",
  URL_CHART_TREE_BIRIMKURUM: apiHost + "/chart/08",
  URL_CHART_MAP: apiHost + "/chart/09"
};

// React App Settings
export const settings = {
  urlRoot: urlRoot,
  urlLogin: urlRoot + "/login",
  display: {
    width: "80%",
    marginTop: "6em",
    menuHeight: "5em"
  }
};
