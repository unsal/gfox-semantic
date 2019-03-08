import React, { PureComponent } from "react";
import { Menu, Icon} from "semantic-ui-react";

import Layout from "../layout";
import Login from '../auth/login'
import AnalizGostergeler from "./analizGostergeler"
import { config } from "../../config";
import AnalizTree from "./analizTree"
import MapChart from "./mapChart"


export default class Component extends PureComponent {
  state = { activeItem: 'ulkekv' }

  Body = ({ activeItem }) => {
    const AnalizBirimKV = () => <AnalizTree title="Birim Bazında Girilen KV'ler" url={config.URL_CHART_TREE_BIRIMKV} />
    const AnalizProfilKV = () => <AnalizTree title="Profil Bazında Girilen KV'ler" url={config.URL_CHART_TREE_PROFILKV} />
    const AnalizBirimKurum = () => <AnalizTree title="Birim: KV Aktarılan Kurumlar" url={config.URL_CHART_TREE_BIRIMKURUM} />

    return activeItem === "gostergeler" ? <AnalizGostergeler />
      : activeItem === "profilkv" ? <AnalizProfilKV />
        : activeItem === "birimkv" ? <AnalizBirimKV />
          : activeItem === "birimkurum" ? <AnalizBirimKurum />
          : activeItem === "ulkekv" ? <MapChart />
            : <AnalizGostergeler />
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }


  MenuBar = () => {
    const MenuItem = ({ title, name, icon }) => <Menu.Item name={name} active={this.state.activeItem === name} onClick={this.handleItemClick}>
      <Icon name={icon} /> {title}
    </Menu.Item>

    return <div style={{ margin: "0px" }}>
      <Menu  compact>
        <MenuItem title="Ülke >> KV " name="ulkekv" />
        <MenuItem title="Göstergeler" name="gostergeler"  />
        <MenuItem title="Profil >> KV" name="profilkv"  />
        <MenuItem title="Birim >> KV" name="birimkv"  />
        <MenuItem title="Birim >> Kurum" name="birimkurum" />
      </Menu>
    </div>
  }

  render() {
    const { activeItem } = this.state

    return <Login>
      <Layout>
        <this.MenuBar />
        <this.Body activeItem={activeItem} />
      </Layout>
    </Login>
  }
}
