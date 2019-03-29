import React, { PureComponent } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Store Reducer
import { updateStoreActiveMenu } from "../../reducer/actions";
import { store } from "../../reducer";
import { connect } from "react-redux";

import "./layout.css";

class LayoutLeft extends PureComponent {
  state = { activeMenu: this.props.activeMenu && this.props.activeMenu };

  handleClick = (event, { name }) => {
    store.dispatch(updateStoreActiveMenu(name));
    this.setState({ activeMenu: name });
    // console.log("clicked: ", name);
  };

  MenuEnvanter = () => {
    const menuItems = [
      {
        title: "anaveriler",
        route: "/anaveriler",
        icon: "user",
        className: "outline"
      },
      {
        title: "aktarimlar",
        route: "/aktarimlar",
        icon: "paper plane",
        className: "outline"
      },
      {
        title: "talepler",
        route: "/talepler",
        icon: "mail",
        className: "outline"
      },
      { title: "analiz", route: "/analiz", icon: "chart pie" }
    ];
    // const Capitilaze = ({ title }) => (
    //   <span className="menu-envanter-item">{title}</span>
    // );

    return menuItems.map(({ title, icon, route, className }) => (
      <Menu.Item
        key={title}
        name={title}
        active={this.state.activeMenu === title}
        onClick={this.handleClick}
        as={Link}
        to={route}
      >
        <Icon name={icon} className={className} size="large" />
        {/* <Capitilaze title={title} /> */}
      </Menu.Item>
    ));
  };

  render() {
    const { cid, cidChanged } = this.props.auth.cids;
    const { MenuEnvanter } = this;
    const regularUser = cid !== 1;
    const onSelectedNewCid = cidChanged;
    const showBlankContainer = null;
    const ShowLeftMenu = () =>
      regularUser ? (
        <div className="layout-leftmenu">
          <Menu icon inverted pointing vertical>
            <MenuEnvanter />
          </Menu>
        </div>
      ) : null;

    return (
      // do not show on cid change, because only home menu must be shown
      onSelectedNewCid ? showBlankContainer : <ShowLeftMenu />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  activeMenu: state.activeMenu
});
export default connect(mapStateToProps)(LayoutLeft);
