import React from "react";
import Framework from '../components/frameworkEnvanter';
import {config} from '../config'

const template = {
    page: {title:"Aktarımlar",color:"orange"},
    url: { get: config.URL_ENVANTER + "/aktarimlar/get", commit: config.URL_ENVANTER+"/aktarimlar" },

  titles: [
            { title: 'BİRİM',  width: '8%', required: true,searchable: true, field:'birim' },
            { title: 'BÖLÜM',  width: '8%', required: true,searchable: true, field:'bolum' },
            { title: 'SÜREÇ', width: '10%', required: true, searchable: true, field: 'surec' },
            { title: 'KURUMLAR', width: '10%' },
            { title: 'KV', width: '10%'},
            { title: 'AKTARIM AMACI', width: '10%' },
            { title: 'DAYANAKLAR', width: '10%' },
            { title: 'AKTARIM ŞEKLİ', width: '10%' },
            { title: 'ÜLKELER', width: '10%' },
            { title: 'YURTDIŞI', width: '5%' },
            { title: 'AÇIKLAMA', width: '15%' },
            { title: 'BİLGİYİ VEREN', width: '10%' }],

  fields: [
          { field: 'birim', type:'text', component: 'dropdown', required: true },
          { field: 'bolum', type:'text',component: 'dropdown', required: true },
          { field: 'surec', type:'text', component: 'dropdown', required: true},
          { field: 'kurumlar_data', type:'json', component: 'dropdown'},
          { field: 'kv_data', type:'json',component: 'dropdown'},
          { field: 'paylasim_amaclari_data', type:'json', component: 'dropdown'},
          { field: 'dayanaklar_data', type:'json', component: 'dropdown' },
          { field: 'paylasim_sekilleri_data', type:'json', component: 'dropdown' },
          { field: 'ulkeler_data', type:'json', component: 'dropdown'},
          { field: 'yurtdisi' }, // giriş yaparken sıralama bozulmasın diye konu mankani
          { field: 'aciklama', type:'json', component: 'input' },
          { field: 'bilgiveren', type:'json', component: 'input' }],

    primary: ['birim','bolum','surec'], //boş geçilemez alanların error kontrolü için

    view: [
      { field: 'birim', type: 'text' },
      { field: 'bolum', type: 'text' },
      { field: 'surec', type: 'text' },
      { field: 'kurumlar_data', type: 'json', color: 'orange' },
      { field: 'kv_data', type: 'json', color:'blue' },
      { field: 'paylasim_amaclari_data', type: 'json', color: 'teal' },
      { field: 'dayanaklar_data', type: 'json', color: 'green' },
      { field: 'paylasim_sekilleri_data', type: 'json', color: 'olive' },
      { field: 'ulkeler_data', type: 'json', color: 'yellow' },
      { field: 'ulkeler_data', type: 'bool' }, //yurtdisi için ulkeler_data alanı dolu mu diye bakmak için
      { field: 'aciklama', type: 'text' },
      { field: 'bilgiveren', type: 'text' }],
}

const Component = () => {
  return <Framework template={template}/>
}

export default Component;