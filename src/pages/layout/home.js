import React, { PureComponent } from "react";

import LayoutHeader from "./layoutHeader";
import Login from "../auth/login";
import HomeMenu from "./homeMenu";
import "./index.css";

// Store Reducer
import { updateStoreActiveMenu } from "../../reducer/actions";
import { store } from "../../reducer";
import { connect } from "react-redux";

// Layout Top Menu -> Home Logo'ya tıklandığında gidilecek sayfa için..
class Home extends PureComponent {
  componentDidMount() {
    // actif menüyü resetle -ki homeMenu'den tıklandığında yanlış bir menüyü aktif olarak getirmesin
    store.dispatch(updateStoreActiveMenu(null));
  }

  render() {
    return (
      <Login>
        <div className="layout-row">
          <LayoutHeader />
          {this.props.cid !== 1 && <HomeMenu />}
        </div>
      </Login>
    );
  }
}

const mapStateToProps = state => ({
  cid: state.cid
});
export default connect(mapStateToProps)(Home);
