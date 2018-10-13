import React, {Component} from "react";
import {Icon, Dropdown, Message, Segment, Grid } from "semantic-ui-react";
import {getOffset} from "../../myComponents";
import { config } from "../../../../config";
import axios from "axios";
import { updateStoreData } from "../../../../reducer/actions";
import "../../../kvkk.css";

import {KURUMLAR, TOPLAMA_KANALLARI, KULLANILAN_SISTEMLER} from "./related" //submit() > form set ederken related item belirlemek için..

// ADDBOX KURUM
class AddBox extends Component {
  state = {

    //props
     URL_GET: this.props.URL_GET,
     URL_DELETE: this.props.URL_DELETE,
     URL_OPTIONS: this.props.URL_OPTIONS,
     birimPidm: this.props.birimPidm,
     store: this.props.store,
     ssMode: this.props.ssMode, //Form submit ederken common alan belirlemek için

     didMount: false,
     isLoading: true,

     addMode: false,

     offset: [],
     options: [],

     dataSelected: [],
     error: false,
     success: false


  }

  loadDropdownOptions =()=> {
    //Dropdown için key, text, value formatında
    const {URL_OPTIONS}= this.state;
    let options =[];

    axios
      .get(URL_OPTIONS) //api den data yükler
      .then(json => {
        const data = json.data;
        data.map( ({pidm, name}) =>  options = options.concat({'key':pidm, 'text':name, 'value':pidm}) )
      })
      .then(()=>{
        this.setState({ options })
      })
      .catch(err => {
        console.log("Dropdown yüklenemedi!");
        console.log(err);
        this.setState({ options: [], error:true, success:false })
      });

      return null;
  }

  refreshStoreData =() => {
    const {URL_GET, store} = this.state;

    axios
      .get(URL_GET)
      .then(json => {
        const data = json.data;
        store.dispatch(updateStoreData(data)); //store data güncelle
        this.setState({ error:false, succes: true})
        // console.log("store refresh successfully")
      })
      .catch(err => {
        this.setState({ error: true, success: false})
        console.log(err);
      });
  }

  submit = (birim_pidm, related_item_pidm) => {

    const {URL_ADD}= this.state;

    const form = new FormData();
    // Must bu set; otherwise Python gets "AttributeError: 'NoneType' object has no attribute 'upper'"
    form.set("birim_pidm", birim_pidm);

    // common > moda göre related alanı basar
    if (this.state.ssMode===KURUMLAR) form.set("kurum_pidm", related_item_pidm)
    else if (this.state.ssMode===TOPLAMA_KANALLARI) form.set("kanal_pidm", related_item_pidm)
    else if (this.state.ssMode===KULLANILAN_SISTEMLER) form.set("sistem_pidm", related_item_pidm)
    else return;

    axios({ method: "POST", url: URL_ADD, data: form })
      .then(() => {
        this.refreshStoreData();
        this.setState({ error: false, success: true })
        this.handleClose();
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true, success: false })
      });
  }

  // Sil onayı
  handleSubmit = (event) => {
    event.preventDefault();

    const {birim_pidm, dataSelected} = this.state;

    // python api ye related_item_pidm, related_item_name basman lazım, dikkat..
    dataSelected.map(({related_item_pidm})=>(
        this.submit(birim_pidm, related_item_pidm)
    )
    )

    this.handleClose(event);
    this.refreshStoreData();

  };

  handleAdd =()=>{
    this.setState({ addMode: true });
  }

  handleClose =()=>{
    this.setState({ addMode: false})
  }

  handleOnChange = (event, data) => {
    event.preventDefault();
    const dataSelected = data.value.map(key=>({related_item_pidm: key}));

    this.setState({ dataSelected});
  }

  AddForm = () => {
    const offset = getOffset(this.state.birimPidm); //getElementOffset by id

    // Dropdown ekleme formu cell içinde relative değil dışında absolute gözükün diye.. çünkü sığmıyordu.. cdm'e bak..
    const styleDD = { position: "absolute",
                top: offset.top,
                left: offset.left, //(x)(v)-> solda olsun diye
                width: "400px", //styledeki width kadar genişlik limiti olur
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
                    onChange={this.handleOnChange}
                    style= {{ flex: "auto" }}
                  />
             </Grid.Column>
            </Grid>
          </Segment>
  }

componentDidMount() {
  const didMount = true;
  this.setState({ didMount })

  this.loadDropdownOptions();
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.didMount !== this.state.didMount) {
    this.setState({ isLoading: false });
  }
}

// (+)
AddIcon =() =>{

  return <Icon  // listeleme modunda (+) butonu
                                id={this.state.birimPidm}
                                link
                                name="add circle"
                                size="large"
                                color="olive"
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
    //ekleme butonunu alta atmadan sağa doğru sıralasın diye
    const style = !this.state.addMode?{ display: 'inline-block' }:null;
    return (
      <div style={style}>
            {this.state.error? <this.ErrorMessage />
                :this.state.addMode? <this.AddForm />
                : <this.AddIcon />}
      </div>
      )
      }
  }

export default AddBox;
