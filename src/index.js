import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Homepage from "./homepage";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// ******* CUSTOM ************************

import { store } from "./reducer";

// v2
import Anaveriler from "./pages/envanterAnaveriler";
import Aktarimlar from "./pages/envanterAktarimlar";

// import Kisiler from './pages/kisiler'

import Talepler from "./pages/talepler";

import {
  Profiller,
  Dayanaklar,
  KVKategoriler,
  IslemeAmaclari,
  Kanallar,
  Ortamlar,
  Kurumlar,
  Sureler,
  PaylasimAmaclari,
  PaylasimSekilleri,
  Tedbirler
} from "./pages/tanimlar";

import Bolumler from "./pages/tanimlarBolumler";
import Surecler from "./pages/tanimlarSurecler";
import KV from "./pages/tanimlarKV";
import Ulkeler from "./pages/tanimlarUlkeler";
import Sistemler from "./pages/tanimlarSistemler";
import Birimler from "./pages/tanimlarBirimler";
import Sorumlular from "./pages/tanimlarSorumlular";
import Analiz from "./pages/analiz/charts";

import LoginForm from "./pages/auth/loginform";
import HomeButton from "./pages/layout/homeButton";
import Accounts from "./pages/auth/accounts";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/home" component={HomeButton} />
        <Route exact path="/accounts" component={Accounts} />

        {/* ANA VERİLER*/}
        <Route exact path="/anaveriler" component={Anaveriler} />
        <Route exact path="/aktarimlar" component={Aktarimlar} />
        {/* <Route exact path='/kisiler' component={Kisiler} /> */}

        {/* TALEPLER */}
        <Route exact path="/talepler" component={Talepler} />

        {/* TANIMLAR */}
        <Route exact path="/profiller" component={Profiller} />
        <Route exact path="/birimler" component={Birimler} />
        <Route exact path="/dayanaklar" component={Dayanaklar} />
        <Route exact path="/kv_kategoriler" component={KVKategoriler} />
        <Route exact path="/isleme_amaclari" component={IslemeAmaclari} />
        <Route exact path="/kanallar" component={Kanallar} />
        <Route exact path="/ortamlar" component={Ortamlar} />
        <Route exact path="/kurumlar" component={Kurumlar} />
        <Route exact path="/sureler" component={Sureler} />
        <Route exact path="/paylasim_amaclari" component={PaylasimAmaclari} />
        <Route exact path="/paylasim_sekilleri" component={PaylasimSekilleri} />
        <Route exact path="/tedbirler" component={Tedbirler} />
        <Route exact path="/bolumler" component={Bolumler} />
        <Route exact path="/surecler" component={Surecler} />
        <Route exact path="/kv" component={KV} />
        <Route exact path="/ulkeler" component={Ulkeler} />
        <Route exact path="/sistemler" component={Sistemler} />
        <Route exact path="/sorumlular" component={Sorumlular} />

        <Route exact path="/analiz" component={Analiz} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
