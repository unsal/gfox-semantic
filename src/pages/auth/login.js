import React, {PureComponent} from 'react'
import { Message } from 'semantic-ui-react'
import {settings} from '../../config'
import { connect } from "react-redux";

// Her uygulamada login kontrol için...
class Login extends PureComponent {

        state = { }

        componentDidMount() {
            const {token} = this.props
            const tokenLocal = localStorage.getItem('gfox_token')
            const authenticated = (token === tokenLocal)

            this.setState({ authenticated })
        }

        MessageFailed() {
                return <Message color='red' style={{ margin:'3em', width:'600px'}}>
                            <Message.Header>Güvenlik Uyarısı</Message.Header>
                            <p>İzinsiz erişiminiz kayıt altına alınmıştır!<br />
                            Yetkili kullanıcı olarak bu hatayı alıyorsanız lütfen uygulamayı tarayıcınızdan "Refresh" yapmadan, sadece menüler üzerinde gezinerek kullanın.<br />
                            <a href={settings.urlLogin}>Güvenli Giriş</a> yaparak kullanmaya devam edebilirsiniz!</p>
                        </Message>
                }

        render() {
            return this.state.authenticated?this.props.children:<this.MessageFailed />
        }

}

const mapStateToProps = state => ({ token: state.token })
export default connect(mapStateToProps)(Login)
