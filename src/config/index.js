// U2Y
// Uygulamaların içinden tanimlarID.birimler şeklinde kullanmak için..
export const tanimlarID = {
  profiller: "profiller",
  birimler: "birimler",
  dayanaklar: "dayanaklar",
  dokumanlar: "dokumanlar",
  islemeAmaclari: "islemeamaclari",
  kanallari: "toplamakanallari",
  kurumlar: "kurumlar",
  kv: "kv",
  arsivOrtamlari: "arsivortamlari",
  paylasimAmaclari: "paylasimAmaclari",
  paylasimSekilleri: "paylasimsekilleri",
  kvSistemler: "kvsistemler",
  saklamaSuresi: "saklamasuresi",
  ulkeler: "guvenliulkeler"
}


// API URL Settings
const hostURL = 'http://localhost:2300';

export const config = {
  // Tanımlar ******************************************
  URL_GetTanimlar: hostURL+'/tanimlar',
  URL_AddTanimlar: hostURL+'/tanimlar/add',
  URL_DelTanimlar: hostURL+'/tanimlar/del',

  // ss > common > related > dropdownlar için
  URL_GET_KURUMLAR: hostURL+'/tanimlar/kurumlar',
  URL_GET_SISTEMLER: hostURL+'/tanimlar/kvsistemler',
  URL_GET_KANALLAR: hostURL+'/tanimlar/kanallar',

  // SS ******************************************
  //Paylasilan Kurumlar
  URL_GetPaylasilanKurumlar: hostURL+'/ss/paylasilankurumlar',
  URL_AddPaylasilanKurumlar: hostURL+'/ss/paylasilankurumlar/add',
  URL_DelPaylasilanKurumlar: hostURL+'/ss/paylasilankurumlar/del',

  // KV Dokumanlar
  URL_GetSSDokumanlar: hostURL+'/ss/dokumanlar',
  URL_AddSSDokumanlar: hostURL+'/ss/dokumanlar/add',
  URL_DelSSDokumanlar: hostURL+'/ss/dokumanlar/del',

};



