import KVKKHeader from './header'
// import KVKKFooter from './footer'
import React, {Component} from 'react'


// Header ve Footer şablonu için kullanılır..
export default class KVKKLayout extends Component {
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