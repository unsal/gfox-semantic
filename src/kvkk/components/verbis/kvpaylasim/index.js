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
import {refreshStoreData, LoadingStoreData}  from '../../myComponents'

import AddForm from "./addform"

class KVPaylasim extends PureComponent {

  state = {

    onMouseOverPidm: 0, //üzerine gelinen pidmi yakalmak ve sadece onun için X remove ikonu göstermek için
    birimLabelClicked: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  // İŞLEME AMAÇLARI
  DataCell = (props) => {
    const {id, rowPidm, color, data} = props

    return <div>
        {
                         data?data.map( ({pidm, name }) => ( //related_item_name: api tarafında kurumlar, toplamakanallari ve kullanilansistemler için tek bir common api yazıldığı için: ordan gelen kolon adıdır
                        // related_item_pidm yerine pidm kullanıldu çünkü: tablodaki unique kayıt pidmine ihtiyaç var..
                                <LabelBox
                                  selectedPidm={pidm} //remove this item from selected IA
                                  name={name} //printing name on screen for onClick this name
                                  key={pidm} //every child must have a unique key
                                  dataCell = {data.map(({pidm})=>pidm)} //işaretli hücrenin içindeki datayı sildikten sonra güncelleyip db'ye basmak için...
                                  color={color}
                                  rowPidm = {rowPidm} //row pidm for updating particulary this record
                                  id={id}
                                  />

                          )):null}

                          <AddBox
                            id={id}
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

    const params = await {pidm} //{pidm=##} olrak gönderilir

    try {
        await axios.post(config.URL_DELETE_KVPAYLASIM, params, config.axios)
        await this.setState({ error: false, success:true })
        await refreshStoreData(store, this.props.cid, config.URL_GET_KVPAYLASIM )
    } catch (err) {
          console.log("KVPaylasim->Update on delete API Error!",err);
          this.setState({ error: true })
    }

  }

  BirimLabelBox=()=>{
    return <div style={{ display: 'inline-block' }}>
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
        <h2 style={{ float: 'left' }} className="ui header">KV Paylaşımları</h2>
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
              <Table.HeaderCell style={{ width: "12%", backgroundColor:headerBGColor }}> BİRİM</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "12%", backgroundColor:headerBGColor }}> KV</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%", backgroundColor:headerBGColor }}> KURUM</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "20%", backgroundColor:headerBGColor }}> İŞLEME AMAÇLARI</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "20%", backgroundColor:headerBGColor }}> PAYLAŞIM AMAÇLARI</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "20%", backgroundColor:headerBGColor }}> PAYLAŞIM ŞEKİLLERİ</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

           {data?data.map(key => (
              <Table.Row  key={key.pidm}
                          onMouseOver={()=>this.setState({ onMouseOverPidm:key.pidm })}
                          onMouseLeave={()=>this.setState({ birimLabelClicked: false })} //silme menüsü  kalksın diye harekette
                          >
                <Table.Cell style={{ verticalAlign: 'top' }}><this.BirimLabel pidm={key.pidm}>{key.birim_name}</this.BirimLabel></Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.kv_name}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.kurum_name}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="ia" color='teal'  rowPidm={key.pidm} data={key.ia_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="pa" color='green' rowPidm={key.pidm} data={key.pa_data} /> </Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }} > <this.DataCell id="ps" color='olive' rowPidm={key.pidm} data={key.ps_data} /> </Table.Cell>

              </Table.Row>
            )):null}
          </Table.Body>
        </Table>
      </div>
    );
  }


  render() {
    const {cid} = this.props
    const url = config.URL_GET_KVPAYLASIM

    return (

      <KVKKLayout>
          <LoadingStoreData cid={cid} url={url}>
              <this.myRender />
          </LoadingStoreData>
      </KVKKLayout>

    );
  }
}


const mapStateToProps = state => ({ data: state.data, cid: state.cid });
export default connect(mapStateToProps)(KVPaylasim);
