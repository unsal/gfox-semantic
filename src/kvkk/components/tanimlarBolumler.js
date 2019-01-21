import React from "react";
import Framework from './framework.js';
import {config} from '../../config'


const Component = (props) => {

  const URL_GET = config.URL_TANIMLAR_BOLUMLER+"/get"
  const URL_COMMIT = config.URL_TANIMLAR_BOLUMLER

  const template = {
    page: { title: "Bölümler", icon: "list alternate outline", color: "green" },
    url: { get: URL_GET, commit: URL_COMMIT },
    titles: [
      { title: "BİRİMİ", width: '40%', required: true,searchable: true, field:'birim_name' },
      { title: "BÖLÜMÜ", width: '40%', required: true, searchable: true, field:'name' }
    ],
    fields: [
      { field: 'birim_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_BIRIMLER },
      { field: 'name', type: 'input' }
    ],
    primary: ['birim_pidm', 'name'], //boş geçilemez alanların görsel uyarı error kontrolü için
    view: [
      { field: 'birim_name', type: 'text' },
      { field: 'name', type: 'text' }
    ],
  }

  return <Framework template={template} />
}


export default Component;