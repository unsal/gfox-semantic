import React, { PureComponent } from "react";
import { Table, Dropdown, Header, Button, Label, Icon, Modal, Input, Checkbox } from "semantic-ui-react";
import KVKKLayout from "../../../layout";
import Login from '../../../../auth/login'
import axios from "axios";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";

import { config } from "../../../../config";
import {LoadingStoreData, createDropdownOptions, refreshStoreData, MyMessage}  from '../../myComponents'

class Aktarimlar extends PureComponent {
  state = {
    URL_GET: config.URL_AKTARIMLAR+"/get",
    URL_COMMIT: config.URL_AKTARIMLAR,

    mounted: false,
    addMode: false,
    deleteMode: false,
    editMode: false,
    fields: ['surec_pidm', 'kv_pidm', 'kurum_pidm',
                    'ulkeler_data','dayanaklar_data', 'paylasim_amaclari_data', 'paylasim_sekilleri_data',
                    'yurtdisi', 'aciklama','bilgiveren'],
    primary: ['surec_pidm','kv_pidm','kurum_pidm'], //boş geçilemez alanların error kontrolü için

    //content table properties
    singleLine: true, //content>table>tek satır kontrolü için
    fixed: true,
  }


  async componentDidMount() {
    const OPTIONS_SURECLER = await createDropdownOptions(config.URL_GET_SURECLERDD, this.props.cid)
    const OPTIONS_KV = await createDropdownOptions(config.URL_GET_KV, this.props.cid)
    const OPTIONS_KURUMLAR = await createDropdownOptions(config.URL_GET_KURUMLAR, this.props.cid)
    const OPTIONS_ULKELER = await createDropdownOptions(config.URL_GET_ULKELER, this.props.cid)
    const OPTIONS_DAYANAKLAR = await createDropdownOptions(config.URL_GET_DAYANAKLAR, this.props.cid)
    const OPTIONS_PAYLASIMAMACLARI = await createDropdownOptions(config.URL_GET_PAYLASIMAMACLARI, this.props.cid)
    const OPTIONS_PAYLASIMSEKILLERI = await createDropdownOptions(config.URL_GET_PAYLASIMSEKILLERI, this.props.cid)

    await this.setState({
      mounted: true,
      OPTIONS_SURECLER,  OPTIONS_KV, OPTIONS_KURUMLAR,
      OPTIONS_ULKELER, OPTIONS_DAYANAKLAR, OPTIONS_PAYLASIMAMACLARI, OPTIONS_PAYLASIMSEKILLERI
    })

  }


  TableHeader=()=> {
    const Required = () => <Icon name="asterisk" size="small" color="red" />
    return <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{ width: "12%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SÜREÇ <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> KV <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "5%",  verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> KURUM</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> ÜLKELER</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> DAYANAKLAR</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> PAYLAŞIM AMAÇLARI</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> PAYLAŞIM ŞEKİLLERİ</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> YURT DIŞI</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> AÇIKLAMA</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> BİLGİ VEREN</Table.HeaderCell>
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


//id-> selected data id (ortamlar, tedbirler), aktarim pidm->silmek için, data
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

  handleChange = (event, element) => {
    event.preventDefault()
    const {name, value} =  element
    this.setState({ [name]: value })
  }

  // Yurtdışı checkbox için
  handleChecked=(event, { checked }) => {
    this.setState({ yurtdisi: checked});
  }



  MyDropdown = ({name, error}) => {
  const options = {
      'surec_pidm': this.state.OPTIONS_SURECLER,
      'kv_pidm': this.state.OPTIONS_KV,
      'kurum_pidm': this.state.OPTIONS_KURUMLAR ,
      'ulkeler_data': this.state.OPTIONS_ULKELER,
      'dayanaklar_data': this.state.OPTIONS_DAYANAKLAR,
      'paylasim_amaclari_data': this.state.OPTIONS_PAYLASIMAMACLARI,
      'paylasim_sekilleri_data': this.state.OPTIONS_PAYLASIMSEKILLERI,
   }

   const isPrimary = this.state.primary.indexOf(name)>=0

  return <Dropdown
    name={name}
    value={this.state[name]}
    multiple={name.includes("_data")}
    search selection
    fluid // sağa doğru uzar
    options={options[name]}
    onChange={this.handleChange}
    error={isPrimary && error}
  />
  }

  handleKeyDown = (event) => {
    const type= this.state.addMode ==="add"?"add":"update"
    if (event.keyCode===13) {
          this.handleCommit(type)
    } else if (event.keyCode===27) {
           this.handleVazgec()
    }
  }

  MyInput = ({name}) => <Input name={name}
    type='text'
    value={this.state[name] ? this.state[name] : ''}
    onChange={this.handleChange}
    onKeyDown={this.handleKeyDown}
  />

  MyCheckbox = ({name})=> <Checkbox name={name} checked={this.state[name]} toggle onChange={this.handleChecked} />

  MyFormField =  ({name, error}) => {
    switch (name) {
      case "aciklama": return <this.MyInput name={name}/>;
      case "bilgiveren": return <this.MyInput name={name}/>;
      case "yurtdisi": return <this.MyCheckbox name={name}/>
      default: return <this.MyDropdown name={name} error={error}/>
    }
  }


  styleEdit = { verticalAlign: 'top', margin:'0px', padding:'2px'}
  TableEdit = () =>
          <Table.Row>
              {this.state.fields.map( (item, index) => <Table.Cell key={index} style={this.styleEdit} selectable warning><this.MyFormField name={item} /></Table.Cell> )}
          </Table.Row>


  styleView = { verticalAlign: 'top', margin:'0px'}
  TableView = ({ row }) => {
    const {DataTitle, DataTitles} = this
    const yurtdisi = row.yurtdisi && <Icon name='flag checkered' color='green' />
    return <Table.Row >
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.surec_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.kv_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.kurum_name}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='orange' data={row.ulkeler_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='yellow' data={row.dayanaklar_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='olive' data={row.paylasim_amaclari_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitles row={row} color='green' data={row.paylasim_sekilleri_data} /></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{yurtdisi}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.aciklama}</DataTitle></Table.Cell>
      <Table.Cell style={this.styleView}><DataTitle row={row}>{row.bilgiveren}</DataTitle></Table.Cell>
    </Table.Row>

  }

  TableRows = ({ data }) => {
    return data && data.map((row, index) => (
        this.state.editMode && (this.state.pidm === row.pidm) ?
          <this.TableEdit row={row} key={index}/> :
          <this.TableView row={row} key={index} />
      ))
  }

TableForm = () =>
    <Table.Row key="0">
      {this.state.fields.map( (item, index) =>
        <Table.Cell key={index} style={this.styleView} ><this.MyFormField name={item} error={this.state.message} /> </Table.Cell>
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
    //type = add, update
    const {pidm, surec_pidm, kv_pidm, kurum_pidm, ulkeler_data, dayanaklar_data,
            paylasim_amaclari_data, paylasim_sekilleri_data, yurtdisi, aciklama, bilgiveren} = this.state
    const {cid, uid} = this.props

    const params = {pidm, surec_pidm, kv_pidm, kurum_pidm, ulkeler_data, dayanaklar_data,
      paylasim_amaclari_data, paylasim_sekilleri_data, yurtdisi, aciklama, bilgiveren, cid, uid}

    try {
        const URL_COMMIT = this.state.URL_COMMIT+"/"+type  // /add or /update
        // console.log('yurtdışı: ',yurtdisi)

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

  handleVazgec=(event)=>{
    this.setState({addMode: false, editMode: false, message: null, fixed: true, singleLine: true})
  }


  AddButton=()=>{

    const style = { float: 'right'}
    const styleGroup = { float: 'right', marginRight:"50px"}

    const EkleButon = () =>  <Button style={style} color='blue' size='mini' onClick={()=>this.handleCommit("add")}>EKLE</Button>
    const GuncelleButon = () =>  <Button style={style} color='teal' size='mini' onClick={()=>this.handleCommit("update")}>GÜNCELLE </Button>
    // const SilButon = () =>  <Button style={style} color='red' size='mini' onClick={()=>this.handleCommit("delete")}>SİL </Button>
    const {SilButon} = this
    const VazgecButon = () =>  <Button style={style} size='mini' content='VAZGEÇ' onClick={this.handleVazgec} />
    const YeniKayitButon = () => <Button style={style} color='teal' size='mini' content='YENİ KAYIT' onClick={this.handleYeni} />
    const KopyalaButon = () =>  <Button style={style} basic color='teal' circular icon="copy outline" size='mini'  onClick={this.handleKopyala} />
    const YapistirButon = () =>  <Button style={style} basic color='teal' circular icon="paste" size='mini' onClick={this.handleYapistir} />
    const ResetButon = () =>  <Button style={style} basic circular color='teal' icon="cut" size='mini' onClick={this.handleReset} />
    const SingleLineButon = () =>  <Button style={style} basic circular color='teal' icon={this.state.singleLine?"eye":"eye slash outline"} size='mini' onClick={()=>this.setState({singleLine: !this.state.singleLine})} />

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
              <Header size='large' style={{float: 'left', width:'20%'}}><Icon name="paper plane outline" color="teal" />Kurum Paylaşımları</Header>
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
export default connect(mapStateToProps)(Aktarimlar);
