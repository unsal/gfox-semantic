import KVKKHeader from './header'
// import KVKKFooter from './footer'

import React, {PureComponent} from 'react'
import { Message, Icon } from "semantic-ui-react";
import { connect } from "react-redux"
import {settings} from '../../config'


// Header ve Footer şablonu için kullanılır..
class KVKKLayout extends PureComponent {

    MessageNotLogin() {
        return <Message warning>
            <Message.Header><Icon name='user secret' size='big' color='black' />Güvenlik Uyarısı</Message.Header>
            <p>İzinsiz erişiminiz kayıt altına alınmıştır!<br />
            Yetkili kullanıcı olarak bu hatayı alıyorsanız lütfen uygulamayı tarayıcınızdan "Refresh" yapmadan, sadece menüler üzerinde gezinerek kullanın.<br />
            <a href={settings.urlLogin}>Güvenli Giriş</a> yaparak kullanmaya devam edebilirsiniz!</p>
        </Message>
    }

    MessageNotCid() {
        return <Message warning style={{ marginTop:'70px' }}>
                    <Message.Header>Firma seçiminizi yapın</Message.Header>
                     Lütfen öncelikle işlem yapacağınız firmayı seçin.
                </Message>
    }

    render() {
        const {cid} = this.props
        return <div>
                    <KVKKHeader />
                    <div style={{ width:'80%', margin:'6em auto' }}>
                        {cid?this.props.children:<this.MessageNotCid />}
                    </div>
               </div>
    }

}

const mapStateToProps = state => ({ data: state.data, token: state.token, cid: state.cid });
export default connect(mapStateToProps)(KVKKLayout);