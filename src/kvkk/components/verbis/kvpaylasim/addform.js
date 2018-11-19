import React, { Component } from 'react'
import { Button, Image, Modal, Icon, Form, Dropdown } from 'semantic-ui-react'
import { config } from "../../../../config";
import axios from "axios";
import ImagePaylasim from "../../../../assets/img/kvpaylasim.jpg"
import {refreshStoreData, createDropdownOptions} from "../../myComponents"
import { connect } from "react-redux";
import { store } from "../../../../reducer";


class AddForm extends Component {
  state = {
   open: false, // modal için

    //URLs
    URL_GET: config.URL_GET_KVPAYLASIM,
    URL_ADD: config.URL_ADD_KVPAYLASIM,

    error: false,
    success: false,


  }

  clearFields = () => {
    this.setState({
      birim_pidm:0, kv_pidm:0, kurum_pidm: 0,
      ia_pidms:[], pa_pidms:[], ps_pidms:[]
    })
  }

   show =  dimmer => async () => {
    const {cid, uid} = this.props

    const optionsBirimler   = await createDropdownOptions(config.URL_GET_BIRIMLER, cid);
    const optionsKV         = await createDropdownOptions(config.URL_GET_KV, cid);
    const optionsKurumlar   = await createDropdownOptions(config.URL_GET_KURUMLAR, cid);
    const optionsIA         = await createDropdownOptions(config.URL_GET_ISLEMEAMACLARI, cid);
    const optionsPA         = await createDropdownOptions(config.URL_GET_PAYLASIMAMACLARI, cid);
    const optionsPS         = await createDropdownOptions(config.URL_GET_PAYLASIMSEKILLERI, cid);

    await this.setState(
      {dimmer, open: true, optionsBirimler, optionsKV, optionsKurumlar, optionsIA, optionsPA, optionsPS, cid, uid },
      this.clearFields())
  }

  close = () => {
    this.setState({ open: false, success: true }) //success=true > form kapatıldığında alanlar sıfırlasın diye
    this.clearFields()
  }

  handleChange =  (event, data) => {
    event.preventDefault()
    const error = false
    const success = false
    const {name,value} = data

    this.setState({ [name]: value, [name+'Changed']: true, error, success, birimChanged:true })
  }

  FormFields=()=> {
   const style = { overflow: 'visible', width: '300px' }
   const {optionsBirimler, optionsKV, optionsKurumlar, optionsIA, optionsPA, optionsPS} = this.state
   const {success,
          birim_pidm, kv_pidm, kurum_pidm, ia_pidms, pa_pidms, ps_pidms,
          birim_pidmChanged, kv_pidmChanged, kurum_pidmChanged, ia_pidmsChanged, pa_pidmsChanged, ps_pidmsChanged
         } = this.state
   return <Form>
              <Form.Field>
              {/* <label>Süreç Sahibi</label> */}
               <Dropdown name="birim_pidm"
                    placeholder="Süreç Sahibi"
                    fluid search selection
                    options={optionsBirimler}
                    onChange={this.handleChange}
                    value={success ? null : birim_pidmChanged?birim_pidm:null}
                    style = {style}
               />
              </Form.Field>

              <Form.Field>
              {/* <label>Paylaşılan KV</label> */}
               <Dropdown name="kv_pidm"
                    placeholder="kv"
                    fluid search selection
                    options={optionsKV}
                    onChange={this.handleChange}
                    value = {success?null:kv_pidmChanged?kv_pidm:null}
                    style = {style}
               />
              </Form.Field>

              <Form.Field>
              {/* <label>Paylaşılan Kurum</label> */}
               <Dropdown name="kurum_pidm"
                    placeholder="kurumlar"
                    fluid search selection
                    options={optionsKurumlar}
                    onChange={this.handleChange}
                    value = {success?null:kurum_pidmChanged?kurum_pidm:null}
                    style = {style}
               />
              </Form.Field>

              <Form.Field>
              {/* <label>İşleme Amacı</label> */}
               <Dropdown name="ia_pidms"
                    placeholder="işleme amaçları"
                    fluid multiple search selection
                    options={optionsIA}
                    onChange={this.handleChange}
                    value={success?[]:ia_pidmsChanged?ia_pidms:[]}
                    style = {style}
               />
              </Form.Field>

              <Form.Field>
              {/* <label>Paylaşaım Amacı</label> */}
               <Dropdown name="pa_pidms"
                    placeholder="paylaşım amaçları"
                    fluid multiple search selection
                    options={optionsPA}
                    onChange={this.handleChange}
                    value={success?[]:pa_pidmsChanged?pa_pidms:[]}
                    style = {style}
               /></Form.Field>

               <Form.Field>
               {/* <label>Paylaşım Şekli</label> */}
                <Dropdown name="ps_pidms"
                    placeholder="paylaşım şekilleri"
                    fluid multiple search selection
                    options={optionsPS}
                    onChange={this.handleChange}
                    value={success?[]:ps_pidmsChanged?ps_pidms:[]}
                    style = {style}
                />
               </Form.Field>

         </Form>
  }

  handleSubmit= async (event)=>{
   event.preventDefault();
   const {cid, uid} = this.props
   const {birim_pidm, kv_pidm, kurum_pidm, ia_pidms, pa_pidms, ps_pidms}= this.state;
   const islemeamaclari_data    = await ia_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const paylasimamaclari_data  = await pa_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const paylasimsekilleri_data = await ps_pidms.map(item=>item) //convert [array] to [{json}] for data post
   const params  = await {birim_pidm, kv_pidm, kurum_pidm,
                          islemeamaclari_data, paylasimamaclari_data, paylasimsekilleri_data, cid, uid}
   console.log('inserted successfully')

   //PYTHON SUBMIT PART
   try {
       await axios.post(config.URL_ADD_KVPAYLASIM, params, config.axios)
       await this.setState({ error: false,
                             success:true,
                             birim_pidm:0, kv_pidm:0, kurum_pidm:0,
                             ia_pidms:[], pa_pidms:[], ps_pidms:[],
                             open: false //close modal
                            })

       await refreshStoreData(store, cid, config.URL_GET_KVPAYLASIM )
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
              size="small"
              dimmer={dimmer}
              open={open}
              onClose={this.close}
              closeOnDimmerClick = {false}
              >
          <Modal.Header>KV Paylaşımı</Modal.Header>
          <Modal.Content image scrolling >
            <Image wrapped size='medium' src={ImagePaylasim} />
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