import React, {PureComponent} from "react";
import {Icon, Dropdown, Message, Segment, Grid } from "semantic-ui-react";
import {getOffset, removeDuplicates, refreshStoreData2, createDropdownOptions} from "../../myComponents";
import axios from "axios";
import "../../../kvkk.css";
import {config} from '../../../../config'
import {store} from "../../../../reducer"
import { connect } from "react-redux";

// ADDBOX KURUM
class AddBox extends PureComponent {
  state = {
     didMount: false,
     isLoading: true,

     addMode: false,

     offset: [],
     options: [],

     selectedData: [], //KV

     error: false

  }

  componentDidMount() {
    const {id, cid, uid} = this.props
    const didMount = true;
    this.setState({didMount, id, cid, uid})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  concatDatas = async (data1, data2)=>{
    // cell > varolan liteye > dropdown seçilmişleri ekler..
    let newData = []

    await data1.forEach(item=>{ newData.push(item) })
    await data2.forEach(item=>{ newData.push(item) })

    newData = await removeDuplicates(newData)

    return await (newData)

  }

  // Ekleme onayı
  handleSubmit = async (event) => {
    event.preventDefault();
    const URL_UPDATE= config.URL_UPDATE_KVANAVERI+"/"+this.props.id // ../ulkelerr_data  /kanallar_data etc
    const {dataCell}=this.props
    const {selectedData, cid, uid} = this.state
    const pidm = this.props.rowPidm

    let data = await this.concatDatas(dataCell, selectedData)

    const params = {pidm, data, uid}

    try {
        await axios.post(URL_UPDATE, params, config.axios)

        await this.setState({ error: false, success:true })
        await refreshStoreData2(store, cid, config.URL_GET_KVANAVERI)
        await this.handleClose();
    } catch (err) {
          console.log("KVAnaveri->AddBox->Update API Error!",err);
          this.setState({ error: true })
    }

  };

  handleAdd = async ()=>{

    const {id, cid} = this.state

    let options =null

      if (id==='ulkeler') {
        options = await createDropdownOptions(config.URL_GET_ULKELER, cid);
      } else if (id==='kanallar') {
        options = await createDropdownOptions(config.URL_GET_KANALLAR, cid);
      } else if (id==='dokumanlar') {
        options = await createDropdownOptions(config.URL_GET_DOKUMANLAR, cid);
      } else if (id==='sistemler') {
        options = await createDropdownOptions(config.URL_GET_SISTEMLER, cid);
      } else if (id==='dayanaklar') {
        options = await createDropdownOptions(config.URL_GET_DAYANAKLAR, cid);
      } else if (id==='ortamlar') {
        options = await createDropdownOptions(config.URL_GET_ORTAMLAR, cid);
      } else options = null

      const addMode = true
      await this.setState({options, addMode})

  }

  handleClose = async ()=>{
    await this.setState({ addMode: false})
  }

  handleChangeSelected = (event, data) => {
    event.preventDefault();
    const selectedData = data?data.value.map(item=>item):null;

    this.setState({ selectedData});
  }

  AddBoxForm = () => {
    const offset = getOffset(this.state.birimPidm); //getElementOffset by id

    // Dropdown ekleme formu cell içinde relative değil dışında absolute gözükün diye.. çünkü sığmıyordu.. cdm'e bak..
    const styleDD = { position: "absolute",
                top: offset.top,
                left: offset.left, //(x)(v)-> solda olsun diye
                width: "300px", //styledeki width kadar genişlik limiti olur
                backgroundColor: '#fff',
                zIndex: "100", //butonları öne getirsin ve arkadaki (+) ile karışmasın diye
                padding: "0px"
              }

    return <Segment basic compact size='mini' style={styleDD}>
              <Grid celled columns={2}  style={{ margin: '0px'}}>
                 <Grid.Column width={2}>
                      <Icon   //Add modunda (X) kapat ikonu
                                link
                                name="remove circle"
                                size="large"
                                color="grey"
                                onClick={this.handleClose}
                      /><Icon  // Add modunda (V) approve ikonu
                          link
                          name="check circle"
                          size="large"
                          color="blue"
                          onClick={this.handleSubmit}
                      />
                </Grid.Column>
              <Grid.Column width={14}>
                  <Dropdown
                    fluid
                    placeholder='Seçiminiz'
                    multiple search selection
                    options={this.state.options}
                    onChange={this.handleChangeSelected}
                    style= {{ flex: "auto" }}
                  />
             </Grid.Column>
            </Grid>
          </Segment>
  }



// (+)
AddIcon =(props) =>{
  const {color} = props
  return <Icon  // listeleme modunda (+) butonu
                                link
                                name="add circle"
                                size="large"
                                color={color}
                                onClick={this.handleAdd}
                              />
}



ErrorMessage = () => {
  return <Message
              error
              header='Kayıt Eklenemedi!'
              content='Kayıt işleminde bilinmeyen hata oluştu. Lütfen veritabanı ve/veya ağ bağlantınızı kontrol edin.'
          />
}

  render() {
    const {color} = this.props
    //ekleme butonunu alta atmadan sağa doğru sıralasın diye
    const style = !this.state.addMode?{ float:'left'}:null;

    return (
      <div style={style}>
            {this.state.Error? <this.ErrorMessage />
                :this.state.addMode? <this.AddBoxForm />
                : <this.AddIcon color={color}/>}
      </div>
      )
      }
  }

  const mapStateToProps = state => ({ cid: state.cid, uid: state.uid });
  export default connect(mapStateToProps)(AddBox);
