import React, { PureComponent } from "react";

import Layout from "../layout";
import Login from "./login";

export default class Component extends PureComponent {
  render() {
    return (
      <Login>
        <Layout showLeftMenu={false}>
          <span>Lütfen firma seçiminizi yapınız...</span>
        </Layout>
      </Login>
    );
  }
}
