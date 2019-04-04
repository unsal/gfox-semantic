import React from "react";
import { Container, Image, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SelectCID from "./selectcid";
import { ExportButton } from "../../components/export";
import { connect } from "react-redux";

import logo from "../../assets/img/logo-fox.png";

function LayoutHeader (props) {

        const isRegularUser = () => {
          const { cid } = props.auth.cids
          return cid ? cid !== 1 : false
        };

        const menuColor = () => {
          const { auth } = props;
          const color = auth.admin ? "orange" : auth.dpo ? "teal" : "blue";
          return color;
        }

        const MenuCID = () => {

          const color = menuColor();

          return (
            <Menu.Item header position="right">
              <SelectCID color={color} />
            </Menu.Item>
          );
        };

        const MenuExport = () => (
          <Menu.Item header>
            {/* <Icon name="save outline" size='large' /> */}
            <ExportButton cid={props.auth.cids.cid} />
          </Menu.Item>
        );

        const MenuUser = () => {
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



          const authTanimlar = () => (props.auth.dpo || props.auth.admin )

          return (
            <Dropdown
              item
              text={props.auth.uid}
              icon="user"
              style={{ marginRight: "20px" }}
            >
              <Dropdown.Menu>
                {authTanimlar()  && <DropdownTanimlar />}
                <Dropdown.Item as={Link} to="/accounts">
                  Hesaplar
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/">
                  Çıkış
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
        };


        const Logo = () => (
          <Menu.Item header as={Link} to="/home" className="layout-logo">
            <Image src={logo} className="logo" />
          </Menu.Item>
        );

        const color = menuColor()
        const { cid } = props.auth.cids

          return (
            <Menu
              inverted
              fixed="top"
              color={color}
            >
              <Container className="layout-topmenu">
                <Logo />
                <MenuCID />
                {isRegularUser() && <MenuExport />}
                {cid && <MenuUser />}
              </Container>
            </Menu>
          );
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LayoutHeader);
