import React, {Component} from "react";
import {Icon, Dropdown, Segment, Grid } from "semantic-ui-react";
import {getOffset} from "../../myComponents";
import { getAPI } from "../../../../config";
import axios from "axios";
import { updateStoreData } from "../../../../reducer/actions";
import MyMessage from "../../myComponents";

// SS ADDBOX DOKUMAN
class AddBox extends Component {
  // props: id, pidm, name, store, data
 state = {
     didMount: false,
     isLoading: true,

     addMode: false,
     selectedPidm: 0, //seçili tanımı silmek için

     offset: [],
     optionsDokumanlar: [],
     optionsYayinDurumlari: [],

     error: false,
     success: false,
     message: '',

     birim_pidm: this.props.birim_pidm,
     dokuman_pidm: 0,
     yayindurumu_pidm: 0, //Dropdown'dan selecet edilecek pidm için

  }

  loadDokumanlarOptions =()=> {
    //Dropdown için key, text, value formatında
    const url= getAPI.getTanimlar + "/dokumanlar";
    let options =[];

    axios
      .get(url) //api den data yükler
      .then(json => {
        const data = json.data;
        data.map( ({pidm, name}) =>  options = options.concat({'key':pidm, 'text':name, 'value':pidm}) )
      })
      .then(()=>{
        this.setState({ optionsDokumanlar: options })
      })
      .catch(err => {
        console.log("Dropdown Dokümanlar yüklenemedi!");
        console.log(err);
        this.setState({ optionsDokumanlar: [], error:true, success:false })
      });

      return null;
  }

  loadYayinDurumlariOptions =()=> {
    //Dropdown için key, text, value formatında
    const url= getAPI.getTanimlar + "/yayindurumlari";
    let options =[];

    axios
      .get(url) //api den data yükler
      .then(json => {
        const data = json.data;
        data.map( ({pidm, name}) =>  options = options.concat({'key':pidm, 'text':name, 'value':pidm}) )
      })
      .then(()=>{
        this.setState({ optionsYayinDurumlari: options })
      })
      .catch(err => {
        console.log("Dropdown Yayın Durumları yüklenemedi!");
        console.log(err);
        this.setState({ optionsYayinDurumlari: [], error:true, success:false })
      });

      return null;
  }

  refreshStoreData =() => {
    const url = getAPI.getSSDokumanlar;
    const store = this.props.store;

    axios
      .get(url)
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

  // Sil onayı
  handleSubmit = (event) => {
    event.preventDefault();
    const url= getAPI.addSSDokumanlar;

    const form = new FormData();

    form.set("birim_pidm", this.state.birim_pidm);
    form.set("dokuman_pidm", this.state.dokuman_pidm);
    form.set("yayin_pidm", this.state.yayindurumu_pidm);

    axios({ method: "POST", url: url, data: form })
      .then(() => {
        this.refreshStoreData();
        this.setState({ error: false, success: true })
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true, success: false })
      });

  };

  handleAdd =(selectedPidm)=>{
    const addMode = true;
    this.setState({ addMode, selectedPidm });
    console.log(addMode, selectedPidm, this.state.birim_pidm)
  }

  handleClose =()=>{
    this.setState({ addMode: false, selectedPidm:0 })
  }


  handleChangeYayinDurumu = (event, data) => {
    event.preventDefault();
    const yayindurumu_pidm = data.value; // burdaki data dropdownun özel propertiesidir, karıştırma..
    this.setState({ yayindurumu_pidm });
  }

  handleChangeDokuman = (event, data) => {
    event.preventDefault();
    const dokuman_pidm = data.value;
    this.setState({ dokuman_pidm });
  }

  AddForm = () => {
    const offset = getOffset(this.state.birim_pidm); //getElementOffset by id

    // Dropdown ekleme formu cell içinde relative değil dışında absolute gözükün diye.. çünkü sığmıyordu.. cdm'e bak..
    const styleDD = { position: "absolute",
                top: offset.top,
                left: offset.left,
                width: "400px", //styledeki width kadar genişlik limiti olur
                backgroundColor: '#fff',
                zIndex: "100", //butonları öne getirsin ve arkadaki (+) ile karışmasın diye
                padding: "0px", // aşağıda segment->grid content arasında boşluk bırakmaz. gridde de margin=0 yaparsan aralarda boşluk kalmaz
              }

    return   <Segment basic compact size='mini' style={styleDD}>
                <Grid celled columns={2} style={{ margin: '0px'}}>

                    {/* BUTONLAR*/}
                    <Grid.Column width={2}>
                        <Icon   //Add modunda (X) kapat ikonu
                                  link
                                  name="remove circle"
                                  size="big"
                                  color="grey"
                                  onClick={this.handleClose}
                        /><Icon  // Add modunda (V) approve ikonu
                            link
                            name="check circle"
                            size="big"
                            color="blue"
                            onClick={this.handleSubmit}
                            style = {{ marginTop: "5px" }}
                        />
                      </Grid.Column>

                      {/* FORM FIELDS */}
                    <Grid.Column width={14}>
                          <Dropdown
                              compact
                              fluid // sağa doğru uzar
                              placeholder='Doküman seçin'
                              search selection
                              options={this.state.optionsDokumanlar}
                              onChange = {this.handleChangeDokuman}
                          />
                          <Dropdown
                              button
                              className='icon'
                              labeled
                              icon='world'
                              compact
                              search selection
                              placeholder='Yayın Durumu'
                              options={this.state.optionsYayinDurumlari}
                              onChange = {this.handleChangeYayinDurumu}
                              style = {{ marginTop:"5px" }}
                          />
                        </Grid.Column>

                </Grid>
              </Segment>
  }

componentDidMount() {
  this.setState({ didMount: true })

  this.loadDokumanlarOptions();
  this.loadYayinDurumlariOptions();
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.didMount !== this.state.didMount) {
    this.setState({ isLoading: false });
  }
}

// (+)
AddIcon =() =>{

  return <Icon  // listeleme modunda (+) butonu
                                id={this.state.birim_pidm}
                                link
                                name="add circle"
                                size="large"
                                color="olive"
                                onClick={()=>this.handleAdd(this.state.birim_pidm)}
                              />
}

ErrorMessage = () => {
  return <MyMessage
              error
              content='Kayıt işleminde bilinmeyen hata oluştu. Lütfen veritabanı ve/veya ağ bağlantınızı kontrol edin.'
          />
}

  render() {
    //ekleme butonunu alta atmadan sağa doğru sıralasın diye
    return (
      <div>
            {this.state.error? <this.ErrorMessage />
                :this.state.addMode&&this.state.selectedPidm===this.state.birim_pidm?
                        <this.AddForm />:null}

            <this.AddIcon />
      </div>
      )
      }
  }

export default AddBox;
