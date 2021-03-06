import React from "react";
import Framework from '../components/frameworkTanimlar';
import {config} from '../config'


const Component = (props) => {

  const URL_GET = config.URL_TANIMLAR_ULKELER+"/get"
  const URL_COMMIT = config.URL_TANIMLAR_ULKELER

  const template = {
    page: { title: "Ülkeler", icon: "list alternate outline", color: "green" },
    url: { get: URL_GET, commit: URL_COMMIT },
    titles: [
      { title: "ÜLKE ADI", width: '80%', required: true , searchable: true, field:'name'},
      { title: "TEL KODU", width: '10%', searchable: true, field:'phone_area'},
      { title: "GÜVENLİ", width: '10%' }
    ],
    fields: [
      { field: 'name' }, //readonly, değiştiremesin
      { field: 'phone_area', type: 'input' },
      { field: 'secure', type: 'checkbox' }
    ],
    primary: ['name'], //boş geçilemez alanların görsel uyarı error kontrolü için
    view: [
      { field: 'name', type: 'text' },
      { field: 'phone_area', type: 'text' },
      { field: 'secure', type: 'bool' }
    ],
  }

  return <Framework template={template} />
}


export default Component;