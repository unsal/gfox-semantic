import KVKKHeader from './header'
// import KVKKFooter from './footer'

import React, {PureComponent} from 'react'
import { Message } from "semantic-ui-react";
import { connect } from "react-redux"


// Header ve Footer şablonu için kullanılır..
class KVKKLayout extends PureComponent {
    render() {
        const authenticated = true
        return (
            authenticated?<div>
                                <KVKKHeader isNotified={true}/>
                                {this.props.children}

                                {/* <KVKKFooter /> ekranda splash yapıyor, kapattım!!! */}
                            </div>:
                             <Message negative>
                                <Message.Header>Güvenlik Hatası</Message.Header>
                                <p>Lütfen uygulamayı tarayıcınızdan "Refresh" yapmadan, sadece menüler üzerinde gezinerek kullanın. <br />Şimdi uygulamayı; tekrar güvenli <a href='http://localhost:3000'>giriş</a> yaparak kullanmaya devam edebilirsiniz!</p>
                            </Message>
        )
    }
}

const mapStateToProps = state => ({ data: state.data, authenticated: state.authenticated });
export default connect(mapStateToProps)(KVKKLayout);