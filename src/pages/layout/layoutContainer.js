import "./layout.css";

import HomeMenu from "./homeMenu";
// import KVKKFooter from './footer'

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { updateStoreAuth } from "../../reducer/actions";
import { store } from "../../reducer";

// Header ve Footer şablonu için kullanılır..
class LayoutContainer extends PureComponent {
  state = { mounted: false };

  componentDidMount() {
    // CID değiştiirtldiğinde Redux->CIDChanged=true yapılıyor.. her layout yüklemesinde başlangıçta false olarak set etmek gerekiyor
    // ki süreli true olarak kalmasın
    const cidChanged = false;
    const cids = {...this.props.auth.cids, cidChanged}
    const auth = {...this.props.auth, cids}
    store.dispatch(updateStoreAuth(auth));
    this.setState({ mounted: true });
  }

  render() {
    const { children } = this.props;
    const { cid, cidChanged } = this.props.auth.cids;
    return cid && cidChanged ? <HomeMenu /> : children;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LayoutContainer);
