import React, { PureComponent } from "react";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";
import axios from "axios";
import { config } from "../../config";
import { updateStoreAuth } from "../../reducer/actions";
import { store } from "../../reducer";
import { spinnerIcon } from "../../components/gfox";
import LandingPage from "./landing";
import "./auth.css";
import jwt_decode from "jwt-decode";

export default class LoginForm extends PureComponent {
  state = {
    authenticated: false,
    loginFailed: false,
    submitted: false,
    message: ""
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
      const result = await axios.post(
        config.URL_AUTH_CIDS,
        params,
        config.axios
      );
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

    const onLoginFail = e => {
      if (e === 0) {
        this.setState({
          message: "Geçersiz Kullanıcı Adı ve/veya Şifre girdiniz!"
        });
      } else {
        this.setState({
          message:
            "Servis Erişim Hatası! Lütfen sorunu teknik uzmana bildiriniz."
        });
      }

      //   switch (e) {
      //     case 0: this.setState({ message: "Geçersiz Kullanıcı Adı ve/veya Şifre girdiniz!"}); break;
      //     case 1: this.setState({ message: "Servis Erişim Hatası! Lütfen sorunu teknik uzmana bildiriniz."}); break;
      //     default: this.setState({ message: "Bilinmeyen Hata Kodu. Lütfen sorunu teknik uzmana bildiriniz."})
      //  }

      this.setState({ loginFailed: true });
      this.logout();
    };

    try {
            const row = await axios.post(config.URL_AUTH, params, config.axios);
            const dataExist = row.data

            const data = dataExist ? row.data : [];
            const cidOptions = await this.createCIDOptions(username);
            let token = {};
            
            await data.map(item => (token = item.token));
            
            let payload={}
            try {
              payload = jwt_decode(token)  // {uid, dpo, admin, token, exp}
            } catch(e) {
              payload = {}
            }

            const auth = {
              ...payload,
              token: token,
              cids: { cid: null, cidName: null, cidChanged: false, cidOptions }
            };

            if (auth.uid) {
              localStorage.setItem("gfox_token", token); //data: [{cid:1, uid:'admin@grcfox.com}]
              await store.dispatch(updateStoreAuth(auth));

              this.setState({ authenticated: true });
            } else {
              onLoginFail(0);
            }
            
    } catch (err) {
           console.log("err: ", err)
           onLoginFail(1);
    }
  };

  handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        this.submit();
  };

  logout() {
        store.dispatch(updateStoreAuth(null));
        localStorage.removeItem("gfox_token");
        this.setState({ submitted: false });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      loginFailed: false,
      message: ""
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
                {this.state.message}
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
