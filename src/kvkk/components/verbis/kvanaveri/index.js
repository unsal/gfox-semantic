import React, { PureComponent } from "react";
import { Table, Icon } from "semantic-ui-react";
import KVKKLayout from "../../../layout";
import Login from '../../../../auth/login'

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";
import axios from "axios";

//ISLEME AMACLARI
import AddBox from "./addbox";
import LabelBox from "./labelbox";

import '../../../kvkk.css';
import { config } from "../../../../config";
import {refreshStoreData, LoadingStoreData}  from '../../myComponents'
import AddForm from "./addform"

// import axios from "axios";


class KVAnaveri extends PureComponent {

  state = {

    onMouseOverPidm: 0, //üzerine gelinen pidmi yakalmak ve sadece onun için X remove ikonu göstermek için
    birimLabelClicked: false,

  }

  // İŞLEME AMAÇLARI
  DataCell = (props) => {
    const {id, rowPidm, color, data} = props

    return <div>
                {data?data.map( ({pidm, name }) => ( //related_item_name: api tarafında kurumlar, toplamakanallari ve kullanilansistemler için tek bir common api yazıldığı için: ordan gelen kolon adıdır
              // related_item_pidm yerine pidm kullanıldu çünkü: tablodaki unique kayıt pidmine ihtiyaç var..
                      <LabelBox
                          id={id} // işleme amaçları
                          key={pidm} //every child must have a unique key
                          rowPidm = {rowPidm} //row pidm for updating particulary this record
                          selectedPidm={pidm} //remove this item from selected IA
                          name={name} //printing name on screen for onClick this name
                          dataCell = {data?data.map(({pidm})=>pidm):null} //işaretli hücrenin içindeki datayı sildikten sonra güncelleyip db'ye basmak için...
                          color = {color}
                      />
                )):null}

                <AddBox
                  id={id} // datacell add
                  rowPidm={rowPidm} //update edilecek pidm
                  dataCell = {data?data.map(({pidm})=>pidm):null}
                  color={color}
                />
        </div>
    }

  handleClickBirimLabel = (event) => {
      event.preventDefault()
      this.setState({ birimLabelClicked: true })
  }

  handleClickDeleteRow = async (event)=>{
    event.preventDefault()
    const pidm=this.state.onMouseOverPidm
    const {cid} = this.props

    const params = await {pidm} //{pidm=##} olrak gönderilir

    try {
        await axios.post(config.URL_DELETE_KVANAVERI, params, config.axios)
        await refreshStoreData(store, cid, config.URL_GET_KVANAVERI )
    } catch (err) {
          console.log("KVAnaveri->delete entire row-> API Error!",err);
    }

  }

  BirimLabelBox=()=>{
    return <div style={{ display: 'block' }}>
                <Icon   //(x)
                  link
                  name="remove circle"
                  size="large"
                  color="grey"
                  onClick={()=>this.setState({ birimLabelClicked: false })}
                /><Icon  // (v)
                  link
                  name="check circle"
                  size="large"
                  color="red"
                  onClick={this.handleClickDeleteRow}
                />
                <span style={{ display: 'block', color:'red'}}>Satır silinsin mi?</span>
          </div>
  }

  BirimLabel=(props)=>{
    //tüm satırı silmek için Birim butonu
    const {onMouseOverPidm, birimLabelClicked} = this.state
    const {pidm} = props
    return <span>
              {props.children}
              {(onMouseOverPidm===pidm)&&!birimLabelClicked?<Icon style={{display: 'block'}} link name='remove' color='red' inverted onClick={this.handleClickBirimLabel}/>:null}
              {birimLabelClicked&&(onMouseOverPidm===pidm)?<this.BirimLabelBox />:null}
           </span>
  }

  myRender=()=> {
    const { data } = this.props; //data > from reducer
    const headerBGColor = "#f3f3f3"

    return (
      <div className="kvkk-content-kv">
      <div style={{display: 'inline-block'}}>
        <h2 style={{ float: 'left' }} className="ui header">KV Anaveri</h2>
        <AddForm />
      </div>

        <Table
          selectable
          celled
          fixed
          compact='very'
          size="small"
          style={{ width: "100%" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "19%", backgroundColor:headerBGColor }}> BİRİM</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "13%", backgroundColor:headerBGColor }}> KV</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%", backgroundColor:headerBGColor }}> SAKLAMA SÜRESİ</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "9%", backgroundColor:headerBGColor }}> AKTARILAN ÜLKELER</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "9%", backgroundColor:headerBGColor }}> TOPLAMA KANALLARI</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "9%", backgroundColor:headerBGColor }}> DOKÜMANLAR</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "9%", backgroundColor:headerBGColor }}> SİSTEMLER</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "9%", backgroundColor:headerBGColor }}> HUKUKİ DAYANAKLAR</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "9%", backgroundColor:headerBGColor }}> SAKLAMA ORTAMLARI</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "9%", backgroundColor:headerBGColor }}> VERİ GÜVENLİK TEDBİRLERİ</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>


           {data&&data.map((key) => (
              <Table.Row  key={key.pidm}
                          onMouseOver={()=>this.setState({ onMouseOverPidm:key.pidm })}
                          onMouseLeave={()=>this.setState({ birimLabelClicked: false })} //silme menüsü  kalksın diye harekette
                          >
                <Table.Cell style={{ verticalAlign: 'top' }}><this.BirimLabel pidm={key.pidm}>{key.birim_name}</this.BirimLabel></Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.kv_name}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.sure_name}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="ulkeler"    color='blue'   rowPidm={key.pidm} data={key.ulkeler_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="kanallar"   color='teal'   rowPidm={key.pidm} data={key.kanallar_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="dokumanlar" color='green'  rowPidm={key.pidm} data={key.dokumanlar_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="sistemler"  color='olive'  rowPidm={key.pidm} data={key.sistemler_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="dayanaklar" color='yellow' rowPidm={key.pidm} data={key.dayanaklar_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="ortamlar"   color='orange' rowPidm={key.pidm} data={key.ortamlar_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="tedbirler"   color='brown' rowPidm={key.pidm} data={key.tedbirler_data} /> </Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }


  render() {
    const {cid} = this.props
    const url = config.URL_GET_KVANAVERI

    return (
    <Login>
      <KVKKLayout>
          <LoadingStoreData cid={cid} url={url}>
              <this.myRender />
          </LoadingStoreData>
      </KVKKLayout>
    </Login>
    );
  }
}


const mapStateToProps = state => ({ data: state.data, cid: state.cid });
export default connect(mapStateToProps)(KVAnaveri);
