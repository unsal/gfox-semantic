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
    editMode: false
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
        <Table.HeaderCell style={{ width: "14%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }} > KİŞİ GRUBU  <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "13%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> İLGİLİ SÜREÇ <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> KV <Required /></Table.HeaderCell>
        <Table.HeaderCell style={{ width: "3%",  verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SAKLAMA SÜRESİ</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> GİRİŞ KANALI</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> KULLANILAN SİSTEM</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> HUKUKİ DAYANAK</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> İŞLEME AMACI</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> SAKLAMA ORTAMLARI</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "10%", verticalAlign: "TOP", backgroundColor:"#f3f3f3" }}> GÜVENLİK TEDBİRLERİ</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  }

  handleChange = (event, data) => {
    event.preventDefault()
    const {name, value} =  data

    this.setState({ [name]: value, [name+'Changed']: true })
  }

  MyDropdown = ({name, value, options, multiple, error}) => (
    <Dropdown
      name = {name}
      value={value}
      multiple={multiple}
      minCharacters = "10"
      search selection
      fluid // sağa doğru uzar
      options={options}
      onChange={this.handleChange}
      error = {error}
    />
  )

  cellStyle = { verticalAlign: 'top'}

  TableForm = () => {
  const MyDropdown = this.MyDropdown
  return <Table.Row  key="0">
      <Table.Cell style={this.cellStyle} > <MyDropdown name="profil_pidm" options={this.state.OPTIONS_PROFILLER} multiple={false} error={this.state.message}/> </Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="surec_pidm" options={this.state.OPTIONS_SURECLER} multiple={false} error={this.state.message} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="kv_pidm" options={this.state.OPTIONS_KV} multiple={false} error={this.state.message} /></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="sure_pidm" options={this.state.OPTIONS_SURELER} multiple={false} error={false}/></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="kanal_pidm" options={this.state.OPTIONS_KANALLAR} multiple={false} error={false}/></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="sistem_pidm" options={this.state.OPTIONS_SISTEMLER} multiple={false} error={false}/></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="dayanak_pidm" options={this.state.OPTIONS_DAYANAKLAR} multiple={false} error={false}/></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="isleme_amaclari_pidm" options={this.state.OPTIONS_ISLEMEAMACLARI} multiple={false} error={false}/></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="ortamlar_data" options={this.state.OPTIONS_ORTAMLAR} multiple={true} error={false}/></Table.Cell>
      <Table.Cell style={this.cellStyle}><MyDropdown name="tedbirler_data" options={this.state.OPTIONS_TEDBIRLER} multiple={true} error={false}/></Table.Cell>
    </Table.Row>
  }

//id-> selected data id (ortamlar, tedbirler), anaveri pidm->silmek için, data
  ParseData = ({ id, pidm, data, color }) => {

    const style = { display: 'block', marginTop: '3px' }

    return data && data.map((row, index) => {

      const content = row.name.substring(0, 10) + ".."
      const onDelete = (this.state.deleteMode && (this.state.selectedDataPidm === row.pidm) && (this.state.selectedPidm === pidm) && (this.state.selectedID === id))
      const onRemove = () => this.setState({ deleteMode: true, selectedID: id, selectedPidm: pidm, selectedDataPidm: row.pidm, selectedData: data })

      return <div key={index} style={style}>
                <Label
                  // basic
                  content={content}
                  color={onDelete?'red':color}
                  onRemove={onRemove}
                />
                {onDelete && <this.DeleteBox />}
              </div>
    }
    )
  }

  Title = (props) => <Header
                        color={props.color}
                        as='h5'
                        content={props.content && props.content.substring(0, 15) + ".."}
                        onClick={()=>this.setState({editMode: true, addMode: false, selectedPidm: props.pidm })}
                        />
  // Title = (props) => <Label
  //                       basic={props.basic}
  //                       color={props.color}
  //                       as='a'
  //                       content={props.content && props.content.substring(0, 10) + ".."}
  //                       onClick={()=>this.setState({editMode: true, addMode: false, selectedPidm: props.pidm })}
  //                       />

  TableRows= ({data})=> {
    const Title = this.Title
    const MyDropdown = this.MyDropdown

    return <React.Fragment>
           {data&&data.map((key, index) => (
                  this.state.editMode && (this.state.selectedPidm === key.pidm)?
                  // EDIT MODE
                  <Table.Row  key={index} >
                      <Table.Cell style={this.cellStyle}><MyDropdown name="profil_pidm" value={key.profil_pidm} options={this.state.OPTIONS_PROFILLER} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><MyDropdown name="surec_pidm" value={key.surec_pidm} options={this.state.OPTIONS_SURECLER} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><MyDropdown name="kv_pidm" value={key.kv_pidm} options={this.state.OPTIONS_KV} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><MyDropdown name="sure_pidm" value={key.sure_pidm} options={this.state.OPTIONS_SURELER} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><MyDropdown name="kanal_pidm" value={key.kanal_pidm} options={this.state.OPTIONS_KANALLAR} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><MyDropdown name="sistem_pidm" value={key.sistem_pidm} options={this.state.OPTIONS_SISTEMLER} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><MyDropdown name="dayanak_pidm" value={key.dayanak_pidm} options={this.state.OPTIONS_DAYANAKLAR} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><MyDropdown name="isleme_amaclari_pidm" value={key.isleme_amaclari_pidm} options={this.state.OPTIONS_ISLEMEAMACLARI} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><this.ParseData color='grey' id="ortamlar" pidm= {key.pidm} data={key.ortamlar_data}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><this.ParseData color='grey' id="tedbirler" pidm= {key.pidm} data={key.tedbirler_data}/></Table.Cell>
                  </Table.Row>:
                  // LIST MODE
                  <Table.Row  key={index} >
                      <Table.Cell style={this.cellStyle}><Title content={key.profil_name} pidm={key.pidm} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><Title content={key.surec_name} pidm={key.pidm} /></Table.Cell>
                      <Table.Cell style={this.cellStyle}><Title content={key.kv_name} pidm={key.pidm}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><Title color="grey" basic content={key.sure_name} pidm={key.pidm}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><Title color="grey" basic content={key.kanal_name} pidm={key.pidm}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><Title color="grey" basic content={key.sistem_name} pidm={key.pidm}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><Title color="grey" basic content={key.dayanak_name} pidm={key.pidm}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><Title color="grey" content={key.isleme_amaclari_name} pidm={key.pidm}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><this.ParseData color ='green' id="ortamlar" pidm= {key.pidm} data={key.ortamlar_data}/></Table.Cell>
                      <Table.Cell style={this.cellStyle}><this.ParseData color='olive' id="tedbirler" pidm= {key.pidm} data={key.tedbirler_data}/></Table.Cell>
                  </Table.Row>
                ))}
    </React.Fragment>
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

  resetValues = () =>
    this.setState (
      {
          profil_pidm: null,
          surec_pidm: null,
          kv_pidm: null,
          sure_pidm: null,
          kanal_pidm: null,
          sistem_pidm: null,
          dayanak_pidm: null,
          isleme_amaclari_pidm: null,
          ortamlar_data: null,
          tedbirler_data: null
      }
    )


  handleSubmit = async() => {

    const {profil_pidm, surec_pidm, kv_pidm, sure_pidm, kanal_pidm, sistem_pidm, dayanak_pidm,
            isleme_amaclari_pidm, ortamlar_data, tedbirler_data} = this.state
    const {cid, uid} = this.props

    const params = {profil_pidm, surec_pidm, kv_pidm, sure_pidm, kanal_pidm, sistem_pidm, dayanak_pidm,
                    isleme_amaclari_pidm, ortamlar_data, tedbirler_data, cid, uid}

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


  AddButton=()=>{
    const VazgecButon = () =>  <Button size='mini' content='VAZGEÇ' onClick={()=>this.setState({addMode: false, editMode: false, message: null})} />
    const EkleButon = () =>  <Button color='blue' size='mini' content='EKLE' onClick={this.handleSubmit}/>
    const YeniKayitButon = () => <Button color='teal' size='mini' content='YENİ KAYIT' onClick={()=>this.setState({addMode: true, editMode:false, message: null})} />
    return  this.state.addMode?
            <div>
                <VazgecButon />
                <EkleButon />
            </div>
            :this.state.editMode?<VazgecButon />
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
