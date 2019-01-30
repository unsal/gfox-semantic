import React from "react";
import Framework from '../components/framework.js';
import {config} from '../config'

const template = {
  page: {title:"Kişiler", icon:"user circle", color:"green"},
  url: { get: config.URL_KISILER + "/get", commit: config.URL_KISILER },

  titles: [
      { title: 'KİŞİ ADI',  width: '30%', required: true,searchable: true, field:'name' },
      { title: 'PROFİLİ',  width: '15%'},
      { title: 'BİRİMİ',  width: '15%'},
      { title: 'KİMLİK NO',  width: '10%', searchable: true, field:'kimlikno'},
      { title: 'TEL',  width: '15%', searchable: true, field:'tel'},
      { title: 'E-POSTA',  width: '15%', searchable: true, field:'eposta'},
    ],

  fields: [
      { field: 'name', type: 'input'},
      { field: 'profiller_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_PROFILLER },
      { field: 'birimler_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_BIRIMLER },
      { field: 'kimlikno', type: 'input' },
      { field: 'tel', type: 'input' },
      { field: 'eposta', type: 'input' }
    ],

  primary: ['name'], //boş geçilemez alanların error kontrolü için

  view: [
    { field: 'name', type: 'text' },
    { field: 'profiller_data', type: 'json', color: 'green' },
    { field: 'birimler_data', type: 'json', color: 'olive' },
    { field: 'kimlikno', type: 'text' },
    { field: 'tel', type: 'text' },
    { field: 'eposta', type: 'text' },
]
}

const Component = () => {
  return <Framework template={template}/>
}

export default Component;