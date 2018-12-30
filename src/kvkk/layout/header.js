import React, { PureComponent }  from "react";
import {
  Container,
  Image,
  Menu,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import logo from "../../assets/img/logo2.png";
import notify from "../../assets/img/notify.png";

import { Link } from "react-router-dom";

//Reducer
import { connect } from 'react-redux';
import {store} from '../../reducer';
import { updateStoreNewRequest } from '../../reducer/actions';
import {DropboxCID} from '../components/myComponents'

//Exce Export
import { ExportButton } from '../components/export'


const Logo = () => (
  <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
);



class KVKKHeader extends PureComponent  {
  state ={
      // optionsCids: []
  }

  handleClick=()=>{
    const nr = this.props.newRequest
    store.dispatch(updateStoreNewRequest(!nr));
  }

  handleExit=(event)=>{
    event.preventDefault();
    window.location.reload();
  }


  style = {
              backgroundColor:'#E8E8E8',
  }

  render() {
    const {cid, cidOptions} = this.props

    return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} to="/">
          <Logo /> KVKK
        </Menu.Item>

        {cid&&<Dropdown item simple text="Veri Girişi">
          <Dropdown.Menu style={this.style }>

            {/* TANIMLAR */}
            <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Genel Tanımlar</span>
              <Dropdown.Menu style={this.style }>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/profiller'> <Icon name="sticky note outline" /> Kullanıcı Profilleri </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/birimler'> <Icon name="sticky note outline" /> Birimler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/bolumler'> <Icon name="sticky note outline" /> Birimler > Bölümler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/surecler'> <Icon name="sticky note outline" /> Birimler > Bölümler > Süreçler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/kv'> <Icon name="sticky note outline" /> KV</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/kvkategoriler'> <Icon name="sticky note outline" /> KV Kategorileri</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/islemeamaclari'> <Icon name="sticky note outline" /> İşleme Amaçları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/kanallar'> <Icon name="sticky note outline" /> Toplama Kanalları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/sistemler'> <Icon name="sticky note outline" /> KV Sistemler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/dokumanlar'> <Icon name="sticky note outline" /> Dokumanlar </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/dayanaklar'> <Icon name="sticky note outline" /> Dayanaklar </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/ortamlar'> <Icon name="sticky note outline" /> Arşiv Ortamları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/sureler'> <Icon name="sticky note outline" /> Saklama Süresi </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/kurumlar'> <Icon name="sticky note outline" /> Kurumlar </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/paylasimamaclari'> <Icon name="sticky note outline" /> Paylaşım Amaçları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/paylasimsekilleri'> <Icon name="sticky note outline" /> Paylaşım Şekilleri </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/ulkeler'> <Icon name="sticky note outline" /> Ülkeler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/tedbirler'> <Icon name="sticky note outline" /> Veri Güvenlik Tedbirleri </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>

            {/* SUREC SAHIBI */}
            <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Süreç Sahibi</span>
              <Dropdown.Menu style={this.style }>
                <Dropdown.Item as={Link} to='/kvkk/ss/kurumlar'><Icon name="user outline" /> KV Paylaşılan Kurumlar</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/ss/kanallar'><Icon name="user outline" /> KV Toplama Kanalları</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/ss/sistemler'><Icon name="user outline" /> KV Kullanan Sistemler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/ss/dokumanlar'><Icon name="user outline" /> KV Içeren Dokümanlar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>

            <Dropdown.Divider />
            {/* --------------------------------------------------------------------- */}

            {/* VERBİS KV ANAVERILER */}
            <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Verbis</span>
              <Dropdown.Menu style={this.style }>
                <Dropdown.Item as={Link} to='/kvkk/verbis/profil'><Icon name="lock" /> Profil KV İlişkisi</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/paylasim'><Icon name="lock" /> KV Paylaşımları</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/verbis/anaveri'><Icon name="lock" /> Verbis Anaveri Girişi</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>


              {/* ÖZDİLEK VERSION */}
              <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Özdilek</span>
              <Dropdown.Menu style={this.style }>
                <Dropdown.Item as={Link} to='/kvkk/verbis/ozdilek/anaveriler'><Icon name="lock" /> Anaveri Girişi</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>}

        {/* <Menu.Item header onClick={this.handleClick}> */}
        {cid&&<Menu.Item header as={Link} to='/kvkk/verbis/kvtalepler'>
          {/* Talep varsa notifiy icon göster yoksa normal ikon.. */}
          {
            this.props.newRequest?<Image src={notify} style={{padding:"5px"}} alt="Notification"/>
            :<Icon name="phone volume" />
          }
          KV Talepleri
        </Menu.Item>}


        {cid&&<Menu.Item header as={Link} to="/">
          <Icon name="search" />
          Sorgula
        </Menu.Item>}


        {/* Firma Seç   */}
        <Menu.Item header position='right'>
            <DropboxCID cid={cid} cidOptions={cidOptions}/>
        </Menu.Item>

        {/* Excel Export */}
        {cid&&<Menu.Item header>
          {/* <Icon name="save outline" size='large' /> */}
                <ExportButton cid={cid}/>
            </Menu.Item>}

        {/* Çıkış */}
        <Menu.Item header as={Link} to="/logout" onClick={this.handleExit}>
           <Icon name='sign-out' size='large' color='grey'/>
        </Menu.Item>

      </Container>
    </Menu>
    )
  }
}



const mapStateToProps = (state) => ({ newRequest: state.newRequest, cid: state.cid, cidOptions: state.cidOptions})
export default connect(mapStateToProps)(KVKKHeader)
