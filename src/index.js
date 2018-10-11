import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import KVKK from './kvkk';
import Profiller from './kvkk/components/verbisTanimlar/profiller';
import Birimler from './kvkk/components/verbisTanimlar/birimler';
import Dayanaklar from './kvkk/components/verbisTanimlar/dayanaklar';
import Dokumanlar from './kvkk/components/verbisTanimlar/dokumanlar';
import IslemeAmaclari from './kvkk/components/verbisTanimlar/islemeAmaclari';
import Kanallar from './kvkk/components/verbisTanimlar/kanallar';
import Kurumlar from './kvkk/components/verbisTanimlar/kurumlar';
import KV from './kvkk/components/verbisTanimlar/kv';
import Ortamlar from './kvkk/components/verbisTanimlar/ortamlar';
import PaylasimAmaclari from './kvkk/components/verbisTanimlar/paylasimAmaclari';
import PaylasimSekilleri from './kvkk/components/verbisTanimlar/paylasimSekilleri';
import KVSistemler from './kvkk/components/verbisTanimlar/kvsistemler';
import Sureler from './kvkk/components/verbisTanimlar/sureler';
import Ulkeler from './kvkk/components/verbisTanimlar/ulkeler';

// Süreç Sahibi
import SSKurumlar from './kvkk/components/verbisSS/kurumlar';
import SSDokumanlar from './kvkk/components/verbisSS/dokumanlar';

import { Provider } from 'react-redux';
import { store } from './reducer'

ReactDOM.render(
<Provider store = {store}>
<Router>
 <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/kvkk' component={KVKK} />
    <Route exact path='/kvkk/verbis/profiller' component={Profiller} />
    <Route exact path='/kvkk/verbis/birimler' component={Birimler} />
    <Route exact path='/kvkk/verbis/dayanaklar' component={Dayanaklar} />
    <Route exact path='/kvkk/verbis/dokumanlar' component={Dokumanlar} />
    <Route exact path='/kvkk/verbis/islemeAmaclari' component={IslemeAmaclari} />
    <Route exact path='/kvkk/verbis/kanallar' component={Kanallar} />
    <Route exact path='/kvkk/verbis/kurumlar' component={Kurumlar} />
    <Route exact path='/kvkk/verbis/kv' component={KV} />
    <Route exact path='/kvkk/verbis/ortamlar' component={Ortamlar} />
    <Route exact path='/kvkk/verbis/paylasimAmaclari' component={PaylasimAmaclari} />
    <Route exact path='/kvkk/verbis/paylasimSekilleri' component={PaylasimSekilleri} />
    <Route exact path='/kvkk/verbis/kvsistemler' component={KVSistemler} />
    <Route exact path='/kvkk/verbis/sureler' component={Sureler} />
    <Route exact path='/kvkk/verbis/ulkeler' component={Ulkeler} />

   {/* Süreç Sahibi */}
    <Route exact path='/kvkk/verbis/ss/kurumlar' component={SSKurumlar} />
    <Route exact path='/kvkk/verbis/ss/dokumanlar' component={SSDokumanlar} />

 </Switch>
</Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
