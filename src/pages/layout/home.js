import React from "react";

import Layout from ".";
import Login from "../auth/login";
import HomeMenu from "./homeMenu";

// Layout Top Menu -> Home Logo'ya tıklandığında gidilecek sayfa için..
const Component = () => (
  <Login>
    <Layout>
      <HomeMenu />
    </Layout>
  </Login>
);

export default Component;
