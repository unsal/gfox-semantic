import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Store Reducer
import { updateStoreActiveMenu } from "../../reducer/actions";
import { store } from "../../reducer";
import { connect } from "react-redux";

import "./layout.css";

function LayoutLeft(props) {
  const initial = props.activeMenu && props.activeMenu;
  const [activeMenu, setActiveMenu] = useState(initial);
  
  const MenuEnvanter = () => {

        const handleClick = (event, { name }) => {
          store.dispatch(updateStoreActiveMenu(name));
          setActiveMenu(name)
        };

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
          { title: "analiz", route: "/analiz", icon: "chart pie" },
          { title: "accounts", route: "/accounts", icon: "lock", dpo: true },
        ];

        return menuItems.map(({ title, icon, route, className, dpo }) => (
          <Menu.Item
            key={title}
            name={title}
            active={activeMenu === title}
            onClick={handleClick}
            as={Link}
            to={route}
          >
            <Icon name={icon} className={className} size="large" />
          </Menu.Item>
          
        ));
  };


  const { cid, cidChanged } = props.auth.cids;
  const regularUser = (cid !== 1);
  const onSelectedNewCid = cidChanged;
  const showBlankContainer = null;

  const ShowLeftMenu = () => (
    regularUser ? (
      <div className="layout-leftmenu">
        <Menu icon inverted pointing vertical>
          <MenuEnvanter />
        </Menu>
      </div>
    ) : null
  )

  return (
      // do not show on cid change, because only home menu must be shown
      onSelectedNewCid ? showBlankContainer : <ShowLeftMenu />
  );

}


const mapStateToProps = state => ({
  auth: state.auth,
  activeMenu: state.activeMenu
});
export default connect(mapStateToProps)(LayoutLeft);
