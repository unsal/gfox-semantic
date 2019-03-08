import React from "react";
import Framework from '../components/frameworkEnvanter';
import {config} from '../config'

const template = {
  page: {title:"Ana Veriler", color:"orange"},
  url: { get: config.URL_ENVANTER + "/anaveriler/get", commit: config.URL_ENVANTER+"/anaveriler" },

  titles: [
    { title: 'BİRİM',  width: '8%', required: true,searchable: true, field:'birim' },
    { title: 'BÖLÜM',  width: '8%', required: true,searchable: true, field:'bolum' },
    { title: 'SÜREÇ',  width: '8%', required: true , searchable: true, field: 'surec'},
    { title: 'PROFİL',  width: '8%', required: true, searchable: true, field:'profil' }, //field header arama içindir..
    { title: 'KV',  width: '8%'},
    { title: 'İŞL.AMAÇLARI',  width: '8%' },
    { title: 'DAYANAKLAR',  width: '8%' },
    { title: 'KANALLAR', width: '8%' },
    { title: 'TEDBİRLER', width: '8%' },
    { title: 'SİSTEMLER',  width: '8%' },
    { title: 'ORTAMLAR',  width: '8%' },
    { title: 'SÜRE',  width: "8%" }],

  fields: [
    { field: 'birim', type: 'text', component: 'dropdown', required: true },
    { field: 'bolum',type: 'text',component: 'dropdown', required: true },
    { field: 'surec', type:'text',component: 'dropdown', required: true},
    { field: 'profil', type:'text', component: 'dropdown', required: true}, //optionsCID: get global options for GFox (1)
    { field: 'kv_data', type: 'json',component: 'dropdown'},
    { field: 'isleme_amaclari_data',type: 'json',component: 'dropdown'},
    { field: 'dayanaklar_data', type: 'json',component: 'dropdown'},
    { field: 'kanallar_data', type: 'json',component: 'dropdown'},
    { field: 'tedbirler_data', type:'json',component: 'dropdown'},
    { field: 'sistemler_data', type:'json',component: 'dropdown'},
    { field: 'ortamlar_data', type: 'json',component: 'dropdown'},
    { field: 'sure', type: 'text', component: 'dropdown', ocid: 1}],

  primary: ['birim', 'bolum', 'surec', 'profil' ], //boş geçilemez alanların error kontrolü için

  view: [
    { field: 'birim', type: 'text' },
    { field: 'bolum', type: 'text' },
    { field: 'surec', type: 'text' },
    { field: 'profil', type: 'text' },
    { field: 'kv_data', type: 'json', color:'blue' },
    { field: 'isleme_amaclari_data', type: 'json', color: 'teal' },
    { field: 'dayanaklar_data', type: 'json', color: 'green' },
    { field: 'kanallar_data', type: 'json', color: 'olive' },
    { field: 'tedbirler_data', type: 'json', color: 'yellow' },
    { field: 'sistemler_data', type: 'json', color: 'orange' },
    { field: 'ortamlar_data', type: 'json', color: 'olive' },
    { field: 'sure', type: 'text' }]
}

const Component = () => {
  return <Framework template={template}/>
}

export default Component;