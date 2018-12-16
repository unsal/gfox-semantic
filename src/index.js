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
import Sistemler from './kvkk/components/verbisTanimlar/sistemler';
import Sureler from './kvkk/components/verbisTanimlar/sureler';
import Ulkeler from './kvkk/components/verbisTanimlar/ulkeler';
import Tedbirler from './kvkk/components/verbisTanimlar/tedbirler';
import Bolumler from './kvkk/components/verbisTanimlar/bolumler';

// Süreç Sahibi
// import SSKurumlar from './kvkk/components/verbisSS/kurumlar';
import {SSKurumlar, SSKanallar, SSSistemler} from './kvkk/components/verbisSS/common/related';
import SSDokumanlar from './kvkk/components/verbisSS/dokumanlar';

//Verbis ANAVERILER
import KVProfil from './kvkk/components/verbis/kvprofil'
import KVPaylasim from './kvkk/components/verbis/kvpaylasim'
import KVAnaveri from './kvkk/components/verbis/kvanaveri'

import KVTalepler from './kvkk/components/verbis/kvtalepler'

import { Provider } from 'react-redux';
import { store } from './reducer'

import LoginForm from './auth/loginform'

ReactDOM.render(
<Provider store = {store}>
<Router>
 <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/login' component={LoginForm} />
    <Route exact path='/kvkk' component={KVKK} />
    <Route exact path='/kvkk/tanimlar/profiller' component={Profiller} />
    <Route exact path='/kvkk/tanimlar/birimler' component={Birimler} />
    <Route exact path='/kvkk/tanimlar/dayanaklar' component={Dayanaklar} />
    <Route exact path='/kvkk/tanimlar/dokumanlar' component={Dokumanlar} />
    <Route exact path='/kvkk/tanimlar/islemeAmaclari' component={IslemeAmaclari} />
    <Route exact path='/kvkk/tanimlar/kanallar' component={Kanallar} />
    <Route exact path='/kvkk/tanimlar/kurumlar' component={Kurumlar} />
    <Route exact path='/kvkk/tanimlar/kv' component={KV} />
    <Route exact path='/kvkk/tanimlar/ortamlar' component={Ortamlar} />
    <Route exact path='/kvkk/tanimlar/paylasimAmaclari' component={PaylasimAmaclari} />
    <Route exact path='/kvkk/tanimlar/paylasimSekilleri' component={PaylasimSekilleri} />
    <Route exact path='/kvkk/tanimlar/sistemler' component={Sistemler} />
    <Route exact path='/kvkk/tanimlar/sureler' component={Sureler} />
    <Route exact path='/kvkk/tanimlar/ulkeler' component={Ulkeler} />
    <Route exact path='/kvkk/tanimlar/tedbirler' component={Tedbirler} />
    <Route exact path='/kvkk/tanimlar/bolumler' component={Bolumler} />

   {/* Süreç Sahibi */}
    <Route exact path='/kvkk/ss/kurumlar' component={SSKurumlar} />
    <Route exact path='/kvkk/ss/kanallar' component={SSKanallar} />
    <Route exact path='/kvkk/ss/sistemler' component={SSSistemler} />
    <Route exact path='/kvkk/ss/dokumanlar' component={SSDokumanlar} />

     {/* Verbis Anaveriler */}
    <Route exact path='/kvkk/verbis/profil' component={KVProfil} />
    <Route exact path='/kvkk/verbis/paylasim' component={KVPaylasim} />
    <Route exact path='/kvkk/verbis/anaveri' component={KVAnaveri} />

     {/* Verbis KVTalepler */}
    <Route exact path='/kvkk/verbis/kvtalepler' component={KVTalepler} />


 </Switch>
</Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
