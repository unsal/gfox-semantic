import React, { PureComponent }  from "react";
import {
  Container,
  Image,
  Menu,
  Icon,
  Dropdown
} from "semantic-ui-react";
import logo from "../../assets/img/logo2.png";

import { Link } from "react-router-dom";

//Reducer
import { connect } from 'react-redux';
import {CIDDropbox} from '../components/mycomponents'

//Exce Export
import { ExportButton } from '../components/export'

//handle SearchMode
import {store} from "../../reducer"
import {updateStoreSearchMode} from '../../reducer/actions'


const Logo = () => (
  <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
);



class KVKKHeader extends PureComponent  {
  state ={
      // optionsCids: []
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
    const TanimlarIcon = () => <Icon name="sticky note outline" color="green" />
    const handleSearchMode = () => store.dispatch(updateStoreSearchMode(!this.props.searchMode))

    return (
    <Menu fixed="top" inverted>
      <Container style={{width:'80%'}}>
        <Menu.Item header as={Link} to="/">
          <Logo /> GFOX
        </Menu.Item>

        {cid && <Menu.Item header as={Link} to='/analiz'>
                        <Icon name="chart pie" color="teal" size="large"  />Analiz
                </Menu.Item>}


        {cid&&<Menu.Item header as={Link} to="#" onClick={handleSearchMode} >
              {this.props.searchMode?
              <Icon name="search minus" size="large" color="olive" inverted />
              :<Icon name="search" size="large" color="teal" />} Sorgula

        </Menu.Item>}

        {cid&&<Menu.Item header as={Link} to='/talepler'>
                <Icon name="mail" color="teal" size="large"/>Talepler
              </Menu.Item>}

        {cid&&<Dropdown item simple text="Veri Girişi">
          <Dropdown.Menu style={this.style }>

            {/* TANIMLAR */}
            <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Genel Tanımlar</span>
              <Dropdown.Menu style={this.style }>
                <Dropdown.Item as={Link} to='/profiller'> <TanimlarIcon /> Kullanıcı Profilleri </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kvkategoriler'> <TanimlarIcon /> KV Kategorileri</Dropdown.Item>
                <Dropdown.Item as={Link} to='/sorumlular'> <TanimlarIcon /> Veri Sorumluları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/birimler'> <TanimlarIcon /> Birimler </Dropdown.Item>
                <Dropdown.Item as={Link} to='/bolumler'> <TanimlarIcon /> Birim > Bölümler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/surecler'> <TanimlarIcon /> Birim > Bölüm > Süreçler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/kv'> <TanimlarIcon /> Kişisel Veriler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/dayanaklar'> <TanimlarIcon /> Dayanaklar </Dropdown.Item>
                <Dropdown.Item as={Link} to='/islemeamaclari'> <TanimlarIcon /> İşleme Amaçları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kanallar'> <TanimlarIcon /> Toplama Kanalları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/ortamlar'> <TanimlarIcon /> Arşiv Ortamları </Dropdown.Item>
                <Dropdown.Item as={Link} to='/kurumlar'> <TanimlarIcon /> Aktarılan Kurumlar</Dropdown.Item>
                <Dropdown.Item as={Link} to='/sureler'> <TanimlarIcon /> Süreler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/paylasimamaclari'> <TanimlarIcon /> Paylaşım Amaçları</Dropdown.Item>
                <Dropdown.Item as={Link} to='/paylasimsekilleri'> <TanimlarIcon /> Paylaşım Şekilleri</Dropdown.Item>
                <Dropdown.Item as={Link} to='/tedbirler'> <TanimlarIcon /> Güvenlik Tedbirleri</Dropdown.Item>
                <Dropdown.Item as={Link} to='/ulkeler'> <TanimlarIcon /> Güvenli Ülkeler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/sistemler'> <TanimlarIcon /> Kullanılan Sistemler</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>


              {/* Verbis V2.o */}
              <Dropdown.Item> <i className="dropdown icon" />{" "} <span className="text">Verbis</span>
              <Dropdown.Menu style={this.style }>
                <Dropdown.Item as={Link} to='/anaveriler'><Icon name="shield alternate" color="teal"/> Anaveriler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/aktarimlar'><Icon name="paper plane outline" color="orange"/> Aktarımlar</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to='/kisiler'><Icon name="user outline" color="green"/> Kişiler</Dropdown.Item>
                <Dropdown.Item as={Link} to='/talepler'><Icon name="mail" color="pink"/> Talepler</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>


          </Dropdown.Menu>
        </Dropdown>}




        {/* Firma Seç   */}
        <Menu.Item header position='right'>
            <CIDDropbox cid={cid} cidOptions={cidOptions}/>
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



const mapStateToProps = (state) => ({ cid: state.cid, cidOptions: state.cidOptions, searchMode: state.searchMode})
export default connect(mapStateToProps)(KVKKHeader)
