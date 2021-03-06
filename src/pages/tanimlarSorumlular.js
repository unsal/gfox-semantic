import React from "react";
import Framework from '../components/frameworkTanimlar';
import {config} from '../config'


const Component = (props) => {

  const URL_GET = config.URL_TANIMLAR_SORUMLULAR+"/get"
  const URL_COMMIT = config.URL_TANIMLAR_SORUMLULAR

  const template = {
    page: { title: "Veri Sorumluları", icon: "list alternate outline", color: "green" },
    url: { get: URL_GET, commit: URL_COMMIT },
    titles: [
      { title: "ADI SOYADI", width: '40%', required: true ,searchable: true, field:'name'},
      { title: "TELEFON", width: '30%', searchable: true, field:'phone'},
      { title: "EPOSTA", width: '30%',searchable: true, field:'email' }
    ],
    fields: [
      { field: 'name', type: 'input' },
      { field: 'phone', type: 'input' },
      { field: 'email', type: 'input' }
    ],
    primary: ['name'], //boş geçilemez alanların görsel uyarı error kontrolü için
    view: [
      { field: 'name', type: 'text' },
      { field: 'phone', type: 'text' },
      { field: 'email', type: 'text' }
    ],
  }

  return <Framework template={template} />
}


export default Component;