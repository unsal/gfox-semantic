import React from "react";
import Framework from './framework.js';
import {config} from '../../../config'

const template = {
    pagetitle: "Aktarımlar",
    pageicon: "paper plane outline",
    url: { get: config.URL_AKTARIMLAR + "/get", commit: config.URL_AKTARIMLAR },
    fields: [{ title: 'SÜREÇ', field: 'surec_pidm', type: 'dropdown', optionsURL: config.URL_GET_SURECLERDD, width: '10%', required: true },
    { title: 'KV', field: 'kv_pidm', type: 'dropdown', optionsURL: config.URL_GET_KV, width: '10%', required: true },
    { title: 'KURUM', field: 'kurum_pidm', type: 'dropdown', optionsURL: config.URL_GET_KURUMLAR, width: '10%', required: true },
    { title: 'AKTARIM AMACI', field: 'paylasim_amaclari_data', type: 'dropdown', optionsURL: config.URL_GET_PAYLASIMAMACLARI, width: '10%' },
    { title: 'DAYANAKLAR', field: 'dayanaklar_data', type: 'dropdown', optionsURL: config.URL_GET_DAYANAKLAR, width: '10%' },
    { title: 'AKTARIM ŞEKLİ', field: 'paylasim_sekilleri_data', type: 'dropdown', optionsURL: config.URL_GET_PAYLASIMSEKILLERI, width: '10%' },
    { title: 'AKTARILAN ÜLKE', field: 'ulkeler_data', type: 'dropdown', optionsURL: config.URL_GET_ULKELER, width: '10%' },
    { title: 'YURTDIŞI', field: 'yurtdisi', width: '5%' },
    { title: 'AÇIKLAMA', field: 'aciklama', type: 'input', width: '15%' },
    { title: 'BİLGİYİ VEREN', field: 'bilgiveren', type: 'input', width: '10%' }],

    primary: ['surec_pidm', 'kv_pidm', 'kurum_pidm'], //boş geçilemez alanların error kontrolü için

    view: [
      { field: 'surec_name', type: 'text' },
      { field: 'kv_name', type: 'text' },
      { field: 'kurum_name', type: 'text' },
      { field: 'paylasim_amaclari_data', type: 'json', color: 'orange' },
      { field: 'dayanaklar_data', type: 'json', color: 'yellow' },
      { field: 'paylasim_sekilleri_data', type: 'json', color: 'olive' },
      { field: 'ulkeler_data', type: 'json', color: 'green' },
      { field: 'yurtdisi', type: 'bool' },
      { field: 'aciklama', type: 'text' },
      { field: 'bilgiveren', type: 'text' }],
}

const Component = () => {
  return <Framework template={template}/>
}

export default Component;