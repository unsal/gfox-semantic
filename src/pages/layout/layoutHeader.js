import React, { PureComponent } from "react";
import { Container, Image, Menu, Dropdown } from "semantic-ui-react";
import logo from "../../assets/img/logo2.png";
import { Link } from "react-router-dom";
import SelectCID from "./selectcid";
import { ExportButton } from "../../components/export";
import { connect } from "react-redux";

class LayoutHeader extends PureComponent {
  state = {
    color: { adminMenu: "black", regularMenu: "teal", icon: null }
  };

  style = {
    backgroundColor: "#E8E8E8"
  };

  isRegularUser = () => (this.props.cid ? this.props.cid !== 1 : false);

  MenuLogo = () => (
    <Menu.Item header as={Link} to="/home" className="layout-logo">
      <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
    </Menu.Item>
  );

  MenuCID = () => {
    const { cid } = this.props;
    const { adminMenu, regularMenu } = this.state.color;
    const color = cid ? (cid !== 1 ? regularMenu : adminMenu) : adminMenu;
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

    return (
      <Dropdown
        item
        text={this.props.uid}
        icon="user"
        style={{ marginRight: "20px" }}
      >
        <Dropdown.Menu>
          <DropdownTanimlar />
          <Dropdown.Item as={Link} to="/">
            Çıkış
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  render() {
    const isRegularUser = this.isRegularUser();
    return (
      <Menu
        inverted
        fixed="top"
        color={
          isRegularUser
            ? this.state.color.regularMenu
            : this.state.color.adminMenu
        }
      >
        <Container className="layout-topmenu">
          <this.MenuLogo />
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
  uid: state.uid
});
export default connect(mapStateToProps)(LayoutHeader);
