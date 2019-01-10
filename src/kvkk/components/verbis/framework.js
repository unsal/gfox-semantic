import React, { PureComponent } from "react";
import { Table, Dropdown, Header, Button, Label, Icon, Modal, Input } from "semantic-ui-react";
import KVKKLayout from "../../layout";
import Login from '../../../auth/login'
import axios from "axios";

//Redux
import { connect } from "react-redux";
import { store } from "../../../reducer";

import { config } from "../../../config";
import {LoadingStoreData, createDropdownOptions, refreshStoreData, MyMessage}  from '../myComponents'

class Framework extends PureComponent {

  state = {

    mounted: false,
    addMode: false,
    deleteMode: false,
    editMode: false,

    //content table properties
    singleLine: true, //content>table>tek satır kontrolü için
    fixed: true,
  }


   componentDidMount() {
    const {fields} = this.props.template
    fields.map( async ({field, optionsURL})=>
        optionsURL &&  this.setState({ ['options_'+field]: await createDropdownOptions(optionsURL, this.props.cid) })
    )

   this.setState({ mounted: true})

  }


  TableHeader=()=> {
    const Required = () => <Icon name="asterisk" size="small" color="red" />
    const {fields} = this.props.template
    return <Table.Header>
      <Table.Row>
         {fields.map(({title, field, width, required}, index)=>
            <Table.HeaderCell key={index} style={{ width: {width}, verticalAlign: "TOP", backgroundColor:"#f3f3f3" }} > {title} {required && <Required />}</Table.HeaderCell>
          )}
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
    const {fields} = this.props.template

    this.setState({ editMode: true, addMode: false, fixed: false, singleLine: false,
                    pidm})
    //data içeren alanları dropdowna uygun arraye convert ederek atar diğerlerine normal olarak.
    fields.map( ({field}) => field.includes('_data')?this.setState({[field]:convert(row[field])}):
                                                         this.setState({[field]:row[field]}))
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


  MyDropdown = ({name, error}) => {

   const isPrimary = this.props.template.primary.indexOf(name)>=0
   const options =  this.state['options_'+name]

    return <Dropdown
              name={name}
              value={this.state[name]}
              multiple={name.includes("_data")}
              search selection
              fluid // sağa doğru uzar
              options={options}
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

  MyField =  ({name, type, error}) => {
    switch (type) {
      case "input": return <this.MyInput name={name}/>;
      case "dropdown": return <this.MyDropdown name={name} error={error}/>;
      default: return null
    }
  }


  styleEdit = { verticalAlign: 'top', margin:'0px', padding:'2px'}
  TableEdit = () =>
          <Table.Row>
              {this.props.template.fields.map( ({field, type}, index) => <Table.Cell key={index} style={this.styleEdit} selectable warning><this.MyField name={field} type={type}/></Table.Cell> )}
          </Table.Row>


  styleView = { verticalAlign: 'top', margin:'0px'}
  TableView = ({ row }) => {
    const {DataTitle, DataTitles} = this
    const {view} = this.props.template
    return <Table.Row >

      {view.map( ({field, type, color},index) =>
          type === "text"?<Table.Cell key= {index} style={this.styleView}><DataTitle row={row}>{row[field]}</DataTitle></Table.Cell>:
          type==="json"?<Table.Cell key= {index} style={this.styleView}><DataTitles row={row} color={color} data={row[field]} /></Table.Cell>:
          type==="bool" && <Table.Cell key= {index} style={this.styleView}><DataTitle row={row}>{row[field]&&<Icon name='flag checkered' color='green' />}</DataTitle></Table.Cell>
      )}

    </Table.Row>

  }

  TableRows = ({ data }) => {
    return data && data.map((row, index) => (
        this.state.editMode && (this.state.pidm === row.pidm) ?
          <this.TableEdit row={row} key={index}/> :
          <this.TableView row={row} key={index} />
      ))
  }

 TableForm =  () =>
    <Table.Row key="0">
      {this.props.template.fields.map( ({field, type}, index) =>
        <Table.Cell key={index} style={this.styleView} ><this.MyField name={field} type={type} error={this.state.message} /> </Table.Cell>
      )}
    </Table.Row>


  handleClose = () => {
    this.setState({ deleteMode: false })
  }

  handleReset = () =>
                  this.props.template.fields.map( ({field}) =>
                      field.includes('_data')?this.setState({[field]:[]}):this.setState({[field]:null})
              )

  handleCommit = async(type) => {
    //type = add, update

    const {pidm} = this.state
    const {cid, uid} = this.props
    const {fields} = this.props.template

    let params = {pidm, cid, uid}
    fields.map( ({field})=>params[field] = this.state[field] )

    try {
        const URL_COMMIT = this.props.template.url.commit+"/"+type  // /add or /update
        // console.log('yurtdışı: ',yurtdisi)

        await axios.post(URL_COMMIT, params, config.axios)

        await this.setState({ addMode: false, editMode: false, message: null, open: false , fixed: true, singleLine:true }) //open SilBox mesaj kutusu sildikten sonra açılmasın içindir.
        await this.handleReset()
        await refreshStoreData(store, cid, this.props.template.url.get)

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
    const {copy} = this.state
    const {fields} = this.props.template

    fields.map( ({field}) => this.setState({[field]:copy[field]}))

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
              <Header size='large' style={{float: 'left', width:'20%'}}><Icon name={this.props.template.pageicon} color="teal" />{this.props.template.pagetitle}</Header>
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
    const url = this.props.template.url.get
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
export default connect(mapStateToProps)(Framework);
