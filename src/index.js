
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// ******* CUSTOM ************************

import { store } from './reducer'
import KVKK from './kvkk';


// v2
import Anaveriler from './kvkk/components/anaveriler'
import Aktarimlar from './kvkk/components/aktarimlar'

import Talepler from './kvkk/components/talepler'

import {Profiller,Dayanaklar, KVKategoriler, IslemeAmaclari, Kanallar, Ortamlar,
   Kurumlar, Sureler, PaylasimAmaclari, PaylasimSekilleri, Tedbirler} from './kvkk/components/tanimlar'

import Bolumler from './kvkk/components/tanimlarBolumler'
import Surecler from './kvkk/components/tanimlarSurecler'
import KV from './kvkk/components/tanimlarKV'
import Ulkeler from './kvkk/components/tanimlarUlkeler'
import Sistemler from './kvkk/components/tanimlarSistemler'
import Birimler from './kvkk/components/tanimlarBirimler'
import Sorumlular from './kvkk/components/tanimlarSorumlular'
import Panel from './kvkk/components/panel'

import LoginForm from './auth/loginform'

ReactDOM.render(
<Provider store = {store}>
<Router>
 <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/login' component={LoginForm} />
    <Route exact path='/kvkk' component={KVKK} />
    {/* <Route exact path='/kvkk/tanimlar/sistemler' component={Sistemler} />

     {/* ANA VERİLER*/}
    <Route exact path='/anaveriler' component={Anaveriler} />
    <Route exact path='/aktarimlar' component={Aktarimlar} />

     {/* TALEPLER */}
    <Route exact path='/talepler' component={Talepler} />

     {/* TANIMLAR */}
     <Route exact path='/profiller' component={Profiller} />
     <Route exact path='/birimler' component={Birimler} />
     <Route exact path='/dayanaklar' component={Dayanaklar} />
     <Route exact path='/kvkategoriler' component={KVKategoriler} />
     <Route exact path='/islemeamaclari' component={IslemeAmaclari} />
     <Route exact path='/kanallar' component={Kanallar} />
     <Route exact path='/ortamlar' component={Ortamlar} />
     <Route exact path='/kurumlar' component={Kurumlar} />
     <Route exact path='/sureler' component={Sureler} />
     <Route exact path='/paylasimamaclari' component={PaylasimAmaclari} />
     <Route exact path='/paylasimsekilleri' component={PaylasimSekilleri} />
     <Route exact path='/tedbirler' component={Tedbirler} />
     <Route exact path='/bolumler' component={Bolumler} />
     <Route exact path='/surecler' component={Surecler} />
     <Route exact path='/kv' component={KV} />
     <Route exact path='/ulkeler' component={Ulkeler} />
     <Route exact path='/sistemler' component={Sistemler} />
     <Route exact path='/sorumlular' component={Sorumlular} />

     <Route exact path='/panel' component={Panel} />


 </Switch>
</Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
