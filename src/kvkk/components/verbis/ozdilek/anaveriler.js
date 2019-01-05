import React, { PureComponent } from "react";
import { Table, Dropdown, Header, Button, Label, Icon } from "semantic-ui-react";
import KVKKLayout from "../../../layout";
import Login from '../../../../auth/login'
import axios from "axios";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";

import { config } from "../../../../config";
import {LoadingStoreData, createDropdownOptions, refreshStoreData, MyMessage}  from '../../myComponents'

class Anaveriler extends PureComponent {
  state = {
    mounted: false,
    addMode: false,
    deleteMode: false,
    editMode: false,
    copyMode: false,
    fields: ['profil_pidm', 'surec_pidm', 'kv_pidm', 'sure_pidm',
                    'kanallar_data','sistemler_data', 'dayanaklar_data', 'isleme_amaclari_data',
                    'ortamlar_data', 'tedbirler_data']
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


  TableHeader=()=> {
    const Required = () => <Icon name="asterisk" size="small" color="red" />
    return <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{ width: "14%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }} > PROFİL <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "13%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SÜREÇ <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> KV <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "3%",  verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SÜRESİ</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> KANALLAR</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SİSTEMLER</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> DAYANAKLAR</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> İŞL.AMAÇLARI</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> ORTAMLAR</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> TEDBİRLER</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  }

  //convert data to array:[{pidm, name}] -> [x,y] for dropdown component
  convert=(value)=> {
     let newValue = []
     value && value.map( key => newValue.push(key.pidm))
     return newValue
  }

  handleEdit =  (row) => {
    const selectedPidm = row.pidm
    const {convert} = this
    this.setState({ editMode: true, addMode: false,
                    selectedPidm})
    //data içeren alanları dropdowna uygun arraye convert ederek atar diğerlerine normal olarak.
    this.state.fields.map(item => item.includes('_data')?this.setState({[item]:convert(row[item])}):
                                                         this.setState({[item]:row[item]}))
  }
  // handleEdit =  (row) => {
  //   const selectedPidm = row.pidm
  //   const {profil_pidm, surec_pidm, kv_pidm, sure_pidm} = row

  //   const {convert} = this
  //   const kanallar_data = convert(row.kanallar_data)
  //   const sistemler_data = convert(row.sistemler_data)
  //   const dayanaklar_data = convert(row.dayanaklar_data)
  //   const isleme_amaclari_data = convert(row.isleme_amaclari_data)
  //   const ortamlar_data = convert(row.ortamlar_data)
  //   const tedbirler_data = convert(row.tedbirler_data)

  //   this.setState({ editMode: true, addMode: false,
  //                   selectedPidm,
  //                   profil_pidm, surec_pidm, kv_pidm,
  //                   sure_pidm,
  //                   kanallar_data, sistemler_data , dayanaklar_data, isleme_amaclari_data, ortamlar_data, tedbirler_data })
  // }

  DataTitle = (props) =>
    <Header
        as='h5'
        onClick={()=>this.handleEdit(props.row)}
    >{props.children}</Header>


//id-> selected data id (ortamlar, tedbirler), anaveri pidm->silmek için, data
  DataTitles = ({ id, pidm, data, color }) => {

    const style = { display: 'block', marginTop: '3px' }

    return data && data.map((row, index) => {

      const content = row.name ? row.name.substring(0, 10) + "..":<Icon name='ellipsis horizontal' />
      const onDelete = (this.state.deleteMode && (this.state.selectedDataPidm === row.pidm) && (this.state.selectedPidm === pidm) && (this.state.selectedID === id))
      const onRemove = () => this.setState({ deleteMode: true, selectedID: id, selectedPidm: pidm, selectedDataPidm: row.pidm, selectedData: data })

      return <div key={index} style={style}>
                <Label
                  content={content}
                  color={onDelete?'red':color}
                  onRemove={onRemove}
                />
                {onDelete && <this.DeleteBox />}
              </div>
    }
    )
  }

  handleChange = (event, data) => {
    event.preventDefault()
    const {name, value} =  data
    this.setState({ [name]: value, [name+'Changed']: true })
  }

  MyDropdown =  ({name, error}) => {

    const options = {'profil_pidm': this.state.OPTIONS_PROFILLER,
                 'surec_pidm': this.state.OPTIONS_SURECLER,
                 'kv_pidm': this.state.OPTIONS_KV,
                 'sure_pidm': this.state.OPTIONS_SURELER ,
                 'kanallar_data': this.state.OPTIONS_KANALLAR,
                 'sistemler_data': this.state.OPTIONS_SISTEMLER,
                 'dayanaklar_data': this.state.OPTIONS_DAYANAKLAR,
                 'isleme_amaclari_data': this.state.OPTIONS_ISLEMEAMACLARI,
                 'ortamlar_data': this.state.OPTIONS_ORTAMLAR,
                 'tedbirler_data': this.state.OPTIONS_TEDBIRLER
              }

    return <Dropdown
                  name = {name}
                  value={this.state[name]}
                  multiple={name.includes("_data")}
                  search selection
                  fluid // sağa doğru uzar
                  options={options[name]}
                  onChange={this.handleChange}
                  error = {error}
            />
  }

  EditRow = ({row}) => {
    const {MyDropdown} = this

    return <Table.Row >
      <Table.Cell style={this.cellStyle}><MyDropdown name="profil_pidm" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="surec_pidm" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="kv_pidm" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="sure_pidm" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="kanallar_data" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="sistemler_data" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="dayanaklar_data" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="isleme_amaclari_data" /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="ortamlar_data"  /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="tedbirler_data"  /></Table.Cell>
    </Table.Row>
  }

  // getStateData=(value)=>{
  //   let data = []
  //   value.map( key => data.push(key.pidm) )
  //   return data
  // }

  ViewRow = ({ row }) => {
    const {DataTitle, DataTitles} = this

    return <Table.Row >
      <Table.Cell style={this.cellStyle}><DataTitle row={row}>{row.profil_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitle row={row}>{row.surec_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitle row={row}>{row.kv_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitle row={row}>{row.sure_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitles color='blue' id="kanallar" pidm={row.pidm} data={row.kanallar_data} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitles color='teal' id="sistemler" pidm={row.pidm} data={row.sistemler_data} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitles color='green' id="dayanaklar" pidm={row.pidm} data={row.dayanaklar_data} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitles color='olive' id="isleme_amaclari" pidm={row.pidm} data={row.isleme_amaclari_data} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitles color='yellow' id="ortamlar" pidm={row.pidm} data={row.ortamlar_data} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><DataTitles color='orange' id="tedbirler" pidm={row.pidm} data={row.tedbirler_data} /></Table.Cell>
    </Table.Row>

  }

  TableRows = ({ data }) => {
    return data && data.map((row, index) => (
        this.state.editMode && (this.state.selectedPidm === row.pidm) ?
          <this.EditRow row={row} key={index}/> :
          <this.ViewRow row={row} key={index} />
      ))
  }

     //(x)(v)
  DeleteBox = () => {
  return <div style={{ display: 'inline-block' }}>
              <Icon   //(x)
                link
                name="dont"
                size="large"
                color="grey"
                onClick={this.handleClose}
                />
             <Icon  // (v)
                  link
                  name="check circle"
                  size="large"
                  color="red"
                  onClick={this.handleDelete}
                />
            </div>
  }

    // FORM **********************************
    cellStyle = { verticalAlign: 'top'}

    TableForm = () => {
    const MyDropdown = this.MyDropdown
    return <Table.Row  key="0">
        <Table.Cell style={this.cellStyle} > <MyDropdown name="profil_pidm" error={this.state.message}/> </Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="surec_pidm" error={this.state.message} /></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="kv_pidm" error={this.state.message} /></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="sure_pidm"  error={false}/></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="kanallar_data"  error={false}/></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="sistemler_data" error={false}/></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="dayanaklar_data" error={false}/></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="isleme_amaclari_data" error={false}/></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="ortamlar_data" error={false}/></Table.Cell>
        <Table.Cell style={this.cellStyle}><MyDropdown name="tedbirler_data" error={false}/></Table.Cell>
      </Table.Row>
    }

handleClose = ()=>{
    this.setState({ deleteMode: false })
}

removedData = async ()=>{
  //remove item from array and update it..
    const {selectedDataPidm, selectedData} = this.state
    let newData = []

    await selectedData && selectedData.map (
             ({pidm}) => (selectedDataPidm !== pidm) && newData.push(pidm)
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

  resetValues = () =>
    this.setState (
      {
          profil_pidm: null,
          surec_pidm: null,
          kv_pidm: null,
          sure_pidm: null,
          kanallar_data: [],
          sistemler_data: [],
          dayanaklar_data: [],
          isleme_amaclari_data: [],
          ortamlar_data: [],
          tedbirler_data: []
      }
    )


  handleSubmit = async() => {

    const {profil_pidm, surec_pidm, kv_pidm, sure_pidm, kanallar_data, sistemler_data, dayanaklar_data,
            isleme_amaclari_data, ortamlar_data, tedbirler_data} = this.state
    const {cid, uid} = this.props

    const params = {profil_pidm, surec_pidm, kv_pidm, sure_pidm, kanallar_data, sistemler_data, dayanaklar_data,
                    isleme_amaclari_data, ortamlar_data, tedbirler_data, cid, uid}

    try {
        await axios.post(config.URL_ADD_ANAVERILER, params, config.axios)

        await this.setState({ addMode: false, message: null  })
        await this.resetValues()
        await refreshStoreData(store, cid, config.URL_GET_ANAVERILER)

    } catch (err) {
          this.setState({ message: 'Kırmızı ile işaretlenmiş zorunlu alanları girmelisiniz!'})
          setTimeout(() => { this.setState({ message: null }) }, 3000) //mesajı tekrar tıklandığında göstermek için
    }
  };

  handleYeni = (event) => {
    event.preventDefault()
    this.resetValues()
    this.setState({addMode: true, editMode:false, message: null})

  }

  handleKopyala = (event) => {
    event.preventDefault()
    this.setState({copy: this.state, copyMode: true})
  }

  handleYapistir = (event) => {
    event.preventDefault()
    const {copy, fields} = this.state

    fields.map(item => this.setState({[item]:copy[item]}))

  }


  AddButton=()=>{
    const VazgecButon = () =>  <Button size='mini' content='VAZGEÇ' onClick={()=>this.setState({addMode: false, editMode: false, message: null})} />
    const EkleButon = () =>  <Button color='blue' size='mini' content='EKLE' onClick={this.handleSubmit}/>
    const YeniKayitButon = () => <Button color='teal' size='mini' content='YENİ KAYIT' onClick={this.handleYeni} />
    const KopyalaButon = () =>  <Button basic style={{marginRight:"20px"}} color='black' size='mini'  onClick={this.handleKopyala}><Icon name='copy outline' />KOPYALA</Button>
    const YapistirButon = () =>  <Button basic style={{marginRight:"20px"}} color='black' size='mini' onClick={this.handleYapistir}><Icon name='paste' />YAPIŞTIR </Button>

    return  this.state.addMode?
            <div>
                {this.state.copyMode && <YapistirButon />}
                <VazgecButon />
                <EkleButon />
            </div>
            :this.state.editMode?<div><KopyalaButon /><VazgecButon /></div>
            :<YeniKayitButon />
  }



  Content = () => {
    const { data } = this.props; //data > from reducer

    return (
      <div className="kvkk-content-kv">

          <div>
              <Header size='large' style={{float: 'left'}}>Ana Veri Girişi</Header>
              <div style={{float: 'right'}}><this.AddButton /></div>
          </div>
          <div>{this.state.message && <MyMessage error content={this.state.message} />}</div>
            <Table celled striped color="teal" >
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
