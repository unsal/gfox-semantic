import React, { Component } from 'react'
import { Button, Image, Modal, Icon, Form, Dropdown, Grid, Input, Checkbox } from 'semantic-ui-react'
import { config } from "../../../../config";
import axios from "axios";
import ImageBanner from "../../../../assets/img/kvtalepler.jpg"
import {refreshStoreData} from "../../myComponents"


export default class AddForm extends Component {
  state = {
   open: false, // modal için

  error: false,
  success: false,

  }

  show = dimmer => () => {
    this.setState({ dimmer, open: true })
  }

  close = () => {
    this.setState({ open: false, success: true }) //success=true > form kapatıldığında alanlar sıfırlasın diye
    // console.log('profiller: ', this.state.profiller_pidms)
  }

  handleChange = (event, element) => {
    event.preventDefault()
    const error = false
    const success = false
    const {name,value} = element //semantice özel... event->tarayıcının özelliklerini taşır sadece...

    this.setState({ [name]:value, [name+'Changed']:true, error, success, })

  }


  FormFields=()=> {
   const style = { overflow: 'visible', width: '300px' }
   const {optionsProfiller, optionsIslemDurumlari} = this.props
   const {success,
          isim, profiller_pidms, tckno, dogumtarihi, eposta, tel, incelemedurumu, islemdurumu, sureuzatma, kurumu, bilgitalebi,
          isimChanged, profiller_pidmsChanged, tcknoChanged, dogumtarihiChanged, epostaChanged, telChanged, incelemedurumuChanged, islemdurumuChanged, sureuzatmaChanged, kurumuChanged, bilgitalebiChanged,
         } = this.state

   return <Form>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
              <Form.Field>
                <Input  name='isim'
                        placeholder='İsim'
                        onChange={this.handleChange}
                        value={success? "" : isimChanged?isim:""}
                        style = {style}
                        />
              </Form.Field>

              <Form.Field>
               <Dropdown name="profiller_pidms"
                placeholder="Profiller"
                fluid multiple search selection
                options={optionsProfiller}
                onChange={this.handleChange}
                value = {success?[]:profiller_pidmsChanged?profiller_pidms:[]}
                style = {style}
                compact
               />
              </Form.Field>

              <Form.Field>
                <Input  name='tckno'
                        placeholder='tckno'
                        onChange={this.handleChange}
                        value={success ? "" : tcknoChanged?tckno:""}
                        style = {style}
                        />
              </Form.Field>

              <Form.Field>
                <Input  name='dogumtarihi'
                        placeholder='Doğrum Tarihi'
                        onChange={this.handleChange}
                        value={success ? "" : dogumtarihiChanged?dogumtarihi:""}
                        style = {style}
                        />
              </Form.Field>

              <Form.Field>
                <Input  name='eposta'
                        placeholder='E-Posta'
                        onChange={this.handleChange}
                        value={success ? "" : epostaChanged?eposta:""}
                        style = {style}
                        />
              </Form.Field>

              <Form.Field>
                <Input  name='tel'
                        placeholder='Tel'
                        onChange={this.handleChange}
                        value={success ? "" : telChanged?tel:""}
                        style = {style}
                        />
              </Form.Field>

          </Grid.Column>
          <Grid.Column>

              <Form.Field>
                <Input  name='incelemedurumu'
                        placeholder='İnceleme Durumu'
                        onChange={this.handleChange}
                        value={success ? "" : incelemedurumuChanged?incelemedurumu:""}
                        style = {style}
                        />
              </Form.Field>

              <Form.Field>
                    <Dropdown  name='islemdurumu'
                        placeholder='İşlem Durumu'
                        fluid search selection
                        options={optionsIslemDurumlari}
                        onChange={this.handleChange}
                        value={success ? "" : islemdurumuChanged?islemdurumu:""}
                        style = {style}
                        />
              </Form.Field>

              <Form.Field>
                    <Checkbox toggle
                        label = "Süre Uzatma"
                        name='sureuzatma'
                        onChange={this.handleChange}
                        checked={success?false:sureuzatmaChanged?sureuzatma:false}
                    />
              </Form.Field>

              <Form.Field>
                <Input  name='kurumu'
                        placeholder='Kurumu'
                        onChange={this.handleChange}
                        value={success ? "" : kurumuChanged?kurumu:""}
                        style = {style}
                        />
              </Form.Field>

              <Form.Field>
                <Input  name='bilgitalebi'
                        placeholder='Talep edilen bilgi'
                        onChange={this.handleChange}
                        value={success ? "" : bilgitalebiChanged?bilgitalebi:""}
                        style = {style}
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
   const URL_ADD = config.URL_ADD_KVTALEPLER
   const URL_GET=  config.URL_GET_KVTALEPLER
   const {isim, profiller_pidms, tckno, dogumtarihi,
          eposta, tel, incelemedurumu, islemdurumu, sureuzatma, kurumu, bilgitalebi,
        } = this.state

   const profiller_data   = await profiller_pidms.map(item=>item) //convert [array] to [{json}] for data post

   const params  = await {isim, profiller_data, tckno,
                          dogumtarihi, eposta, tel, incelemedurumu, islemdurumu, sureuzatma,
                          kurumu, bilgitalebi
                        }
   //PYTHON SUBMIT PART
   try {
        await axios.post(URL_ADD, params, config.axios)
        await this.setState({ error: false, success:true})
        await refreshStoreData(URL_GET, store )
        console.log('inserted successfully')
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
          <Modal.Header><Icon name="phone volume" />KV TALEPLERİ</Modal.Header>
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

