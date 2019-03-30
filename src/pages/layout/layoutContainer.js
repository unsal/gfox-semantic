import "./layout.css";

import HomeMenu from "./homeMenu";
// import KVKKFooter from './footer'

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateStoreAuth } from "../../reducer/actions";
import { store } from "../../reducer";

// Header ve Footer şablonu için kullanılır..
function LayoutContainer(props) {

  // mount
  useEffect(() => {
    // CID değiştiirtldiğinde Redux->CIDChanged=true yapılıyor.. her layout yüklemesinde başlangıçta false olarak set etmek gerekiyor
    // ki sürekli true olarak kalmasın
    const cidChanged = false;
    const cids = {...props.auth.cids, cidChanged}
    const auth = {...props.auth, cids}

    store.dispatch(updateStoreAuth(auth));

  }, [])


  const { children } = props;
  const { cid, cidChanged } = props.auth.cids;
  
  return ( cid && cidChanged ? <HomeMenu /> : children );

}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LayoutContainer);
