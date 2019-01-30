import React from "react";
import Framework from '../components/framework.js';
import {config} from '../config'


const Component = (props) => {

  const URL_GET = config.URL_TANIMLAR_SISTEMLER+"/get"
  const URL_COMMIT = config.URL_TANIMLAR_SISTEMLER

  const template = {
    page: { title: "Kullanılan Sistemler", icon: "list alternate outline", color: "green" },
    url: { get: URL_GET, commit: URL_COMMIT },
    titles: [
      { title: "SİSTEM ADI", width: '80%', required: true, searchable: true, field:'name' },
      { title: "LOKAL", width: '10%' }
    ],
    fields: [
      { field: 'name', type: 'input' },
      { field: 'local', type: 'checkbox' }
    ],
    primary: ['name'], //boş geçilemez alanların görsel uyarı error kontrolü için
    view: [
      { field: 'name', type: 'text' },
      { field: 'local', type: 'bool' }
    ],
  }

  return <Framework template={template} />
}


export default Component;