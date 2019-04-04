import React, { PureComponent } from "react";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";
import axios from "axios";
import { config } from "../../config";
import { updateStoreAuth } from "../../reducer/actions";
import { store } from "../../reducer";
import { spinnerIcon } from "../../components/gfox";
import LandingPage from "./landing";
import "./auth.css";

export default class LoginForm extends PureComponent {
  state = {
    authenticated: false,
    loginFailed: false,
    submitted: false
  };

  componentDidMount() {
    //resetle
    this.logout();
  }

  componentWillUnmount() {}



  //Headerda, CID optionsı yüklemek için...
  //aşağıdaki submit fonksionunda kullanıldı

  createCIDOptions = async uid => {
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
      console.log("myComponents->() hatası..", err);
      options = [];
    }
    return options;
  };


  submit = async () => {
    const { username, password } = this.state;
    const params = { username, password };

    try {
      let auth = {}
      const row = await axios.post(config.URL_AUTH, params, config.axios);
      const data = row.data ? row.data : [];
      const cidOptions = await this.createCIDOptions(username);

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
        await setLocalToken(auth.token); //data: [{cid:1, uid:'admin@grcfox.com}]
        await store.dispatch(updateStoreAuth(auth));

        this.setState({ authenticated: true });
      } else {
        console.log("Authentication failed, wrong uid/pwd credential!");
        this.setState({ loginFailed: true });
        this.logout();
      }
    } catch (err) {
      console.log("LoginForm API error!", err);
      this.logout();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    this.submit();
  };

  logout() {
    store.dispatch(updateStoreAuth(null));
    removeLocalToken();
    this.setState({ submitted: false });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      loginFailed: false
    });
  };

  RenderLoginForm = () => (
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
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-Posta adresiniz"
                  name="username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />

                <Button color="blue" fluid size="large">
                  {this.state.submitted ? (
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

            {this.state.loginFailed && (
              <span style={{ display: "block", color: "#ff0000" }}>
                Giriş başarız! Lütfen tekrar deneyin.
              </span>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );

  render() {
    return this.state.authenticated ? (
      <LandingPage />
    ) : (
      <this.RenderLoginForm />
    );
  }
}

const setLocalToken = token => {
  localStorage.setItem("gfox_token", token);
};

const removeLocalToken = () => {
  localStorage.removeItem("gfox_token");
};

