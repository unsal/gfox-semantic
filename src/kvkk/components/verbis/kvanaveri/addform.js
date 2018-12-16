import React,  { PureComponent }   from 'react'
import { Button, Image, Modal, Icon, Form, Dropdown, Grid } from 'semantic-ui-react'
import { config } from "../../../../config";
import axios from "axios";
import ImageBanner from "../../../../assets/img/kvanaveri.jpg"
import {refreshStoreData, createDropdownOptions, MyLittleLoader} from "../../myComponents"
import {store} from "../../../../reducer"
import { connect } from "react-redux";


class AddForm extends PureComponent {
  state = {
   open: false, // modal için

  //URLs

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
  ortamlarChanged: false,

  isLoading: true,
  mounted: false
  }

  async componentDidMount() {
    const {cid, uid} = this.props
    await this.loadDropdownComponents()
    this.setState({ cid, uid, mounted: true })

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mounted !== this.state.mounted) {
      this.setState({ isLoading: false });
    }
  }

  clearFields = () => {
    this.setState({
      birim_pidm:0, kv_pidm:0, sure_pidm: 0,
      ulkeler_pidms:[], kanallar_pidms:[], dokumanlar_pidms:[], sistemler_pidms:[], dayanaklar_pidms:[], ortamlar_pidms: [],
    })
  }

  loadDropdownComponents = async ()=>{
    const {cid} = this.props

    const optionsBirimler    =  await createDropdownOptions(config.URL_GET_BIRIMLER, cid);
    const optionsKV          =  await createDropdownOptions(config.URL_GET_KV, cid);
    const optionsSureler     =  await createDropdownOptions(config.URL_GET_SURELER, cid);
    const optionsUlkeler     =  await createDropdownOptions(config.URL_GET_ULKELER, cid);
    const optionsKanallar    =  await createDropdownOptions(config.URL_GET_KANALLAR, cid);
    const optionsDokumanlar  =  await createDropdownOptions(config.URL_GET_DOKUMANLAR, cid);
    const optionsSistemler   =  await createDropdownOptions(config.URL_GET_SISTEMLER, cid);
    const optionsDayanaklar  =  await createDropdownOptions(config.URL_GET_DAYANAKLAR, cid);
    const optionsOrtamlar    =  await createDropdownOptions(config.URL_GET_ORTAMLAR, cid);
    const optionsTedbirler    =  await createDropdownOptions(config.URL_GET_TEDBIRLER, cid);


    await this.setState({ optionsBirimler, optionsKV, optionsSureler,
      optionsUlkeler, optionsKanallar, optionsDokumanlar,
      optionsSistemler,optionsDayanaklar, optionsOrtamlar, optionsTedbirler})
  }


   show = dimmer => async() => {
    //  await this.loadDropdownComponents()
      this.setState( { dimmer, open: true },
        this.clearFields()
        )

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
    else if (id==="id_tedbirler")  { const tedbirler_pidms = data.value; this.setState({ tedbirler_pidms, error, success, tedbirlerChanged:true }) }
  }

  FormFields=()=> {
   const style = { overflow: 'visible', width: '300px' }
   const {optionsBirimler, optionsKV, optionsSureler, optionsUlkeler, optionsKanallar,
          optionsDokumanlar, optionsSistemler, optionsDayanaklar, optionsOrtamlar, optionsTedbirler} = this.state
   const {success,
          birim_pidm, kv_pidm, sure_pidm, ulkeler_pidms, kanallar_pidms, dokumanlar_pidms, sistemler_pidms, dayanaklar_pidms, ortamlar_pidms, tedbirler_pidms,
          birimChanged, kvChanged, sureChanged, ulkelerChanged, kanallarChanged, dokumanlarChanged, sistemlerChanged, dayanaklarChanged, ortamlarChanged, tedbirlerChanged
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

              {/* Multiple Select Dropdowns */}
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>

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

                    <Form.Field>
                      <Dropdown id="id_tedbirler"
                        placeholder="Tedbirler"
                        fluid multiple search selection
                        options={optionsTedbirler}
                        onChange={this.handleChange}
                        value={success ? [] : tedbirlerChanged ? tedbirler_pidms : []}
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
   const {cid, uid, birim_pidm, kv_pidm, sure_pidm, ulkeler_pidms,
          kanallar_pidms, dokumanlar_pidms, sistemler_pidms, dayanaklar_pidms, ortamlar_pidms, tedbirler_pidms}= this.state;

   const ulkeler_data     = await ulkeler_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const kanallar_data    = await kanallar_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const dokumanlar_data  = await dokumanlar_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const sistemler_data   = await sistemler_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const dayanaklar_data  = await dayanaklar_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const ortamlar_data    = await ortamlar_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const tedbirler_data   = await tedbirler_pidms.map(item=>item) //convert [array] to [{json}] for data post

   const params  = await {birim_pidm, kv_pidm, sure_pidm,
                          ulkeler_data, kanallar_data, dokumanlar_data, sistemler_data, dayanaklar_data, ortamlar_data, tedbirler_data, cid, uid}
   console.log('inserted successfully')

   //PYTHON SUBMIT PART
   try {
       await axios.post(config.URL_ADD_KVANAVERI, params, config.axios)
       await this.setState({ error: false,
                             success:true,
                             birim_pidm:0, kv_pidm:0, sure_pidm:0,
                             ulkeler_pidms:[], kanallar_pidms:[], dokumanlar_pidms:[],
                             sistemler_pidms:[], dayanaklar_pidms:[], ortamlar_pidms:[],
                             tedbirler_pidms:[],
                             open: false //close modal
                            })

       await refreshStoreData(store, cid, config.URL_GET_KVANAVERI )
   } catch (err) {
         console.log("Hata!",err);
         this.setState({ error: true })
   }

 }

  render() {
    const { open, dimmer } = this.state

    return (
      this.state.isLoading?<MyLittleLoader />:<div style={{ float: 'left'}}>
        <Icon name="add circle"
              link
              size="big"
              color="blue"
              onClick={this.show(true)}
              />

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

const mapStateToProps = state => ({ cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(AddForm);
