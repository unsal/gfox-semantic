import Menu from './menu'
// import KVKKFooter from './footer'

import React, {PureComponent} from 'react'
import { Message, Icon } from "semantic-ui-react";
import { connect } from "react-redux"
import {settings} from '../../config'
import { updateStoreCIDChanged } from "../../reducer/actions";
import { store } from '../../reducer';


// Header ve Footer şablonu için kullanılır..
class Layout extends PureComponent {
    state = {mounted: false}

    componentDidMount() {
        // CID değiştiirtldiğinde Redux->CIDChanged=true yapılıyor.. her layout yüklemesinde başlangıçta false olarak set etmek gerekiyor
        // ki süreli true olarak kalmasın
        store.dispatch(updateStoreCIDChanged(false))
        this.setState({mounted: true})
    }

    MessageNotLogin() {
        return <Message warning>
            <Message.Header><Icon name='user secret' size='big' color='black' />Güvenlik Uyarısı</Message.Header>
            <p>İzinsiz erişiminiz kayıt altına alınmıştır!<br />
            Yetkili kullanıcı olarak bu hatayı alıyorsanız lütfen uygulamayı tarayıcınızdan "Refresh" yapmadan, sadece menüler üzerinde gezinerek kullanın.<br />
            <a href={settings.urlLogin}>Güvenli Giriş</a> yaparak kullanmaya devam edebilirsiniz!</p>
        </Message>
    }

    MessageSelectCID() {
        return <Message warning style={{ marginTop:'70px' }}>
                    <Message.Header>Firma seçiminizi yapın</Message.Header>
                     Lütfen öncelikle işlem yapacağınız firmayı seçin.
                </Message>
    }

    Body = () => {
        const { cid, cidChanged } = this.props
        const Blank = ()=><span></span>
        return <div style={{ width: settings.display.width,  margin: settings.display.marginTop+' auto'}}>
            {(cid && cidChanged) ? <Blank /> : this.props.children}
        </div>
    }

    render() {

        return this.state.mounted && <div>
            <Menu />
            <this.Body />
        </div>
    }

}

const mapStateToProps = state => ({ data: state.data, token: state.token, cid: state.cid, cidChanged: state.cidChanged });
export default connect(mapStateToProps)(Layout);