import React from "react";
import Framework from "../components/frameworkEnvanter";
import { config } from "../config";

const template = {
  page: { title: "Aktarımlar", color: "blue" },
  url: {
    get: config.URL_ENVANTER + "/aktarimlar/get",
    commit: config.URL_ENVANTER + "/aktarimlar"
  },

  titles: [
    { title: "No", width: "4%" },
    {
      title: "BİRİM",
      width: "7%",
      required: true,
      searchable: true,
      field: "birim"
    },
    {
      title: "BÖLÜM",
      width: "7%",
      required: true,
      searchable: true,
      field: "bolum"
    },
    {
      title: "SÜREÇ",
      width: "7%",
      required: true,
      searchable: true,
      field: "surec"
    },
    {
      title: "KURUMLAR",
      width: "6%",
      searchable: true,
      field: "kurumlar_data"
    },
    { title: "KV", width: "5%", searchable: true, field: "kv_data" },
    {
      title: "AKTARIM AMACI",
      width: "7%",
      searchable: true,
      field: "paylasim_amaclari_data"
    },
    {
      title: "DAYANAKLAR",
      width: "8%",
      searchable: true,
      field: "dayanaklar_data"
    },
    {
      title: "PROFILLER",
      width: "5%",
      searchable: true,
      field: "profiller_data"
    },
    {
      title: "AKTARIM ŞEKLİ",
      width: "7%",
      searchable: true,
      field: "paylasim_sekilleri_data"
    },
    { title: "ÜLKELER", width: "5%", searchable: true, field: "ulkeler_data" },
    // { title: "YURTDIŞI", width: "3%" },
    { title: "AÇIKLAMA", width: "12%" },
    { title: "DPO NOTU", width: "20%" }
  ],

  fields: [
    { field: "pidm", type: "text" },
    { field: "birim", type: "text", component: "dropdown", required: true },
    { field: "bolum", type: "text", component: "dropdown", required: true },
    { field: "surec", type: "text", component: "dropdown", required: true },
    { field: "kurumlar_data", type: "json", component: "dropdown" },
    { field: "kv_data", type: "json", component: "dropdown" },
    { field: "paylasim_amaclari_data", type: "json", component: "dropdown" },
    { field: "dayanaklar_data", type: "json", component: "dropdown" },
    { field: "profiller_data", type: "json", component: "dropdown" },
    { field: "paylasim_sekilleri_data", type: "json", component: "dropdown" },
    { field: "ulkeler_data", type: "json", component: "dropdown" },
    // { field: "yurtdisi" }, // giriş yaparken sıralama bozulmasın diye konu mankani
    { field: "aciklama", type: "json", component: "input" },
    { field: "bilgiveren", type: "json", component: "input" }
  ],

  primary: ["birim", "bolum", "surec"], //boş geçilemez alanların error kontrolü için

  view: [
    { field: "pidm", type: "text" },
    { field: "birim", type: "text" },
    { field: "bolum", type: "text" },
    { field: "surec", type: "text" },
    { field: "kurumlar_data", type: "json", color: "orange" },
    { field: "kv_data", type: "json", color: "blue" },
    { field: "paylasim_amaclari_data", type: "json", color: "teal" },
    { field: "dayanaklar_data", type: "json", color: "green" },
    { field: "profiller_data", type: "json", color: "olive" },
    { field: "paylasim_sekilleri_data", type: "json", color: "yellow" },
    { field: "ulkeler_data", type: "json", color: "yellow", flag: true },
    // // { field: "ulkeler_data", type: "bool" }, //yurtdisi için ulkeler_data alanı dolu mu diye bakmak için
    { field: "aciklama", type: "text" },
    { field: "bilgiveren", type: "text" }
  ]
};

const Aktarimlar = () => {
  return <Framework template={template} />;
};

export default Aktarimlar;
