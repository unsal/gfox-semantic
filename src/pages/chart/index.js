import React, { PureComponent } from "react";
import { Menu, Icon, Segment, Grid } from "semantic-ui-react";

import KVKKLayout from "../layout";
import Login from '../auth/login'
import AnalizGostergeler from "./analizGostergeler"
import { config } from "../../config";
import AnalizTree from "./analizTree"
import MapKV from "./mapKV"


export default class Component extends PureComponent {
  state = { activeItem: 'gostergeler' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  MenuBar = () => {

    const MenuItem = ({ title, name, icon }) => <Menu.Item name={name} active={this.state.activeItem ===  name } onClick={this.handleItemClick}>
      <Icon name={icon} /> {title}
    </Menu.Item>

    return <Menu icon='labeled' vertical >
      <MenuItem title="Göstergeler" name="gostergeler" icon="chart pie" />
      <MenuItem title="Ülke > KV " name="ulkekv" icon="world" />
      <MenuItem title="Profil > KV" name="profilkv" icon="sitemap" />
      <MenuItem title="Birim > KV" name="birimkv" icon="sitemap" />
      <MenuItem title="Birim > Kurum" name="birimkurum" icon="sitemap" />
    </Menu>
  }

  Content = ({ activeItem }) => {
    const AnalizBirimKV = () => <AnalizTree title="Birim Bazında Girilen KV'ler" url={config.URL_CHART_TREE_BIRIMKV} />
    const AnalizProfilKV = () => <AnalizTree title="Profil Bazında Girilen KV'ler" url={config.URL_CHART_TREE_PROFILKV} />
    const AnalizBirimKurum = () => <AnalizTree title="Birim: KV Aktarılan Kurumlar" url={config.URL_CHART_TREE_BIRIMKURUM} />

    return activeItem === "gostergeler" ? <AnalizGostergeler />
      : activeItem === "profilkv" ? <AnalizProfilKV />
        : activeItem === "birimkv" ? <AnalizBirimKV />
          : activeItem === "birimkurum" ? <AnalizBirimKurum />
          : activeItem === "ulkekv" ? <MapKV />
            : <AnalizGostergeler />
  }

  render() {
    const { activeItem } = this.state

    return <Login>
      <KVKKLayout>
        <Segment basic style={{ margin: "0px" }}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={2}><this.MenuBar /></Grid.Column>
              <Grid.Column width={14}><this.Content activeItem={activeItem} /></Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </KVKKLayout>
    </Login>


  }
}

