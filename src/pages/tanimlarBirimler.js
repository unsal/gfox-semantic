import React from "react";
import Framework from '../components/framework.js';
import {config} from '../config'

const template = {
  page: {title:"Birimler", icon:"shield alternate", color:"green"},
  url: { get: config.URL_TANIMLAR_BIRIMLER + "/get", commit: config.URL_TANIMLAR_BIRIMLER },

  titles: [{ title: 'BİRİM ADI',  width: '40%', required: true,searchable: true, field:'name' },
      { title: 'VERİ SORUMLUSU',  width: '30%', required: true }],

  fields: [{ field: 'name', type: 'input'},
      { field: 'sorumlular_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_SORUMLULAR }],

  primary: ['name'], //boş geçilemez alanların error kontrolü için

  view: [
    { field: 'name', type: 'text' },
    { field: 'sorumlular_data', type: 'json', color: 'teal' }]
}

const Component = () => {
  return <Framework template={template}/>
}

export default Component;