import React, { PureComponent } from "react";
import { Container, Image, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SelectCID from "./selectcid";
import { ExportButton } from "../../components/export";
import { connect } from "react-redux";

import logo from "../../assets/img/logo-fox.png";

class LayoutHeader extends PureComponent {
  state = {};

  isRegularUser = () => (this.props.cid ? this.props.cid !== 1 : false);

  menuColor = () => {
    const { auth } = this.props;
    const color = auth.admin ? "orange" : auth.dpo ? "teal" : "blue";
    return color;
  }

  MenuCID = () => {

    const color = this.menuColor();

    return (
      <Menu.Item header position="right">
        <SelectCID color={color} />
      </Menu.Item>
    );
  };

  MenuExport = () => (
    <Menu.Item header>
      {/* <Icon name="save outline" size='large' /> */}
      <ExportButton cid={this.props.cid} />
    </Menu.Item>
  );

  MenuUser = () => {
    const menuTanimlar = [
      { title: "Profiller", route: "/profiller" },
      { title: "KV Kategoriler", route: "/kv_kategoriler" },
      { title: "Kişisel Veriler", route: "/kv" },
      { title: "Birimler", route: "/birimler" },
      { title: "Bölümler", route: "/bolumler" },
      { title: "Süreçler", route: "/surecler" },
      { title: "Veri Sorumluları", route: "/sorumlular" },
      { title: "Dayanaklar", route: "/dayanaklar" },
      { title: "İşleme Amaçları", route: "/isleme_amaclari" },
      { title: "Kanallar", route: "/kanallar" },
      { title: "Kurumlar", route: "/kurumlar" },
      { title: "Süreler", route: "/sureler" },
      { title: "Paylaşım Amaçları", route: "/paylasim_amaclari" },
      { title: "Paylaşım Şekilleri", route: "/paylasim_sekilleri" },
      { title: "Tedbirler", route: "/tedbirler" },
      { title: "Ülkeler", route: "/ulkeler" },
      { title: "Sistemler", route: "/sistemler" }
    ];

    const DropdownTanimlar = () => (
      <Dropdown item text="Tanımlar" direction="left">
        <Dropdown.Menu>
          {menuTanimlar.map(({ title, route }) => (
            <Dropdown.Item key={title} as={Link} to={route}>
              {" "}
              {title}{" "}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );



    const authTanimlar = () => (this.props.auth.dpo || this.props.auth.admin )

    return (
      <Dropdown
        item
        text={this.props.auth.uid}
        icon="user"
        style={{ marginRight: "20px" }}
      >
        <Dropdown.Menu>
          {authTanimlar()  && <DropdownTanimlar />}
          <Dropdown.Item as={Link} to="/">
            Çıkış
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };


  Logo = () => (
    <Menu.Item header as={Link} to="/home" className="layout-logo">
      <Image src={logo} className="logo" />
    </Menu.Item>
  );


  render() {
    const isRegularUser = this.isRegularUser();
    const color = this.menuColor()
    return (
      <Menu
        inverted
        fixed="top"
        color={color}
      >
        <Container className="layout-topmenu">
          <this.Logo />
          <this.MenuCID />
          {isRegularUser && <this.MenuExport />}
          {this.props.cid && <this.MenuUser />}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  cid: state.cid,
  cidOptions: state.cidOptions,
  cidChanged: state.cidChanged,
  auth: state.auth
});
export default connect(mapStateToProps)(LayoutHeader);
