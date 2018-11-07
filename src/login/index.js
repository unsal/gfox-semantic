
import React, {PureComponent} from 'react'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'
import axios from "axios";
import {config} from '../config'
import { connect } from "react-redux";
import {updateStoreToken, updateStoreUID} from '../reducer/actions'
import {store} from "../reducer"

class LoginForm extends PureComponent {
      state = {}

        handleChange = e => {
          e.preventDefault()
          this.setState({
            [e.target.name]: e.target.value
          })
        }

        handleSubmit = async e => {
          e.preventDefault()
          console.log('uid: ',this.state.uid)
          const {uid, pwd} = this.state
          const params = {uid, pwd}

          try {
              let result = null
              const row = await axios.post(config.URL_LOGIN, params, config.axios)
              const data = row.data?row.data:[]
              await data.map( ({token}) =>  result = token )

              if (result) {
                  console.log(result, 'login successfully...')
                  await store.dispatch(updateStoreToken(result))
                  await store.dispatch(updateStoreUID(uid))
              } else {
                console.log('login failed!')
                  await store.dispatch(updateStoreToken(null))
                  await store.dispatch(updateStoreUID(null))
              }
          } catch (err) {
              store.dispatch(updateStoreToken(null))
                console.log("Login API error!",err);
          }

        };

        render() {
          return <div className='login-form'>

            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                <Icon name='user circle' color='teal'/>GFox Giriş
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                  <Segment basic>
                    <Form.Input
                      fluid icon='user'
                      iconPosition='left'
                      placeholder='E-Posta adresiniz'
                      name = 'uid'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Şifre'
                      type='password'
                      name='pwd'
                      onChange={this.handleChange}
                    />

                    <Button color='blue' fluid size='large'>
                      Giriş
                    </Button>
                  </Segment>
                </Form>
                <span>
                  Yeni misiniz? GFox'u denemek için hemen bizimle iletişime <a href='/kvkk'>geçin...</a>
                </span>
              </Grid.Column>
            </Grid>
          </div>
        }
}


const mapStateToProps = state => ({ cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(LoginForm);

