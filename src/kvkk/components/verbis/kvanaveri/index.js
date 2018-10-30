import React, { PureComponent } from "react";
import { Table, Icon } from "semantic-ui-react";
import KVKKLayout from "../../../layout";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";
import axios from "axios";

//ISLEME AMACLARI
import AddBox from "./addbox";
import LabelBox from "./labelbox";

import '../../../kvkk.css';
import { config } from "../../../../config";
import {MyLoader, getOptions, refreshStoreData}  from '../../myComponents'

import _ from 'lodash';
import AddForm from "./addform"

// import axios from "axios";


class KVAnaveri extends PureComponent {

  state = {

    //URLs
    URL_GET: config.URL_GET_KVANAVERI,
    URL_ADD: config.URL_ADD_KVANAVERI,

    didMount: false,
    isLoading: true,
    apiOnline: false,

    //Dropdown options
    optionsBirimler: [],
    optionsKV: [],
    optionsSureler: [],
    optionsUlkeler: [],
    optionsKanallar: [],
    optionsDokumanlar: [],
    optionsSistemler: [],
    optionsDayanaklar: [],
    optionsOrtamlar: [],

    onMouseOverPidm: 0, //üzerine gelinen pidmi yakalmak ve sadece onun için X remove ikonu göstermek için
    birimLabelClicked: false,

    error:false
  }

  async componentDidMount() { //Dropdownlar dolsun diye async kullanıldı..

    const {URL_GET} = this.state

    const optionsBirimler    = await getOptions(config.URL_GET_BIRIMLER);
    const optionsKV          = await getOptions(config.URL_GET_KV);
    const optionsSureler     = await getOptions(config.URL_GET_SURELER);
    const optionsUlkeler     = await getOptions(config.URL_GET_ULKELER);
    const optionsKanallar    = await getOptions(config.URL_GET_KANALLAR);
    const optionsDokumanlar  = await getOptions(config.URL_GET_DOKUMANLAR);
    const optionsSistemler   = await getOptions(config.URL_GET_SISTEMLER);
    const optionsDayanaklar  = await getOptions(config.URL_GET_DAYANAKLAR);
    const optionsOrtamlar    = await getOptions(config.URL_GET_ORTAMLAR);

    await this.setState(
                {optionsBirimler, optionsKV, optionsSureler,
                 optionsUlkeler, optionsKanallar, optionsDokumanlar,
                 optionsSistemler,optionsDayanaklar, optionsOrtamlar}
          )

    await refreshStoreData(URL_GET, store)
    await this.setState({apiOnline: true, didMount: true})

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this.setState( {isLoading: false, didMount: false} )
  }

  // İŞLEME AMAÇLARI
  DataCell = (props) => {
    const {id, rowPidm, color, data} = props

    return <div>
        {JSON.stringify(data)==="[]"?null:
                         data.map( ({pidm, name }) => ( //related_item_name: api tarafında kurumlar, toplamakanallari ve kullanilansistemler için tek bir common api yazıldığı için: ordan gelen kolon adıdır
                        // related_item_pidm yerine pidm kullanıldu çünkü: tablodaki unique kayıt pidmine ihtiyaç var..
                                <LabelBox
                                    id={id} // işleme amaçları
                                    key={pidm} //every child must have a unique key
                                    rowPidm = {rowPidm} //row pidm for updating particulary this record
                                    selectedPidm={pidm} //remove this item from selected IA
                                    name={name} //printing name on screen for onClick this name
                                    store={store} //for refreshStoreData
                                    dataCell = {data.map(({pidm})=>pidm)} //işaretli hücrenin içindeki datayı sildikten sonra güncelleyip db'ye basmak için...
                                    color = {color}
                                />

                          ))}

                          <AddBox
                            id={id} // datacell add
                            rowPidm={rowPidm} //update edilecek pidm
                            store={store}
                            dataCell = {data.map(({pidm})=>pidm)}
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
    const URL_DELETE= config.URL_DELETE_KVANAVERI
    const {URL_GET} = this.state
    const pidm=this.state.onMouseOverPidm

    const params = await {pidm} //{pidm=##} olrak gönderilir

    try {
        const config = { headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'}
    }
        await axios.post(URL_DELETE, params, config)
        await this.setState({ error: false, success:true })
        await refreshStoreData(URL_GET, store )
    } catch (err) {
          console.log("KVAnaveri->delete entire row-> API Error!",err);
          this.setState({ error: true })
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

  RenderTable=()=> {
    const { data } = this.props; //data > from reducer
    const headerBGColor = "#f3f3f3"

    return (
      <div className="kvkk-content-kv">
      <div style={{display: 'inline-block'}}>
        <h2 style={{ float: 'left' }} className="ui header">KV Anaveri</h2>
        <AddForm
            store={store}
            optionsBirimler = {this.state.optionsBirimler}
            optionsKV = {this.state.optionsKV}
            optionsSureler = {this.state.optionsSureler}
            optionsUlkeler = {this.state.optionsUlkeler}
            optionsKanallar = {this.state.optionsKanallar}
            optionsDokumanlar = {this.state.optionsDokumanlar}
            optionsSistemler = {this.state.optionsSistemler}
            optionsDayanaklar = {this.state.optionsDayanaklar}
            optionsOrtamlar = {this.state.optionsOrtamlar}
        />
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
              <Table.HeaderCell style={{ width: "20%", backgroundColor:headerBGColor }}> BİRİM</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> KV</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> SAKLAMA SÜRESİ</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> AKTARILAN ÜLKELER</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> TOPLAMA KANALLARI</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> DOKÜMANLAR</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> SİSTEMLER</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> HUKUKİ DAYANAKLAR</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> SAKLAMA ORTAMLARI</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

           {_.size(data)===0?null:
           data.map((key) => (
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

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }


  render() {
    const { isLoading, apiOnline } = this.state;

    return (

      <KVKKLayout>
        {
         !isLoading&&apiOnline? <this.RenderTable />:
            <MyLoader />
        }

      </KVKKLayout>

    );
  }
}


const mapStateToProps = state => ({ data: state.data, mode: state.mode });
export default connect(mapStateToProps)(KVAnaveri);
