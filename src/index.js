
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
import Anaveriler from './kvkk/components/framework/anaveriler'
import Aktarimlar from './kvkk/components/framework/aktarimlar'

import Talepler from './kvkk/components/framework/talepler'

import {Profiller,Dayanaklar, Birimler, KVKategoriler, IslemeAmaclari, Kanallar, Ortamlar,
   Kurumlar, Sureler, PaylasimAmaclari, PaylasimSekilleri, Tedbirler} from './kvkk/components/framework/tanimlar'

import Bolumler from './kvkk/components/framework/tanimlarBolumler'
import Surecler from './kvkk/components/framework/tanimlarSurecler'
import KV from './kvkk/components/framework/tanimlarKV'
import Ulkeler from './kvkk/components/framework/tanimlarUlkeler'
import Sistemler from './kvkk/components/framework/tanimlarSistemler'

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


 </Switch>
</Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
