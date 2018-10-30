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


class KVTalepler extends PureComponent {

  state = {

    //URLs
    URL_GET: config.URL_GET_KVTALEPLER,
    URL_ADD: config.URL_ADD_KVTALEPLER,

    didMount: false,
    isLoading: true,
    apiOnline: false,

    //Dropdown options
    optionsProfiller: [],
    optionsIslemDurumlari: [],

    onMouseOverPidm: 0, //üzerine gelinen pidmi yakalmak ve sadece onun için X remove ikonu göstermek için
    isimLabelClicked: false,

  }

  async componentDidMount() { //Dropdownlar dolsun diye async kullanıldı..

    const {URL_GET} = this.state

    const optionsProfiller      = await getOptions(config.URL_GET_PROFILLER);
    const optionsIslemDurumlari = await getOptions(config.URL_GET_ISLEMDURUMLARI);

    await this.setState(
                {optionsProfiller, optionsIslemDurumlari}
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

  handleClickIsimLabel = (event) => {
      event.preventDefault()
      this.setState({ isimLabelClicked: true })
  }

  handleClickDeleteRow = async (event)=>{
    event.preventDefault()
    const URL_DELETE= config.URL_DELETE_KVTalepler
    const {URL_GET} = this.state
    const pidm=this.state.onMouseOverPidm

    const params = await {pidm} //{pidm=##} olrak gönderilir

    try {
        const config = { headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'}
    }
        await axios.post(URL_DELETE, params, config)
        await this.setState({ success:true })
        await refreshStoreData(URL_GET, store )
    } catch (err) {
          console.log("KVTalepler->delete entire row-> API Error!",err);
    }

  }

  IsimLabelBox=()=>{
    return <div style={{ display: 'block' }}>
                <Icon   //(x)
                  link
                  name="remove circle"
                  size="large"
                  color="grey"
                  onClick={()=>this.setState({ isimLabelClicked: false })}
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

  IsimLabel=(props)=>{
    //tüm satırı silmek için Birim butonu
    const {onMouseOverPidm, isimLabelClicked} = this.state
    const {pidm} = props
    return <span>
              {props.children}
              {(onMouseOverPidm===pidm)&&!isimLabelClicked?<Icon style={{display: 'block'}} link name='remove' color='red' inverted onClick={this.handleClickIsimLabel}/>:null}
              {isimLabelClicked&&(onMouseOverPidm===pidm)?<this.IsimLabelBox />:null}
           </span>
  }

  RenderTable=()=> {
    const { data } = this.props; //data > from reducer
    const headerBGColor = "#f3f3f3"

    return (
      <div className="kvkk-content-kv">
      <div style={{display: 'inline-block'}}>
        <h2 style={{ float: 'left' }} className="ui header">KV TALEPLERİ</h2>
        <AddForm
            store={store}
            optionsProfiller = {this.state.optionsProfiller}
            optionsIslemDurumlari = {this.state.optionsIslemDurumlari}
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
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> İSİM</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> PROFİLLER</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> TCKNO</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> DOĞUM TAR</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> EPOSTA</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> TEL</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> İNCELEME</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> İŞLEM</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> UZATMA</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> KURUMU</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> TALEP</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "8%", backgroundColor:headerBGColor }}> TALEP TAR</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

           {_.size(data)===0?null:
           data.map((key) => (
              <Table.Row  key={key.pidm}
                          onMouseOver={()=>this.setState({ onMouseOverPidm:key.pidm })}
                          onMouseLeave={()=>this.setState({ isimLabelClicked: false })} //silme menüsü  kalksın diye harekette
                          >
                <Table.Cell style={{ verticalAlign: 'top' }}><this.IsimLabel pidm={key.pidm}>{key.isim}</this.IsimLabel></Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="profiller"  color='teal'  rowPidm={key.pidm} data={key.profiller_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.tckno}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.dogumtarihi}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.eposta}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.tel}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.incelemedurumu}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.islemdurumu}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.sureuzatma?'evet':'hayır'}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.kurumu}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.bilgitalebi}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.timestamp}</Table.Cell>

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
export default connect(mapStateToProps)(KVTalepler);
