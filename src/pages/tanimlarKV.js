import React from "react";
import Framework from '../components/frameworkTanimlar';
import {config} from '../config'


const Component = (props) => {

  const URL_GET = config.URL_TANIMLAR_KV+"/get"
  const URL_COMMIT = config.URL_TANIMLAR_KV

  const template = {
    page: { title: "KV", icon: "list alternate outline", color: "green" },
    url: { get: URL_GET, commit: URL_COMMIT },
    titles: [
      { title: "Kişisel Veri", width: '30%', required: true, searchable: true, field:'name' },
      { title: "Kategorisi", width: '30%', required: true, searchable: true, field:'kv_kategori_name' },
    ],
    fields: [
      { field: 'name', type:'input'},
      { field: 'kv_kategori_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_KVKATEGORILER }
    ],
    primary: ['name', 'kv_kategori_pidm'], //boş geçilemez alanların görsel uyarı error kontrolü için
    view: [
      { field: 'name', type: 'text' },
      { field: 'kv_kategori_name', type: 'text' }
    ],
  }

  return <Framework template={template} />
}


export default Component;