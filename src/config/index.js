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
const server = 'http://localhost:2300';
const tanimlar = server+'/tanimlar';

export const getAPI = {
  // Tanımlar
  base: server,
  getTanimlar: tanimlar,
  addTanimlar: tanimlar+'/add',
  delTanimlar: tanimlar+'/del',
  getNextPidm: tanimlar+'/pidm',

  // SS
  getPaylasilanKurumlar: server+'/ss/paylasilankurumlar',
  addPaylasilanKurumlar: server+'/ss/paylasilankurumlar/add',
  delPaylasilanKurumlar: server+'/ss/paylasilankurumlar/del'
};

export const getApi4=(id)=> {
  return (
      tanimlar+'/'+id
  )
}


