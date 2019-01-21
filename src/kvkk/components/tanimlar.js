import React from "react";
import Framework from './framework.js';
import {config} from '../../config'


const TanimlarBase = (props) => {

  const { id } = props
  const URL_GET = config.URL_TANIMLAR+"/"+id + "/get"
  const URL_COMMIT = config.URL_TANIMLAR+"/"+id

  const template = {
    page: { title: id, icon: "list alternate outline", color: "green" },
    url: { get: URL_GET, commit: URL_COMMIT },
    titles: [{ title: "BAŞLIK", width: '80%', required: true, searchable: true, field:'name' }],
    fields: [{ field: 'name', type: 'input' }],
    primary: ['name'], //boş geçilemez alanların görsel uyarı error kontrolü için
    view: [{ field: 'name', type: 'text' }],
  }

  return <Framework template={template} />
}

export const Profiller = () => <TanimlarBase id="profiller" />
// export const Birimler = () => <TanimlarBase id="birimler" />
export const Dayanaklar = () => <TanimlarBase id="dayanaklar" />
export const KVKategoriler = () => <TanimlarBase id="kvkategoriler" />
export const IslemeAmaclari = () => <TanimlarBase id="islemeamaclari" />
export const Kanallar = () => <TanimlarBase id="kanallar" />
export const Ortamlar = () => <TanimlarBase id="ortamlar" />
export const Kurumlar = () => <TanimlarBase id="kurumlar" />
export const Sureler = () => <TanimlarBase id="sureler" />
export const PaylasimAmaclari = () => <TanimlarBase id="paylasimamaclari" />
export const PaylasimSekilleri = () => <TanimlarBase id="paylasimsekilleri" />
export const Tedbirler = () => <TanimlarBase id="tedbirler" />


export default TanimlarBase;