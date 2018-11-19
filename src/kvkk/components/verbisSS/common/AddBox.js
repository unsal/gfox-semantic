import React, {PureComponent} from "react";
import {Icon, Dropdown, Message, Segment, Grid } from "semantic-ui-react";
import {getOffset, refreshStoreData} from "../../myComponents";
import axios from "axios";
import "../../../kvkk.css";

// ADDBOX KURUM
class AddBox extends PureComponent {
  state = {

     didMount: false,
     isLoading: true,

     addMode: false,

     offset: [],
     options: [],

     dataSelected: [],
     error: false,


  }



  loadDropdownOptions =(URL_OPTIONS, cid)=> {
    //Dropdown için key, text, value formatında
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
        this.setState({ options: []})
      });

      return null;
  }


  submit = (related_item_pidm) => {

    const {URL_ADD, id, birimPidm, cid, uid}= this.state;

    const form = new FormData();
    // Must bu set; otherwise Python gets "AttributeError: 'NoneType' object has no attribute 'upper'"
    form.set("id", id)
    form.set("birim_pidm", birimPidm);
    form.set("related_item_pidm", related_item_pidm)
    form.set("cid", cid)
    form.set("uid", uid)

    axios({ method: "POST", url: URL_ADD, data: form })
      .catch(err => {
        console.log("Hata!",err);
        this.setState({ error: true})
      });
  }

  // Sil onayı
  handleSubmit = (event) => {
    event.preventDefault();

    const {dataSelected} = this.state;

    // python api ye related_item_pidm, related_item_name basman lazım, dikkat..
    dataSelected.map(({related_item_pidm})=>(
        this.submit(related_item_pidm)
    ))

    refreshStoreData(this.state.store, this.state.cid, this.state.URL_GET);
    this.setState({error: false})
    this.handleClose();

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

async componentDidMount() {

  const didMount = true;
  this.setState({ didMount })

  const {URL_GET, URL_ADD, options, store, id, cid, uid} = this.props.params
  const {birimPidm}=this.props

  await this.setState({ URL_GET, URL_ADD, store, id, cid, uid, birimPidm, options})

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
