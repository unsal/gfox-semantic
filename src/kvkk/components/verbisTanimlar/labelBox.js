import React, { PureComponent } from "react";
import { Label, Icon } from "semantic-ui-react";
import { config } from "../../../config";
import axios from "axios";
import {MyMessage, refreshStoreData} from "../myComponents";
// import ProfilFoto from '../../../assets/img/profil.jpg'

class LabelBox extends PureComponent {
  // props: id, pidm, name, store, data

   state = {
     url: config.URL_DelTanimlar,
     error: false,

     deleteMode: false,
     selectedPidm: 0 //seçili tanımı silmek için
  }

  // Sil onayı
  approveDelete =  (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { id, cid, store, URL_GET } = this.props.params;
    const { pidm } = this.props

    formData.set("id", id)
    formData.set("pidm", pidm)
    formData.set("cid", cid)

    axios({
      method: "POST",
      url: this.state.url,
      data: formData
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(() => {
        // Delete Table Row
        // const _data = data.filter(row => row.pidm !== pidm);
        // store.dispatch(updateStoreData(_data));
        refreshStoreData(store, cid, URL_GET );
      })
      .then(
          this.setState({ error:false, deleteMode: false })
        )
      .catch(error => {
        this.setState({ error: true });
      });
  };

  handleDelete =(selectedPidm)=>{
    // const deleteMode = !this.state.deleteMode;
    this.setState({ deleteMode: true, error: false, selectedPidm }); //deletemodu seçilen pidm için açar
  }

  handleClose =(event)=>{
    event.preventDefault();
    this.setState({ deleteMode: false, selectedPidm:0 })
  }

  MyLabel = () => {
    const {pidm, name} = this.props
    const {id} = this.props.params
    const color = this.state.deleteMode?'red':null;

    const iconName=(id==='profiller')?"user outline":
             (id==='birimler')?"clone outline":
             (id==='sistemler')?"microchip":
             (id==='ortamlar')?"hdd":
             (id==='kv')?"shield alternate":
             (id==='kurumlar')?"university":
             (id==='kanallar')?"shopping cart":
             (id==='islemeamaclari')?"crosshairs":
             (id==='dokumanlar')?"sticky note outline":
             (id==='dayanaklar')?"paperclip":
             (id==='sureler')?"clock outline":
             (id==='paylasimamaclari')?"handshake outline":
             (id==='paylasimsekilleri')?"share alternate":
             (id==='ulkeler')?"world":
             (id==='tedbirler')?"lock":
             'file outline'

       return <Label color={color} key={pidm} >
                    <Icon name={iconName} />
                        {name}
                    <Icon link name='delete' onClick={()=>this.handleDelete(pidm)}/>
              </Label>
  }

  render() {
    const {pidm} = this.props
    return (
      <div>
        {/* <Icon color="grey" size="small" name="remove circle" onClick={this.show("mini")}/> */}
        {/* <Label color={color} key={pidm} as='a' content={name} onRemove={()=>this.handleDelete(pidm)} /> */}
        <this.MyLabel />

          {this.state.error?
                    <MyMessage error header='Kayıt Silinemedi!' content='Silme İşleminde bilinmeyen hata oluştu. Lütfen veritabanı ve/veya ağ bağlantınızı kontrol edin.' />
                    :this.state.deleteMode &&this.state.selectedPidm===pidm?
                        <div style={{ display: 'inline-block' }}>
                            <Icon   //(x)
                                link
                                name="remove circle"
                                size="large"
                                color="grey"
                                onClick={this.handleClose}
                            /><Icon  // (v)
                                link
                                name="check circle"
                                size="large"
                                color="red"
                                onClick={this.approveDelete}
                            />
                        </div>:null}


      </div>
    );
  }
}

export default LabelBox;
