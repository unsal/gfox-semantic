import React, { PureComponent }  from "react";
import {
  Container,
  Image,
  Menu,
  Icon,
  Dropdown,
  Label
} from "semantic-ui-react";
import logo from "../../assets/img/logo2.png";
import notify from "../../assets/img/notify.png";

import { Link } from "react-router-dom";

//Reducer
import { connect } from 'react-redux';
import {store} from '../../reducer';
import { updateStoreNewRequest } from '../../reducer/actions';

import { config } from "../../config"
import axios from "axios"


const Logo = () => (
  <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
);

class KVKKHeader extends PureComponent  {
  state ={
      optionsCids: []
  }

  handleClick=()=>{
      const nr = this.props.newRequest
      store.dispatch(updateStoreNewRequest(!nr));
  }

  componentDidMount() {
    const optionsCids = this.createCidOptions()
    this.setState({ optionsCids })
    console.log('options: ',optionsCids)
  }

  handleClickAyarlar=(event)=>{
    event.preventDefault();
    window.location.reload();
  }

createCidOptions = async () => {
    const {uid} = this.props
    const params  = {uid}
    let options =[]

    try {
      const result = await axios.post(config.URL_GET_AUTH_CIDS, params, config.axios)
      const data = await result.data?result.data:[]
      await data.map( ({cid, name}) =>  options = options.concat({'key':cid, 'text':name, 'value':cid}) )

    } catch (err) {
          console.log("myComponents->createCidOptions() hatası..",err);
          options = []
    }

    return options
  }


  style = {
              backgroundColor:'#E8E8E8',
  }

  render() {
    const options = this.state.optionsCids

    return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} to="/">
          <Logo /> KVKK
        </Menu.Item>

        <Dropdown item simple text="Veri Girişi">
          <Dropdown.Menu style={this.style }>

            {/* TANIMLAR */}
            <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Genel Tanımlar</span>
              <Dropdown.Menu style={this.style }>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/profiller'> <Icon name="sticky note outline" /> Profiller </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/birimler'> <Icon name="sticky note outline" /> Birimler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkk/tanimlar/kv'> <Icon name="sticky note outline" /> Kişisel Veriler </Dropdown.Item>
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

          </Dropdown.Menu>
        </Dropdown>

        {/* <Menu.Item header onClick={this.handleClick}> */}
        <Menu.Item header as={Link} to='/kvkk/verbis/kvtalepler'>
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
        <Menu.Item header onClick={this.handleClickAyarlar}>
          <Icon name="setting" />
          Ayarlar
        </Menu.Item>
        <Menu.Item header position='right'>

        {/* <Dropdown options={options} /> */}
          <Label as='a' image color='black'>
              <Icon name="database" size="big"/>
              Özyeğin Üniversitesi
          </Label>
        </Menu.Item>

      </Container>
    </Menu>
    )
  }
}

const mapStateToProps = (state) => ({ newRequest: state.newRequest, cid: state.cid, uid: state.uid})
export default connect(mapStateToProps)(KVKKHeader)
