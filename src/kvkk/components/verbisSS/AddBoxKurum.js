import React, {Component} from "react";
import {Icon, Dropdown } from "semantic-ui-react";
import {getOffset} from "../myComponents";
import { getAPI } from "../../../config";
import axios from "axios";
import { updateStoreData } from "../../../reducer/actions";

class AddBoxKurum extends Component {
  // props: id, pidm, name, store, data
  constructor(props) {
    super(props);
    this.state = {
     didMount: false,
     isLoading: true,

     addModeON: false,
     selectedPidm: 0, //seçili tanımı silmek için

     offset: [],
     options: [],

     dataSelected: [],
     error: false,
     success: false

    };
  }

  loadOptions =()=> {
    //Dropdown için key, text, value formatında
    const url= getAPI.getTanimlar + "/kurumlar";
    let options =[];

    axios
      .get(url) //api den data yükler
      .then(json => {
        const data = json.data;
        data.map( ({pidm, name}) =>  options = options.concat({'key':pidm, 'text':name, 'value':pidm}) )
      })
      .then(()=>{
        this.setState({ options })
      })
      .catch(err => {
        console.log("Dropdown Kurumlar yüklenemedi!");
        console.log(err);
        this.setState({ options: [], error:true, success:false })
      });

      return null;
  }

  refreshStoreData =() => {
    const url = getAPI.getPaylasilanKurumlar;
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

  submit = (birim_pidm, kurum_pidm) => {

    const url= getAPI.addPaylasilanKurumlar;

    const form = new FormData();
    // Must bu set; otherwise Python gets "AttributeError: 'NoneType' object has no attribute 'upper'"
    form.set("birim_pidm", birim_pidm);
    form.set("kurum_pidm", kurum_pidm);

    axios({ method: "POST", url: url, data: form })
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

    const birim_pidm = this.props.pidm;
    const dataSelected = this.state.dataSelected;

    dataSelected.map(({kurum_pidm})=>(
        this.submit(birim_pidm, kurum_pidm)
    )
    )

    this.handleClose(event);
    this.refreshStoreData();

  };

  handleAdd =(selectedPidm)=>{
    const addModeON = !this.state.addModeON;
    this.setState({ addModeON, selectedPidm });
  }

  handleClose =()=>{
    this.setState({ addModeON: false, selectedPidm:0 })
  }

  handleOnChange = (event, data) => {
    event.preventDefault();
    const dataSelected = data.value.map(key=>({kurum_pidm: key}));

    this.setState({ dataSelected});
  }

  DropdownSelectKurumlar = () => {
    const offset = getOffset(this.props.pidm); //getElementOffset by id

    // Dropdown ekleme formu cell içinde relative değil dışında absolute gözükün diye.. çünkü sığmıyordu.. cdm'e bak..
    const styleDD = { position: "absolute",
                top: offset.top,
                left: offset.left,
                width: "400px", //styledeki width kadar genişlik limiti olur
                backgroundColor: '#fff',
                zIndex: "100" //butonları öne getirsin ve arkadaki (+) ile karışmasın diye
            }

    return   <div style={styleDD}>
                <Dropdown
                    fluid
                    placeholder='Kurum seçin'
                    multiple search selection
                    options={this.state.options}
                    onChange = {this.handleOnChange}
                />
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
              </div>
  }

componentDidMount() {
  const didMount = true;
  this.setState({ didMount })

  this.loadOptions();
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.didMount !== this.state.didMount) {
    this.setState({ isLoading: false });
  }
}

  render() {
    //ekleme butonunu alta atmadan sağa doğru sıralasın diye
    const style = !this.state.addModeON?{ display: 'inline-block' }:null;
    return (
      <div style={style}>

                {this.state.addModeON &&this.state.selectedPidm===this.props.pidm?
                        <this.DropdownSelectKurumlar />
                            :<Icon  // listeleme modunda (+) butonu
                                id={this.props.pidm}
                                link
                                name="add circle"
                                size="large"
                                color="olive"
                                onClick={()=>this.handleAdd(this.props.pidm)}
                              />
          }
      </div>
      )

      }
  }

export default AddBoxKurum;
