import React, { PureComponent } from "react";
import { Container, Image, Menu, Icon, Dropdown } from "semantic-ui-react";
import logo from "../../assets/img/logo2.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SelectCID from "./selectcid";
import { ExportButton } from "../../components/export";
import { store } from "../../reducer";
import { updateStoreSearchMode } from "../../reducer/actions";
import { settings } from "../../config";

class Component extends PureComponent {
  state = {
    color: { adminMenu: "black", regularMenu: "teal", icon: null }
  };

  style = {
    backgroundColor: "#E8E8E8"
  };

  isRegularUser = () => (this.props.cid ? this.props.cid !== 1 : false);

  Logo = () => (
    <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
  );

  MenuLogo = () => (
    <Menu.Item header as={Link} to="/home">
      <this.Logo /> GFOX
    </Menu.Item>
  );

  MenuSecenekler = () => {
    const TanimlarIcon = () => (
      <Icon name="sticky note outline" color={this.state.color.icon} />
    );

    return (
      <Dropdown item simple text="Seçenekler">
        <Dropdown.Menu style={this.style}>
          {/* TANIMLAR */}
          <Dropdown.Item>
            {" "}
            <i className="dropdown icon" />{" "}
            <span className="text">Ön Tanımlar</span>
            <Dropdown.Menu style={this.style}>
              <Dropdown.Item as={Link} to="/profiller">
                {" "}
                <TanimlarIcon /> Kullanıcı Profilleri{" "}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/kv_kategoriler">
                {" "}
                <TanimlarIcon /> KV Kategorileri
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/sorumlular">
                {" "}
                <TanimlarIcon /> Veri Sorumluları{" "}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/birimler">
                {" "}
                <TanimlarIcon /> Birimler{" "}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/bolumler">
                {" "}
                <TanimlarIcon /> Birim > Bölümler
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/surecler">
                {" "}
                <TanimlarIcon /> Birim > Bölüm > Süreçler
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/kv">
                {" "}
                <TanimlarIcon /> Kişisel Veriler
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/dayanaklar">
                {" "}
                <TanimlarIcon /> Dayanaklar{" "}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/isleme_amaclari">
                {" "}
                <TanimlarIcon /> İşleme Amaçları{" "}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/kanallar">
                {" "}
                <TanimlarIcon /> Toplama Kanalları{" "}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/ortamlar">
                {" "}
                <TanimlarIcon /> Arşiv Ortamları{" "}
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/kurumlar">
                {" "}
                <TanimlarIcon /> Aktarılan Kurumlar
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/sureler">
                {" "}
                <TanimlarIcon /> Süreler
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/paylasim_amaclari">
                {" "}
                <TanimlarIcon /> Paylaşım Amaçları
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/paylasim_sekilleri">
                {" "}
                <TanimlarIcon /> Paylaşım Şekilleri
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/tedbirler">
                {" "}
                <TanimlarIcon /> Güvenlik Tedbirleri
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/ulkeler">
                {" "}
                <TanimlarIcon /> Güvenli Ülkeler
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/sistemler">
                {" "}
                <TanimlarIcon /> Kullanılan Sistemler
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  MenuEnvanter = () => (
    <Dropdown item simple text="Envanter">
      <Dropdown.Menu style={this.style}>
        {/* <Dropdown.Item as={Link} to='/anaveriler'><Icon name="shield alternate" color="teal" /> Anaveriler</Dropdown.Item> */}
        <Dropdown.Item as={Link} to="/anaveriler">
          <Icon name="gem outline" color={this.state.color.regularMenu} />{" "}
          Anaveriler
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/aktarimlar">
          <Icon name="globe" color={this.state.color.regularMenu} /> Aktarımlar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  MenuTalepler = () => (
    <Menu.Item header as={Link} to="/talepler">
      <Icon name="mail" color={this.state.color.icon} size="large" />
      Talepler
    </Menu.Item>
  );

  MenuSorgula = () => {
    const handleSearchMode = () =>
      store.dispatch(updateStoreSearchMode(!this.props.searchMode));

    return (
      <Menu.Item header as={Link} to="#" onClick={handleSearchMode}>
        {this.props.searchMode ? (
          <Icon
            name="search minus"
            size="large"
            color={this.state.color.icon}
            inverted
          />
        ) : (
          <Icon name="search" size="large" color={this.state.color.icon} />
        )}{" "}
        Sorgula
      </Menu.Item>
    );
  };

  MenuAnaliz = () => (
    <Menu.Item header as={Link} to="/analiz">
      <Icon name="chart pie" color={this.state.color.icon} size="large" />
      Analiz
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

  MenuExit = () => {
    const handleExit = event => {
      event.preventDefault();
      window.location.reload();
    };

    return (
      <Menu.Item header as={Link} to="/logout" onClick={handleExit}>
        <Icon name="sign-out" size="large" />
      </Menu.Item>
    );
  };

  render() {
    const isRegularUser = this.isRegularUser();
    return (
      <Menu
        fixed="top"
        color={
          isRegularUser
            ? this.state.color.regularMenu
            : this.state.color.adminMenu
        }
        inverted
      >
        <Container
          style={{
            width: settings.display.width,
            height: settings.display.menuHeight
          }}
        >
          <this.MenuLogo />
          {isRegularUser && <this.MenuAnaliz />}
          {/* {isRegularUser && <this.MenuSorgula />} */}
          {isRegularUser && <this.MenuTalepler />}
          {this.props.cid && <this.MenuSecenekler />}
          {isRegularUser && <this.MenuEnvanter />}
          <this.MenuCID />
          {isRegularUser && <this.MenuExport />}
          <this.MenuExit />
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  cid: state.cid,
  cidOptions: state.cidOptions,
  searchMode: state.searchMode
});
export default connect(mapStateToProps)(Component);
