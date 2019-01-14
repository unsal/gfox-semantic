import React from "react";
import Framework from './framework.js';
import {config} from '../../../config'

const template = {
  page: {title:"Talepler", icon:"envelope outline", color:"pink"},
  url: { get: config.URL_TALEPLER + "/get", commit: config.URL_TALEPLER },

  titles: [
    { title: 'İSİM', width: '10%', required: true },
    { title: 'BİLGİ TALEBİ', width: '15%' },
    { title: 'PROFİLLER', width: '10%' },
    { title: 'E-POSTA',  width: '10%', required: true },
    { title: 'TEL', width: '5%', required: true },
    { title: 'TCKNO',  width: '5%' },
    { title: 'D.TARİHİ',  width: '5%' },
    { title: 'İŞLEM DURUMU',  width: '5%' },
    { title: 'AÇIKLAMA', width: '15%' },
    { title: 'KURUMU', width: '10%' }
  ],

  fields: [
    { field: 'isim', type: 'input' },
    { field: 'bilgitalebi', type: 'input', },
    { field: 'profiller_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_PROFILLER },
    { field: 'eposta', type: 'input' },
    { field: 'tel', type: 'input' },
    { field: 'tckno', type: 'input'},
    { field: 'dogumtarihi', type: 'input' },
    { field: 'islem_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_ISLEMLER },
    { field: 'aciklama', type: 'input', width: '15%' },
    { field: 'kurumu', type: 'input', width: '10%' }
  ],

  primary: ['isim', 'eposta', 'tel'], //boş geçilemez alanların error kontrolü için

  view: [
    { field: 'isim', type: 'text' },
    { field: 'bilgitalebi', type: 'text' },
    { field: 'profiller_data', type: 'json', color: 'pink' },
    { field: 'eposta', type: 'text' },
    { field: 'tel', type: 'text' },
    { field: 'tckno', type: 'text' },
    { field: 'dogumtarihi', type: 'text' },
    { field: 'islem_name', type: 'text' },
    { field: 'aciklama', type: 'text' },
    { field: 'kurumu', type: 'text' }
  ],
}

const Component = () => {
  return <Framework template={template}/>
}

export default Component;