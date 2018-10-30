import React, { Component } from 'react'
import { Button, Image, Modal, Icon, Form, Dropdown, Grid } from 'semantic-ui-react'
import { config } from "../../../../config";
import axios from "axios";
import ImageBanner from "../../../../assets/img/kvanaveri.jpg"
import {refreshStoreData} from "../../myComponents"


export default class AddForm extends Component {
  state = {
   open: false, // modal için

  //URLs
  URL_GET: config.URL_GET_KVANAVERI,
  URL_ADD: config.URL_ADD_KVANAVERI,

  error: false,
  success: false,


  birim_pidm: 0,
  kv_pidm: 0,
  sure_pidm: 0,
  ulkeler_pidms: [],
  kanallar_pidms: [],
  dokumanlar_pidms:[],
  sistemler_pidms:[],
  dayanaklar_pidms:[],
  ortamlar_pidms:[],

  //ilk yükleme sırasında formfield-> placeholderlar kalsın diye.. başlık olarak
  birimChanged: false,
  kvChanged: false,
  sureChanged: false,
  ulkelerChanged: false,
  kanallarChanged: false,
  dokumanlarChanged: false,
  sistemlerChanged: false,
  dayanaklarChanged: false,
  ortamlarChanged: false

  }

  clearFields = () => {
    this.setState({
      birim_pidm:0, kv_pidm:0, sure_pidm: 0,
      ulkeler_pidms:[], kanallar_pidms:[], dokumanlar_pidms:[], sistemler_pidms:[], dayanaklar_pidms:[], ortamlar_pidms: [],
    })
  }

  show = dimmer => () => {
    this.setState({ dimmer, open: true })
    this.clearFields()
  }


  close = () => {
    this.setState({ open: false, success: true }) //success=true > form kapatıldığında alanlar sıfırlasın diye
    this.clearFields()
  }

  handleChange = (event, data) => {
    event.preventDefault()
    const error = false
    const success = false
    const id = data.id
    if (id==="id_birim") { const birim_pidm = data.value; this.setState({ birim_pidm, error, success, birimChanged:true }) }
    else if (id==="id_kv")  { const kv_pidm = data.value; this.setState({ kv_pidm, error, success, kvChanged:true }) }
    else if (id==="id_sureler")  { const sure_pidm = data.value; this.setState({ sure_pidm, error, success, sureChanged:true }) }
    else if (id==="id_ulkeler")  { const ulkeler_pidms = data.value; this.setState({ ulkeler_pidms, error, success, ulkelerChanged:true }) }
    else if (id==="id_kanallar")  { const kanallar_pidms = data.value; this.setState({ kanallar_pidms, error, success, kanallarChanged:true }) }
    else if (id==="id_dokumanlar")  { const dokumanlar_pidms = data.value; this.setState({ dokumanlar_pidms, error, success, dokumanlarChanged:true }) }
    else if (id==="id_sistemler")  { const sistemler_pidms = data.value; this.setState({ sistemler_pidms, error, success, sistemlerChanged:true }) }
    else if (id==="id_dayanaklar")  { const dayanaklar_pidms = data.value; this.setState({ dayanaklar_pidms, error, success, dayanaklarChanged:true }) }
    else if (id==="id_ortamlar")  { const ortamlar_pidms = data.value; this.setState({ ortamlar_pidms, error, success, ortamlarChanged:true }) }
  }



  FormFields=()=> {
   const style = { overflow: 'visible', width: '300px' }
   const {optionsBirimler, optionsKV, optionsSureler, optionsUlkeler, optionsKanallar,
          optionsDokumanlar, optionsSistemler, optionsDayanaklar, optionsOrtamlar} = this.props
   const {success,
          birim_pidm, kv_pidm, sure_pidm, ulkeler_pidms, kanallar_pidms, dokumanlar_pidms, sistemler_pidms, dayanaklar_pidms, ortamlar_pidms,
          birimChanged, kvChanged, sureChanged, ulkelerChanged, kanallarChanged, dokumanlarChanged, sistemlerChanged, dayanaklarChanged, ortamlarChanged
         } = this.state

   return <Form>

              <Form.Field>
               <Dropdown id="id_birim"
                placeholder="Süreç Sahibi"
                fluid search selection
                options={optionsBirimler}
                onChange={this.handleChange}
                value={success ? null : birimChanged?birim_pidm:null}
                style = {style}
               />
              </Form.Field>

              <Form.Field>
               <Dropdown id="id_kv"
                placeholder="kv"
                fluid search selection
                options={optionsKV}
                onChange={this.handleChange}
                value = {success?null:kvChanged?kv_pidm:null}
                style = {style}
               />
              </Form.Field>

              <Form.Field>
               <Dropdown id="id_sureler"
                placeholder="Saklama Süresi (ay)"
                fluid search selection
                options={optionsSureler}
                onChange={this.handleChange}
                value = {success?null:sureChanged?sure_pidm:null}
                style = {style}
               />
              </Form.Field>

              {/* Multiple Select Dropdowns */}
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>

                    <Form.Field>
                      <Dropdown id="id_ulkeler"
                        placeholder="Aktarılan Ülkeler"
                        fluid multiple search selection
                        options={optionsUlkeler}
                        onChange={this.handleChange}
                        value={success ? [] : ulkelerChanged ? ulkeler_pidms : []}
                        style={style}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Dropdown id="id_kanallar"
                        placeholder="Toplama Kanalları"
                        fluid multiple search selection
                        options={optionsKanallar}
                        onChange={this.handleChange}
                        value={success ? [] : kanallarChanged ? kanallar_pidms : []}
                        style={style}
                      /></Form.Field>

                    <Form.Field>
                      <Dropdown id="id_dokumanlar"
                        placeholder="Dokümanlar"
                        fluid multiple search selection
                        options={optionsDokumanlar}
                        onChange={this.handleChange}
                        value={success ? [] : dokumanlarChanged ? dokumanlar_pidms : []}
                        style={style}
                      />
                    </Form.Field>

                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <Dropdown id="id_sistemler"
                        placeholder="Kullanılan Sistemler"
                        fluid multiple search selection
                        options={optionsSistemler}
                        onChange={this.handleChange}
                        value={success ? [] : sistemlerChanged ? sistemler_pidms : []}
                        style={style}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Dropdown id="id_dayanaklar"
                        placeholder="Hukuki Dayanaklar"
                        fluid multiple search selection
                        options={optionsDayanaklar}
                        onChange={this.handleChange}
                        value={success ? [] : dayanaklarChanged ? dayanaklar_pidms : []}
                        style={style}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Dropdown id="id_ortamlar"
                        placeholder="Saklanan Ortamlar"
                        fluid multiple search selection
                        options={optionsOrtamlar}
                        onChange={this.handleChange}
                        value={success ? [] : ortamlarChanged ? ortamlar_pidms : []}
                        style={style}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

         </Form>
  }

  handleSubmit= async (event)=>{
   event.preventDefault();
   const {store} = this.props
   const {URL_ADD, URL_GET, birim_pidm, kv_pidm, sure_pidm, ulkeler_pidms,
          kanallar_pidms, dokumanlar_pidms, sistemler_pidms, dayanaklar_pidms, ortamlar_pidms}= this.state;

   const ulkeler_data       = await ulkeler_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const kanallar_data    = await kanallar_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const dokumanlar_data  = await dokumanlar_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const sistemler_data   = await sistemler_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const dayanaklar_data  = await dayanaklar_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const ortamlar_data    = await ortamlar_pidms.map(item=>item) //convert [array] to [{json}] for data post

   const params  = await {birim_pidm, kv_pidm, sure_pidm,
                          ulkeler_data, kanallar_data, dokumanlar_data, sistemler_data, dayanaklar_data, ortamlar_data}
   console.log('inserted successfully')

   //PYTHON SUBMIT PART
   try {
       const config = { headers: {
                         'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': '*'}
   }
       await axios.post(URL_ADD, params, config)
       await this.setState({ error: false,
                             success:true,
                             birim_pidm:0, kv_pidm:0, sure_pidm:0,
                             ulkeler_pidms:[], kanallar_pidms:[], dokumanlar_pidms:[],
                             sistemler_pidms:[], dayanaklar_pidms:[], ortamlar_pidms:[],
                             open: false //close modal
                            })

       await refreshStoreData(URL_GET, store )
   } catch (err) {
         console.log("Hata!",err);
         this.setState({ error: true })
   }

 }

  render() {
    const { open, dimmer } = this.state

    return (
      <div style={{ float: 'left'}}>
        <Icon name="add circle"
              link
              size="big"
              color="blue"
              onClick={this.show(true)} />

        <Modal
              size="large"
              dimmer={dimmer}
              open={open}
              onClose={this.close}
              closeOnDimmerClick = {false}
              >
          <Modal.Header>KV ANAVERİ</Modal.Header>
          <Modal.Content image >
            <Image wrapped size='medium' src={ImageBanner} />
            <Modal.Description>
              <this.FormFields />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={this.close}> Vazgeç </Button>
            <Button positive onClick={this.handleSubmit} >Ekle </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

