import React from "react";

import Layout from "../layout";
import Login from "./login";


const Landing =() => (
    <Login>
      <Layout showLeftMenu={false}>
        <span>Lütfen firma seçiminizi yapınız...</span>
      </Layout>
    </Login>
)

export default Landing;
