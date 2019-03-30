import LayoutHeader from "./layoutHeader";
import LayoutLeft from "./layoutLeft";
import "./layout.css";

import React, { PureComponent } from "react";
import LayoutContainer from "./layoutContainer";

// Header ve Footer şablonu için kullanılır..
class Layout extends PureComponent {
  render() {
    // showLeftMenu -> Regular User > Home Menu'de gözükmemesi için
    const { showLeftMenu } = this.props;

    return (
      <div className="flex-column"> 
        <LayoutHeader />
        <div className="flex-row">
          {showLeftMenu && <LayoutLeft />}
          <LayoutContainer>{this.props.children}</LayoutContainer>
        </div>
      </div>
    );
  }
}

export default Layout;
