import React, { useEffect } from "react";

import LayoutHeader from "./layoutHeader";
import Login from "../auth/login";
import HomeMenu from "./homeMenu";
import "./layout.css";

// Store Reducer
import { updateStoreActiveMenu } from "../../reducer/actions";
import { store } from "../../reducer";
import { connect } from "react-redux";

// Layout Top Menu -> Home Logo'ya tıklandığında gidilecek sayfa için..
function HomeButton(props) {

 //mount
  useEffect(() => {
    store.dispatch(updateStoreActiveMenu(null));
  }, [])

  const { cid } = props.auth.cids;

  return (
      <Login>
        <div className="layout-row">
          <LayoutHeader />
          { cid !== 1 && <HomeMenu />}
        </div>
      </Login>
    );
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(HomeButton);
