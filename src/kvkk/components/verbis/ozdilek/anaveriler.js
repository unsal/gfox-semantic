import React, { PureComponent } from "react";
import { Table, Dropdown, Header, Button, Label, Icon } from "semantic-ui-react";
import KVKKLayout from "../../../layout";
import Login from '../../../../auth/login'
import axios from "axios";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";
// import axios from "axios";

//ISLEME AMACLARI

import { config } from "../../../../config";
import {LoadingStoreData, createDropdownOptions, refreshStoreData}  from '../../myComponents'

class Anaveriler extends PureComponent {
  state = {
    mounted: false,
    addMode: false,
    deleteMode: false
  }


  async componentDidMount() {
    const OPTIONS_PROFILLER = await createDropdownOptions(config.URL_GET_PROFILLER, this.props.cid)
    const OPTIONS_SURECLER = await createDropdownOptions(config.URL_GET_SURECLERDD, this.props.cid)
    const OPTIONS_KV = await createDropdownOptions(config.URL_GET_KV, this.props.cid)
    const OPTIONS_SURELER = await createDropdownOptions(config.URL_GET_SURELER, this.props.cid)
    const OPTIONS_KANALLAR = await createDropdownOptions(config.URL_GET_KANALLAR, this.props.cid)
    const OPTIONS_SISTEMLER = await createDropdownOptions(config.URL_GET_SISTEMLER, this.props.cid)
    const OPTIONS_DAYANAKLAR = await createDropdownOptions(config.URL_GET_DAYANAKLAR, this.props.cid)
    const OPTIONS_ORTAMLAR = await createDropdownOptions(config.URL_GET_ORTAMLAR, this.props.cid)
    const OPTIONS_TEDBIRLER = await createDropdownOptions(config.URL_GET_TEDBIRLER, this.props.cid)
    const OPTIONS_ISLEMEAMACLARI = await createDropdownOptions(config.URL_GET_ISLEMEAMACLARI, this.props.cid)

    await this.setState({
      mounted: true,
      OPTIONS_PROFILLER,
      OPTIONS_SURECLER,  OPTIONS_KV, OPTIONS_SURELER, OPTIONS_KANALLAR,
      OPTIONS_SISTEMLER, OPTIONS_DAYANAKLAR, OPTIONS_ORTAMLAR, OPTIONS_TEDBIRLER, OPTIONS_ISLEMEAMACLARI
    })
  }


  TableHeader=()=> (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ width: "14%", verticalAlign: "TOP" }}> KİŞİ GRUBU</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "13%", verticalAlign: "TOP" }}> İLGİLİ SÜREÇ</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP" }}> KİŞİSEL VERİ</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "3%", verticalAlign: "TOP" }}> SAKLAMA SÜRESİ</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP" }}> GİRİŞ KANALI</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP" }}> KULLANILAN SİSTEM</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP" }}> HUKUKİ DAYANAK</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP" }}> İŞLEME AMACI</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP" }}> SAKLAMA ORTAMLARI</Table.HeaderCell>
          <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP" }}> GÜVENLİK TEDBİRLERİ</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
  )

  MyDropdown = ({options, multiple}) => (
    <Dropdown
      multiple={multiple}
      compact
      search selection
      fluid // sağa doğru uzar
      options={options}
      // onChange={onChangeEvent}
    />
  )

  DropdownProfiller = () => <this.MyDropdown options={this.state.OPTIONS_PROFILLER} multiple={false} />
  DropdownSurecler = () => <this.MyDropdown options={this.state.OPTIONS_SURECLER} multiple={false} />
  DropdownKV = () => <this.MyDropdown options={this.state.OPTIONS_KV} multiple={false} />
  DropdownSureler = () => <this.MyDropdown options={this.state.OPTIONS_SURELER} multiple={false} />
  DropdownKanallar = () => <this.MyDropdown options={this.state.OPTIONS_KANALLAR} multiple={false} />
  DropdownSistemler = () => <this.MyDropdown options={this.state.OPTIONS_SISTEMLER} multiple={false} />
  DropdownDayanaklar = () => <this.MyDropdown options={this.state.OPTIONS_DAYANAKLAR} multiple={false} />
  DropdownOrtamlar = () => <this.MyDropdown options={this.state.OPTIONS_ORTAMLAR} multiple={true} />
  DropdownTedbirler = () => <this.MyDropdown options={this.state.OPTIONS_TEDBIRLER} multiple={true} />
  DropdownIslemeAmaci = () => <this.MyDropdown options={this.state.OPTIONS_ISLEMEAMACLARI} multiple={false} />


  cellStyle = { verticalAlign: 'top'}

  TableForm = () => (
   <Table.Row  key="0" >
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_PROFILLER} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_SURECLER} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_KV} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_SURELER} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_KANALLAR} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_SISTEMLER} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_DAYANAKLAR} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_ISLEMEAMACLARI} multiple={false} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_ORTAMLAR} multiple={true} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><this.MyDropdown options={this.state.OPTIONS_TEDBIRLER} multiple={true} /></Table.Cell>
    </Table.Row>
  )

//id-> selected data id (ortamlar, tedbirler), anaveri pidm->silmek için, data
  ParseData = ({ id, pidm, data }) => {

    const style = { display: 'block', marginTop: '3px' }

    return data && data.map((row, index) => {

      const content = row.name.substring(0, 10) + "..."
      const onDelete = (this.state.deleteMode && (this.state.selectedDataPidm === row.pidm) && (this.state.selectedPidm === pidm) && (this.state.selectedID === id))
      const onRemove = () => this.setState({ deleteMode: true, selectedID: id, selectedPidm: pidm, selectedDataPidm: row.pidm, selectedData: data })

      return <div key={index} style={style}>
                <Label
                  content={content}
                  color={onDelete?'red':'teal'}
                  onRemove={onRemove}
                />
                {onDelete && <this.DeleteBox />}
              </div>
    }
    )
  }

  TableRows= ({data})=> (
    <React.Fragment>
           {data&&data.map((key, index) => (
              <Table.Row  key={index} >
                <Table.Cell style={this.cellStyle}>{key.profil_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}>{key.surec_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}>{key.kv_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}>{key.sure_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}>{key.kanal_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}>{key.sistem_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}>{key.dayanak_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}>{key.isleme_amaclari_name}</Table.Cell>
                <Table.Cell style={this.cellStyle}><this.ParseData id="ortamlar" pidm= {key.pidm} data={key.ortamlar_data}/></Table.Cell>
                <Table.Cell style={this.cellStyle}><this.ParseData id="tedbirler" pidm= {key.pidm} data={key.tedbirler_data}/></Table.Cell>
              </Table.Row>
            ))}
    </React.Fragment>
  )

     //(x)(v)
  DeleteBox = () => {
  return <div style={{ display: 'inline-block' }}>
             <Icon  // (v)
                  link
                  name="check circle"
                  size="large"
                  color="red"
                  onClick={this.handleDelete}
                />
              <Icon   //(x)
                link
                name="dont"
                size="large"
                color="grey"
                onClick={this.handleClose}
                />
            </div>
  }

handleClose = ()=>{
    this.setState({ deleteMode: false })
}

removedData = async ()=>{
  //remove item from array and update it..
    const {selectedDataPidm, selectedData} = this.state
    let newData = []

    await selectedData && selectedData.map (
             ({pidm, name}) => (selectedDataPidm !== pidm) && newData.push(pidm)
    )

    return await (newData)

  }


  handleDelete = async (event) => {
    event.preventDefault();

    const { cid, uid } = this.props
    const id = this.state.selectedID
    const pidm = this.state.selectedPidm
    let data = await this.removedData() //remove selected pidm from data

    const params = await { id, pidm, data, cid, uid }

    try {
      await axios.post(config.URL_UPDATE_ANAVERILER, params, config.axios)
      await refreshStoreData(store, this.props.cid, config.URL_GET_ANAVERILER)
      await this.setState({ deleteMode: false })
    } catch (err) {
      console.log(id + " data delete error", err);
    }
  };

  AddButton=()=>{
    return  this.state.addMode?
            <div><Button size='mini' content='VAZGEÇ' onClick={()=>this.setState({addMode: false})} /><Button color='blue' size='mini' content='EKLE' /></div>
            :<Button size='mini' content='YENİ KAYIT' onClick={()=>this.setState({addMode: true})} />
  }

  Content = () => {
    const { data } = this.props; //data > from reducer

    return (
      <div className="kvkk-content-kv">

      <div>
          <Header size='large' style={{float: 'left'}}>Ana Veri Girişi</Header>
          <div style={{float: 'right'}}><this.AddButton /></div>
      </div>
        <Table celled>
          <this.TableHeader />
          <Table.Body>
            {this.state.addMode && <this.TableForm />}
            <this.TableRows data={data} />
          </Table.Body>
        </Table>
      </div>
    )
  }

  render() {
    const {cid} = this.props
    const url = config.URL_GET_ANAVERILER
    return (
      <Login>
        <KVKKLayout>
          <LoadingStoreData cid={cid} url={url}>
              <this.Content />
          </LoadingStoreData>
       </KVKKLayout>
      </Login>
    );
  }

}


const mapStateToProps = state => ({ data: state.data, cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(Anaveriler);
