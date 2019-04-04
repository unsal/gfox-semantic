import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment, Icon} from "semantic-ui-react";
import axios from "axios";
import { config } from "../../config";
import { updateStoreAuth } from "../../reducer/actions";
import { store } from "../../reducer";
import { spinnerIcon } from "../../components/gfox";
import LandingPage from "./landing";
import "./loginform.css";


const LoginForm = (props) => {
  const [values, setValues] = useState({}) // form values ... {uid, pwd}
  const [authenticated, setAuthenticated] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    logout()
  }, [])

  //Headerda, CID optionsı yüklemek için...
  //aşağıdaki submit fonksionunda kullanıldı

  const createCIDOptions = async uid => {
    const params = { uid };
    let options = [];

    try {
      const result = await axios.post( config.URL_AUTH_CIDS, params, config.axios );
      const data = (await result.data) ? result.data : [];
      await data.map(
        ({ cid, name }) =>
          (options = options.concat({ key: cid, text: name, value: cid }))
      );
    } catch (err) {
      console.log("createCIDOptions hatası..", err);
      options = [];
    }
    return options;
  };


  const submit = async () => {
    const { uid, pwd } = values;
    const params = { uid, pwd };

    try {
      let auth = {}
      const result = await axios.post(config.URL_AUTH, params, config.axios);
      const data = result.data ? result.data : [];
      let cidOptions = await createCIDOptions(uid);

      await data.map(
        item => (
          auth = {
                  "uid": item.uid,
                  "token": item.token,
                  "dpo": item.dpo,
                  "admin": item.admin,
                  "cids": { cid: null, cidName: null, cidChanged: false, cidOptions}
                } )
      );

      if (auth.token) {
        await addLocalToken(auth.token); //data: [{cid:1, uid:'admin@grcfox.com}]
        await store.dispatch(updateStoreAuth(auth));

        setAuthenticated(true)
      } else {
        console.log("Authentication failed, wrong uid/pwd credential!");
        setLoginFailed(true)
        logout();
      }
    } catch (err) {
      console.log("LoginForm API error!", err);
      logout();
    }
  };


  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true)
    submit();
  };

  const logout=() => {
    store.dispatch(updateStoreAuth(null));
    removeLocalToken();
    setSubmitted(false)
  }

  const handleChange = (e) => {
    e.persist()
   
    const newValues = {...values, [e.target.name]: e.target.value}
    setValues(newValues)
    setLoginFailed(false);
  };

  const InputForm = () => {

    console.log('values: ', values)
    
    return (
      <div className="loginform">
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              <div>
                <Icon name="lock" size="large" color="teal" />
                GFox
              </div>
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
              <Segment>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-Posta adresiniz"
                  name="uid"
                  onChange={handleChange}
                  // value={values.uid || ''} // if values.uid not exist set it to ''
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  name="pwd"
                  onChange={handleChange}
                  // value={values.pwd || ''}
                />

                <Button color="blue" fluid size="large">
                  {submitted ? (
                    <Icon loading name={spinnerIcon} size="large" />
                  ) : (
                    <span>Giriş</span>
                  )}
                </Button>
              </Segment>
            </Form>
            <span>
              Yeni misiniz? GFox'u denemek için hemen bizimle iletişime{" "}
              <a href="/kvkk">geçin...</a>
            </span>

            {loginFailed && (
              <span style={{ display: "block", color: "#ff0000" }}>
                Giriş başarız! Lütfen tekrar deneyin.
              </span>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    )
  };

  return ( authenticated ) ? <LandingPage />: <InputForm />
}

const addLocalToken = token => {
  localStorage.setItem("gfox_token", token);
};

const removeLocalToken = () => {
  localStorage.removeItem("gfox_token");
};

export default LoginForm;

