import React from "react";
import {
  Container,
  Image,
  Menu,
  Icon,
  Dropdown
} from "semantic-ui-react";
import logo from "../../assets/img/logo.png";
import notify from "../../assets/img/notify.png";

import { Link } from "react-router-dom";

//Reducer
import { connect } from 'react-redux';
import {store} from '../../reducer';
import { updateStoreNewRequest } from '../../reducer/actions';

const Logo = () => (
  <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
);

class KVKKHeader extends React.Component {
  handleClick=()=>{
      const nr = this.props.newRequest
      store.dispatch(updateStoreNewRequest(!nr));
  }

  render() {
    return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} to="/">
          <Logo /> KVKK
        </Menu.Item>

        <Dropdown item simple text="Verbis Envanter">
          <Dropdown.Menu>
            <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Genel Tanımlar</span>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/kvkk/verbis/profiller'> <Icon name="file outline" /> Profiller </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/birimler'> <Icon name="file outline" /> Birimler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/kv'> <Icon name="file outline" /> Kişisel Veriler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/islemeamaclari'> <Icon name="file outline" /> İşleme Amaçları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/kanallar'> <Icon name="file outline" /> Toplama Kanalları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/kvsistemler'> <Icon name="file outline" /> KV Sistemler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/dokumanlar'> <Icon name="file outline" /> Dokumanlar </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/dayanaklar'> <Icon name="file outline" /> Dayanaklar </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/ortamlar'> <Icon name="file outline" /> Arşiv Ortamları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/sureler'> <Icon name="file outline" /> Saklama Süresi </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/kurumlar'> <Icon name="file outline" /> Kurumlar </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/paylasimamaclari'> <Icon name="file outline" /> Paylaşım Amaçları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/paylasimsekilleri'> <Icon name="file outline" /> Paylaşım Şekilleri </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/ulkeler'> <Icon name="file outline" /> Ülkeler </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Divider />
            {/* <Dropdown.Header>Header Item</Dropdown.Header> */}
            <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Süreç Sahibi</span>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/kvkk/verbis/sskurumlar'><Icon name="user outline" /> Paylaşılan Kurumlar</Dropdown.Item>
                <Dropdown.Item><Icon name="user outline" /> KV İçeren Dokümanlar</Dropdown.Item>
                <Dropdown.Item><Icon name="user outline" /> Toplama Kanalları</Dropdown.Item>
                <Dropdown.Item><Icon name="user outline" /> Kullanılan Sistemler</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item header onClick={this.handleClick}>
          {/* Talep varsa notifiy icon göster yoksa normal ikon.. */}
          {
            this.props.newRequest?<Image src={notify} style={{padding:"5px"}} alt="Notification"/>
            :<Icon name="phone volume" />
          }
          KV Talepleri
        </Menu.Item>
        <Menu.Item header as={Link} to="/">
          <Icon name="search" />
          Sorgula
        </Menu.Item>
        <Menu.Item header as={Link} to="/">
          <Icon name="setting" />
          Ayarlar
        </Menu.Item>
      </Container>
    </Menu>
    )
  }
}

const mapStateToProps = (state) => ({ newRequest: state.newRequest})
export default connect(mapStateToProps)(KVKKHeader)
