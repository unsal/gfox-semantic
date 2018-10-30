import React from "react";
import  Common from "./"

export const KURUMLAR = 'kurumlar';
export const TOPLAMA_KANALLARI = 'kanallar';
export const KULLANILAN_SISTEMLER = 'sistemler'

// Common SS Componentler
// Dikkat: Common için api tarafında related_item_pidm, related_item_name dondurmen lazım..
export const SSKurumlar = ()=> <Common title="KV Paylaşılan Kurumlar" id={KURUMLAR} />
export const SSKanallar = ()=> <Common title="KV Toplama Kanalları" id={TOPLAMA_KANALLARI} />
export const SSSistemler= ()=><Common title="KV Kullanan Sistemler" id={KULLANILAN_SISTEMLER} />

