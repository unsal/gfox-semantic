import "./layout.css";

import HomeMenu from "./homeMenu";
// import KVKKFooter from './footer'

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { updateStoreCIDChanged } from "../../reducer/actions";
import { store } from "../../reducer";

// Header ve Footer şablonu için kullanılır..
class LayoutContainer extends PureComponent {
  state = { mounted: false };

  componentDidMount() {
    // CID değiştiirtldiğinde Redux->CIDChanged=true yapılıyor.. her layout yüklemesinde başlangıçta false olarak set etmek gerekiyor
    // ki süreli true olarak kalmasın
    store.dispatch(updateStoreCIDChanged(false));
    this.setState({ mounted: true });
  }

  render() {
    const { cid, cidChanged, children } = this.props;
    return cid && cidChanged ? <HomeMenu /> : children;
  }
}

const mapStateToProps = state => ({
  cid: state.cid,
  cidChanged: state.cidChanged
});
export default connect(mapStateToProps)(LayoutContainer);
