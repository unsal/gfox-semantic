import React from "react";
import Framework from './framework.js';
import {config} from '../../../config'

const template = {
  page: {title:"Ana Veriler", icon:"shield alternate", color:"teal"},
  url: { get: config.URL_ANAVERILER + "/get", commit: config.URL_ANAVERILER },

  titles: [{ title: 'PROFİL',  width: '10%', required: true },
      { title: 'SÜREÇ',  width: '10%', required: true },
      { title: 'KV',  width: '10%', required: true },
      { title: 'İŞL.AMAÇLARI',  width: '10%' },
      { title: 'DAYANAKLAR',  width: '10%' },
      { title: 'KANALLAR', width: '10%' },
      { title: 'SÜRE',  width: '10%' },
      { title: 'TEDBİRLER', width: '10%' },
      { title: 'SİSTEMLER',  width: '10%' },
      { title: 'ORTAMLAR',  width: '10%' }],

  fields: [{ title: 'PROFİL', field: 'profil_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_PROFILLER, width: '10%', required: true },
      { title: 'SÜREÇ', field: 'surec_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_SURECLER, width: '10%', required: true },
      { title: 'KV', field: 'kv_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_KV, width: '10%', required: true },
      { title: 'İŞL.AMAÇLARI', field: 'isleme_amaclari_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_ISLEMEAMACLARI, width: '10%' },
      { title: 'DAYANAKLAR', field: 'dayanaklar_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_DAYANAKLAR, width: '10%' },
      { title: 'KANALLAR', field: 'kanallar_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_KANALLAR, width: '10%' },
      { title: 'SÜRE', field: 'sure_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_SURELER, width: '10%' },
      { title: 'TEDBİRLER', field: 'tedbirler_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_TEDBIRLER, width: '10%' },
      { title: 'SİSTEMLER', field: 'sistemler_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_SISTEMLER, width: '10%' },
      { title: 'ORTAMLAR', field: 'ortamlar_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_ORTAMLAR, width: '10%' }],

  primary: ['profil_pidm', 'surec_pidm', 'kv_pidm'], //boş geçilemez alanların error kontrolü için

  view: [
    { field: 'profil_name', type: 'text' },
    { field: 'surec_name', type: 'text' },
    { field: 'kv_name', type: 'text' },
    { field: 'isleme_amaclari_data', type: 'json', color: 'blue' },
    { field: 'dayanaklar_data', type: 'json', color: 'teal' },
    { field: 'kanallar_data', type: 'json', color: 'olive' },
    { field: 'sure_name', type: 'text', color: 'green' },
    { field: 'tedbirler_data', type: 'json', color: 'yellow' },
    { field: 'sistemler_data', type: 'json', color: 'orange' },
    { field: 'ortamlar_data', type: 'json', color: 'olive' }]
}

const Component = () => {
  return <Framework template={template}/>
}

export default Component;