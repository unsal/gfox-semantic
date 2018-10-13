import { config } from "../../../../config";

export const KURUMLAR = 'KURUMLAR';
export const TOPLAMA_KANALLARI = 'TOPLAMA_KANALLARI';
export const KULLANILAN_SISTEMLER = 'KULLANILAN_SISTEMLER'

export const getURL=(ssMode)=> {
  if (ssMode===KURUMLAR) return config.URL_GetPaylasilanKurumlar
  else if (ssMode===TOPLAMA_KANALLARI) return config.getToplamaKanallari
  else if (ssMode===KULLANILAN_SISTEMLER) return config.getKullanilanSistemler
  else return 'getURLnotFound'
}

export const addURL =(ssMode)=>{
  if (ssMode===KURUMLAR) return config.URL_AddPaylasilanKurumlar
  else if (ssMode===TOPLAMA_KANALLARI) return config.addToplamaKanallari
  else if (ssMode===KULLANILAN_SISTEMLER) return config.addKullanilanSistemler
  else return 'addURLnotFound'
}

export const deleteURL = (ssMode)=>{
  if (ssMode===KURUMLAR) return config.deletePaylasilanKurumlar
  else if (ssMode===TOPLAMA_KANALLARI) return config.deleteToplamaKanallari
  else if (ssMode===KULLANILAN_SISTEMLER) return config.deleteKullanilanSistemler
  else return 'deleteURLnotFound'
}

export const optionsURL = (ssMode)=>{
  if (ssMode===KURUMLAR) return config.URL_GET_KURUMLAR
  else if (ssMode===TOPLAMA_KANALLARI) return config.URL_GET_KANALLAR
  else if (ssMode===KULLANILAN_SISTEMLER) return config.URL_GET_SISTEMLER
  else return 'optionsURLnotFound'
}



