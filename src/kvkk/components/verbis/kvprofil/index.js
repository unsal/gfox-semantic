import React, { PureComponent } from "react";
import { Table, Message, Dropdown, Icon } from "semantic-ui-react";
import KVKKLayout from "../../../layout";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";
import { updateStoreData, updateStoreMode } from "../../../../reducer/actions";

import AddBox from "./addbox";
import LabelBox from "./labelbox";

import '../../../kvkk.css';
import { config } from "../../../../config";
import {MyLoader, MyMessage, getOptions}  from '../../myComponents'

import _ from 'lodash';

class KVProfil extends PureComponent {

  state = {

    //URLs
    URL_GET: config.URL_GET_KVPROFIL,
    URL_ADD: config.URL_ADD_KVPROFIL,

    didMount: false,
    isLoading: true,

    apiIsOnline: false,

    //Dropdown options
    optionsProfiller: [],
    optionsBirimler: [],
    optionsKV: [],

    profil_pidm: 0,
    birim_pidm: 0,

    profil_value: 0,
    birim_value: 0,
    kv_values: [],

    error: false,
    success: false

  };

  refreshStoreData= ()=> {
    const {URL_GET} = this.state;
    axios
      .get(URL_GET)
      .then(json => {
        const data = json.data;
        store.dispatch(updateStoreData(data)); //store data güncelle
        this.setState({ apiIsOnline: true, didMount: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ apiIsOnline: false, didMount: true });
      });
  }


  async componentDidMount() { //Dropdownlar dolsun diye async kullanıldı..

    const optionsProfiller  = await getOptions(config.URL_GET_PROFILLER);
    const optionsBirimler   = await getOptions(config.URL_GET_BIRIMLER);
    const optionsKV         = await getOptions(config.URL_GET_KV);

    await this.setState({optionsProfiller, optionsBirimler, optionsKV }, this.refreshStoreData()) //callback func

    await store.dispatch(updateStoreMode('DEFAULT'))

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this.setState( {isLoading: false, didMount: false} )
  }



  handleSubmit= async (event)=>{
    event.preventDefault();
    const {URL_ADD, profil_pidm, birim_pidm, kv_values}= this.state;
    const data = await kv_values.map(item=>item) //convert [array] to [{json}] for data post
    const params = await {profil_pidm, birim_pidm, data}
    console.log('inserted successfully')

    try {
        const config = { headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'}
    }
        await axios.post(URL_ADD, params, config)
        await this.setState({ error: false, profil_value:0, birim_value:0, kv_values:[], success:true })
        await this.refreshStoreData()
    } catch (err) {
          console.log("Hata!",err);
          this.setState({ error: true })
    }

  }


  AddButton= () =>{
    return <div><Icon name="check circle"
                  link
                  size="big"
                  color="blue"
                  onClick={this.handleSubmit}
              /></div>
  }

  // AddKVButton= () =>{
  //   return <div><Icon name="add circle"
  //                 link
  //                 size="large"
  //                 color="olive"
  //                 onClick={this.handleSubmitKV}
  //             /></div>
  // }

  handleChangeProfil = (event, data) => {
    event.preventDefault()
    const profil_pidm = data.value //dropdown için data value kullan
    const error = false
    const success = false
    const profil_value = data.value
    this.setState({ profil_pidm, profil_value, error, success });
  }

  handleChangeBirim = (event, data) => {
    event.preventDefault()
    const birim_pidm = data.value
    const error = false
    const success = false
    const birim_value = data.value
    this.setState({ birim_pidm, birim_value, error, success })

  }

  handleChangeSelected = async (event, data) => {
    event.preventDefault();
    const error= false
    const success = false
    const kv_values = data.value //[array] formatındadır. post ederken [{json}] formatına dönüştürülmeli
    await this.setState({ kv_values, error, success });
  }

  RenderTableForm=()=> {
    const cellStyle= {overflow: 'visible', backgroundColor: '#fff'}
    return <Table.Row>
              <Table.Cell style={cellStyle}>
                      <Dropdown id="id_profil"
                                placeholder="profiller"
                                fluid search selection
                                options={this.state.optionsProfiller}
                                onChange={this.handleChangeProfil}
                                value = {this.state.success?null:this.state.profil_value}
                                />
              </Table.Cell>
              <Table.Cell style={cellStyle}>
                      <Dropdown id="id_birim"
                                placeholder="birimler"
                                fluid search selection
                                options={this.state.optionsBirimler}
                                onChange={this.handleChangeBirim}
                                value = {this.state.success?null:this.state.birim_value}
                                />
              </Table.Cell>
              <Table.Cell style={cellStyle}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <Dropdown id="id_kv"
                                placeholder="kv"
                                fluid multiple search selection
                                options={this.state.optionsKV}
                                onChange={this.handleChangeSelected}
                                value={this.state.kv_values}
                      />
                      <this.AddButton />
                  </div>
              </Table.Cell>
            </Table.Row>
  }

  DataCell = (props) => {
  const {rowPidm, data} = props

  return <div>
      {JSON.stringify(data)==="[]"?null:
                       data.map( ({pidm, name }) => ( //related_item_name: api tarafında kurumlar, toplamakanallari ve kullanilansistemler için tek bir common api yazıldığı için: ordan gelen kolon adıdır
                      // related_item_pidm yerine pidm kullanıldu çünkü: tablodaki unique kayıt pidmine ihtiyaç var..
                        <LabelBox
                            key={pidm} //every child must have a unique key
                            rowPidm = {rowPidm} //row pidm for updating particulary this record
                            selectedPidm={pidm} //remove this item from selected KV's
                            name={name} //printing name on screen for onClick this name
                            store={store} //for refreshStoreData
                            dataCell = {data.map(({pidm})=>pidm)} //işaretli hücrenin içindeki datayı sildikten sonra güncelleyip db'ye basmak için...
                        />

                        ))}

                            <AddBox
                                rowPidm={rowPidm} //update edilecek pidm
                                store={store}
                                dataCell = {data.map(({pidm})=>pidm)}
                            />
      </div>
  }

  RenderTable=()=> {
    const { data } = this.props; //data > from reducer
    const headerBGColor = "#f3f3f3"

    return (
      <div className="kvkk-content">
        <h2 className="ui header">KV Profil</h2>

        {this.state.error?<MyMessage error header="Kayıt hatası!" content="Lütfen ağ bağlantınızı kontrol edin." />:null}
        {this.state.success?<MyMessage success content="Başarı ile kaydedildi." />:null}

        <Table
          sortable
          celled
          fixed
          compact='very'
          size="small"
          style={{ width: "100%" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "30%", backgroundColor:headerBGColor }}> PROFIL</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "30%", backgroundColor:headerBGColor }}> SÜREÇ SAHİBİ</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "40%", backgroundColor:headerBGColor }}> KİŞİSEL VERİ</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            <this.RenderTableForm />

           {_.size(data)===0?null:
           data.map((key) => (
              <Table.Row key={key.pidm}>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.profil_name}</Table.Cell>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.birim_name}</Table.Cell>
                {/* Kişisel Veriler Hücresi */}
                <Table.Cell style={{ verticalAlign: 'top' }} >
                    <this.DataCell rowPidm={key.pidm} data={key.data} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }


  render() {
    const { isLoading, apiIsOnline } = this.state;
    return (

      <KVKKLayout>
        {
         !isLoading && apiIsOnline? <this.RenderTable />:
          !isLoading&&!apiIsOnline? <Message error header='API Bağlantı Hatası' content='Veriye erişilemiyor...' />:
            <MyLoader />
        }

      </KVKKLayout>

    );
  }
}


const mapStateToProps = state => ({ data: state.data, mode: state.mode });
export default connect(mapStateToProps)(KVProfil);
