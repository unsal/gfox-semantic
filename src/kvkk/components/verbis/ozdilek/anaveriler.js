import React, { PureComponent } from "react";
import { Table, Dropdown, Header, Button, Label, Icon, Modal } from "semantic-ui-react";
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
    URL_GET: config.URL_ANAVERILER+"/get",
    URL_COMMIT: config.URL_ANAVERILER,

    mounted: false,
    addMode: false,
    deleteMode: false,
    editMode: false,
    fields: ['profil_pidm', 'surec_pidm', 'kv_pidm', 'sure_pidm',
                    'kanallar_data','sistemler_data', 'dayanaklar_data', 'isleme_amaclari_data',
                    'ortamlar_data', 'tedbirler_data'],
    primary: ['profil_pidm','surec_pidm','kv_pidm'], //boş geçilemez alanların error kontrolü için

    //content table properties
    singleLine: true, //content>table>tek satır kontrolü için
    fixed: true,
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
        <Table.HeaderCell style={{ width: "13%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }} > PROFİL <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "12%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SÜREÇ <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> KV <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "5%",  verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SÜRESİ</Table.HeaderCell>
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
    const pidm = row.pidm
    const {convert} = this
    this.setState({ editMode: true, addMode: false, fixed: false, singleLine: false,
                    pidm})
    //data içeren alanları dropdowna uygun arraye convert ederek atar diğerlerine normal olarak.
    this.state.fields.map(item => item.includes('_data')?this.setState({[item]:convert(row[item])}):
                                                         this.setState({[item]:row[item]}))
  }

  DataTitle = (props) =>
    <Header
        as='h5'
        onClick={()=>this.handleEdit(props.row)}
    >{props.children}</Header>


//id-> selected data id (ortamlar, tedbirler), anaveri pidm->silmek için, data
  DataTitles = ({ row, data, color }) => {
    const style = { display:'block', marginTop: '2px', marginLeft:'3px'  }
    return data && data.map((item, index) => {
                        const content = item.name ? item.name:<Icon name='ellipsis horizontal' />
                        // row.name && console.log(JSON.stringify(data))
                        return <div key={index} style={style}>
                                  <Label
                                    content={content}
                                    color={color}
                                    onClick = {()=>this.handleEdit(row)}
                                  />
                                </div>
                      }
                      )
  }

  handleChange = (event, data) => {
    event.preventDefault()
    const {name, value} =  data
    this.setState({ [name]: value })
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

    //primary key alanlar için hata kontrolü yapar
    const isPrimary = this.state.primary.indexOf(name)>=0

    return <Dropdown
                  name = {name}
                  value={this.state[name]}
                  multiple={name.includes("_data")}
                  search selection
                  fluid // sağa doğru uzar
                  options={options[name]}
                  onChange={this.handleChange}
                  error = { isPrimary && error}
            />
  }


  styleEdit = { verticalAlign: 'top', margin:'0px', padding:'2px'}
  EditRow = () =>
          <Table.Row>
              {this.state.fields.map( (item, index) => <Table.Cell key={index} style={this.styleEdit} selectable warning><this.MyDropdown name={item} /></Table.Cell> )}
          </Table.Row>


  styleView = { verticalAlign: 'top', margin:'0px'}
  ViewRow = ({ row }) => {
    const {DataTitle, DataTitles} = this
    // console.log('tedbirler', row.tedbirler_data)

    return <Table.Row >
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.profil_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.surec_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.kv_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.sure_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='blue' data={row.kanallar_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='teal' data={row.sistemler_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='green' data={row.dayanaklar_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='olive' data={row.isleme_amaclari_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='yellow' data={row.ortamlar_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='orange' data={row.tedbirler_data} /></Table.Cell>
    </Table.Row>

  }

  TableRows = ({ data }) => {
    return data && data.map((row, index) => (
        this.state.editMode && (this.state.pidm === row.pidm) ?
          <this.EditRow row={row} key={index}/> :
          <this.ViewRow row={row} key={index} />
        // !this.state.editMode && <this.ViewRow row={row} key={index} />
      ))
  }

TableForm = () =>
    <Table.Row key="0">
      {this.state.fields.map( (item, index) =>
        <Table.Cell key={index} style={this.styleView} ><this.MyDropdown name={item} error={this.state.message} /> </Table.Cell>
      )}
    </Table.Row>


  handleClose = () => {
    this.setState({ deleteMode: false })
  }

  handleReset = () =>
                  this.state.fields.map(item =>
                      item.includes('_data')?this.setState({[item]:[]}):this.setState({[item]:null})
              )

  handleCommit = async(type) => {
    const {pidm, profil_pidm, surec_pidm, kv_pidm, sure_pidm, kanallar_data, sistemler_data, dayanaklar_data,
            isleme_amaclari_data, ortamlar_data, tedbirler_data} = this.state
    const {cid, uid} = this.props

    const params = {pidm, profil_pidm, surec_pidm, kv_pidm, sure_pidm, kanallar_data, sistemler_data, dayanaklar_data,
                    isleme_amaclari_data, ortamlar_data, tedbirler_data, cid, uid}

    try {
        const URL_COMMIT = this.state.URL_COMMIT+"/"+type  // /add or /update

        await axios.post(URL_COMMIT, params, config.axios)

        await this.setState({ addMode: false, editMode: false, message: null, open: false , fixed: true, singleLine:true }) //open SilBox mesaj kutusu sildikten sonra açılmasın içindir.
        await this.handleReset()
        await refreshStoreData(store, cid, this.state.URL_GET)

    } catch (err) {
          this.setState({ message: 'Kırmızı ile işaretlenmiş zorunlu alanları girmelisiniz!'})
          setTimeout(() => { this.setState({ message: null }) }, 3000) //mesajı tekrar tıklandığında göstermek için
    }
  };

  handleYeni = (event) => {
    event.preventDefault()
    this.handleReset()
    this.setState({addMode: true, editMode:false, message: null, fixed:false, singleLine: false})

  }

  handleKopyala = (event) => {
    event.preventDefault()
    this.setState({copy: this.state, copyMode: true, editMode: false})
  }

  handleYapistir = (event) => {
    event.preventDefault()
    const {copy, fields} = this.state

    fields.map(item => this.setState({[item]:copy[item]}))

  }


  AddButton=()=>{

    const style = { float: 'right'}
    const styleGroup = { float: 'right', marginRight:"50px"}

    const EkleButon = () =>  <Button style={style} color='blue' size='mini' onClick={()=>this.handleCommit("add")}>EKLE</Button>
    const GuncelleButon = () =>  <Button style={style} color='teal' size='mini' onClick={()=>this.handleCommit("update")}>GÜNCELLE </Button>
    // const SilButon = () =>  <Button style={style} color='red' size='mini' onClick={()=>this.handleCommit("delete")}>SİL </Button>
    const {SilButon} = this
    const VazgecButon = () =>  <Button style={style} size='mini' content='VAZGEÇ' onClick={()=>this.setState({addMode: false, editMode: false, message: null, fixed: true, singleLine: true})} />
    const YeniKayitButon = () => <Button style={style} color='teal' size='mini' content='YENİ KAYIT' onClick={this.handleYeni} />
    const KopyalaButon = () =>  <Button style={style} basic color='teal' circular icon="copy outline" size='mini'  onClick={this.handleKopyala} />
    const YapistirButon = () =>  <Button style={style} basic color='teal' circular icon="paste" size='mini' onClick={this.handleYapistir} />
    const ResetButon = () =>  <Button style={style} basic color='teal' circular icon="cut" size='mini' onClick={this.handleReset} />
    const SingleLineButon = () =>  <Button style={style} basic color='teal' circular icon={this.state.singleLine?"eye":"eye slash outline"} size='mini' onClick={()=>this.setState({singleLine: !this.state.singleLine})} />

    return  <div>
                {this.state.addMode? <div> <EkleButon /> <VazgecButon /> </div>
                                   :this.state.editMode?<div> <GuncelleButon /><VazgecButon /><div style={styleGroup}><SilButon /></div></div>
                                                       :<YeniKayitButon />
                }
                <div style={styleGroup}><YapistirButon /><KopyalaButon /><ResetButon /><SingleLineButon /></div>
            </div>
  }

  SilButon = () => {
    const show = () => this.setState({ open: true })
    const close = () => this.setState({ open: false })
    const commit = () => this.handleCommit("delete")
    const style = { float: 'right' }

    return <div>
      <Button style={style} size="mini" color="red" onClick={show}>SİL</Button>

      <Modal size="mini" open={this.state.open} onClose={this.close}>
        <Modal.Header>Silme Onayı</Modal.Header>
        <Modal.Content>
          <p>İşaretli kaydı silmek istediğinizden emin misiniz?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close}>VAZGEÇ</Button>
          <Button negative content='EVET'
                  onClick={commit}
          />
        </Modal.Actions>
      </Modal>

    </div>
  }


  Content = () => {
    const { data } = this.props; //data > from reducer

    return (
      <div className="kvkk-content">

          <div>
              <Header size='large' style={{float: 'left', width:'20%'}}><Icon name="shield alternate" color="teal" />Ana Veriler</Header>
              <div style={{float: 'right', width:'80%'}}><this.AddButton /></div>
          </div>
          <div>{this.state.message && <MyMessage error content={this.state.message} />}</div>
            <Table celled striped color="teal" fixed={this.state.fixed} stackable selectable singleLine={this.state.singleLine} >
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
    const url = this.state.URL_GET
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
