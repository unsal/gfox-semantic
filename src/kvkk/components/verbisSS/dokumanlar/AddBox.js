import React, {PureComponent} from "react";
import {Icon, Dropdown, Segment, Grid } from "semantic-ui-react";
import {getOffset} from "../../myComponents";
import { config } from "../../../../config";
import axios from "axios";
import {MyMessage, refreshStoreData, createDropdownOptions, createYayindurumlariOptions} from "../../myComponents";

// SS ADDBOX DOKUMAN
class AddBox extends PureComponent {
  // props: id, pidm, name, store, data
 state = {
     didMount: false,
     isLoading: true,

     addMode: false,
     selectedPidm: 0, //seçili tanımı silmek için

     offset: [],

     error: false,
     success: false,
     message: '',

     dokuman_pidm: 0,
     yayindurumu_pidm: 0, //Dropdown'dan selecet edilecek pidm için

  }

  // Sil onayı
  handleSubmit = (event) => {
    event.preventDefault();
    const URL_ADD = config.URL_AddSSDokumanlar
    const URL_GET = config.URL_GetSSDokumanlar
    const {store, cid } = this.state
    const form = new FormData();

    form.set("birim_pidm", this.state.birim_pidm);
    form.set("dokuman_pidm", this.state.dokuman_pidm);
    form.set("yayin_pidm", this.state.yayindurumu_pidm);
    form.set("cid", this.state.cid);
    form.set("uid", this.state.uid);

    axios({ method: "POST", url: URL_ADD, data: form })
      .then(() => {
        refreshStoreData(store, cid, URL_GET);
        this.setState({ error: false, success: true })
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true, success: false })
      });

  };

  handleAddMode =async (selectedPidm)=>{
    const {cid} =  this.state

    //Addbox için
    const optionsYayindurumlari =  await createYayindurumlariOptions()
    const optionsDokumanlar =  await createDropdownOptions(config.URL_GET_DOKUMANLAR, cid)
    await this.setState({ addMode: true, error: false, selectedPidm, optionsYayindurumlari, optionsDokumanlar }); //bir önceki hatadan 2sn içnde kapanan errmessagedan dolayı error:false set edildi.
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

    const {optionsDokumanlar, optionsYayindurumlari} = this.state

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
                              options={optionsDokumanlar}
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
                              options={optionsYayindurumlari}
                              onChange = {this.handleChangeYayinDurumu}
                              style = {{ marginTop:"5px" }}
                          />
                        </Grid.Column>

                </Grid>
              </Segment>
  }

 componentDidMount() {
  const {store, cid, uid} = this.props.params
  const {birim_pidm} = this.props
  this.setState({ didMount: true, store, cid, uid, birim_pidm })
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
                                onClick={()=>this.handleAddMode(this.state.birim_pidm)}
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
                :this.state.addMode? <this.AddForm />
                :null}

            <this.AddIcon />
      </div>
      )
      }
  }

export default AddBox;
