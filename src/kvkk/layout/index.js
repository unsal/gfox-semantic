import KVKKHeader from './header'
// import KVKKFooter from './footer'
import React, {PureComponent} from 'react'


// Header ve Footer şablonu için kullanılır..
export default class KVKKLayout extends PureComponent {
    render() {
        return (
            <div>
                <KVKKHeader isNotified={true}/>
                {this.props.children}
                {/* <KVKKFooter /> */}
            </div>
        )
    }
}