import React from "react";
import Framework from './framework.js';
import {config} from '../../config'

const template = {
    page: {title:"Aktarımlar", icon:"paper plane outline", color:"orange"},
    url: { get: config.URL_AKTARIMLAR + "/get", commit: config.URL_AKTARIMLAR },

  titles: [
            { title: 'BİRİM',  width: '8%', searchable: true, field:'birim_name' },
            { title: 'BÖLÜM',  width: '8%', searchable: true, field:'bolum_name' },
            { title: 'SÜREÇ', width: '10%', required: true, searchable: true, field: 'surec_name' },
            { title: 'KV', width: '10%', required: true, searchable: true, field: 'kv_name' },
            { title: 'KURUM', width: '10%', required: true, searchable: true, field: 'kurum_name' },
            { title: 'AKTARIM AMACI', width: '10%' },
            { title: 'DAYANAKLAR', width: '10%' },
            { title: 'AKTARIM ŞEKLİ', width: '10%' },
            { title: 'AKTARILAN ÜLKE', width: '10%' },
            { title: 'YURTDIŞI', width: '5%' },
            { title: 'AÇIKLAMA', width: '15%' },
            { title: 'BİLGİYİ VEREN', width: '10%' }],

  fields: [
          { field: 'birim_name' },
          { field: 'bolum_name' },
          { field: 'surec_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_SURECLER },
          { field: 'kv_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_KV },
          { field: 'kurum_pidm', type: 'dropdown', optionsURL: config.URL_OPTIONS_KURUMLAR},
          { field: 'paylasim_amaclari_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_PAYLASIMAMACLARI },
          { field: 'dayanaklar_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_DAYANAKLAR },
          { field: 'paylasim_sekilleri_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_PAYLASIMSEKILLERI },
          { field: 'ulkeler_data', type: 'dropdown', optionsURL: config.URL_OPTIONS_ULKELER},
          { field: 'yurtdisi' },
          { field: 'aciklama', type: 'input' },
          { field: 'bilgiveren', type: 'input' }],

    primary: ['surec_pidm', 'kv_pidm', 'kurum_pidm'], //boş geçilemez alanların error kontrolü için

    view: [
      { field: 'birim_name', type: 'text' },
      { field: 'bolum_name', type: 'text' },
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