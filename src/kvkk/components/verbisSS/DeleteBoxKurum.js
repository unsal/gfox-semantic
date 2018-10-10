import React, { Component } from "react";
import { Label, Icon, Message } from "semantic-ui-react";
import { getAPI } from "../../../config";
import axios from "axios";
import { updateStoreData } from "../../../reducer/actions";

class DeleteBoxKurum extends Component {
  // props: pidm, name, store, data
  constructor(props) {
    super(props);
    this.state = {
     error: false,

     deleteModeON: false,
     selectedPidm: 0 //seçili tanımı silmek için
    };
  }

  // Sil onayı
  approveDelete = () => {
    // event.preventDefault();

    const formData = new FormData();
    const { pidm, data, store } = this.props;
    formData.set("pidm", pidm);

    axios({
      method: "POST",
      url: getAPI.delPaylasilanKurumlar,
      data: formData
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(() => {
        // Delete Table Row
        const _data = data.kurumlar.filter(row => row.pidm !== pidm);
        store.dispatch(updateStoreData(_data));
      })
      .then(
          this.setState({ error:false })
        )
      .catch(error => {
        this.setState({ error: true });
      });
  };

  handleDelete =(selectedPidm)=>{
    const deleteModeON = !this.state.deleteModeOn;
    this.setState({ deleteModeON, selectedPidm });
  }

  handleClose =(event)=>{
    event.preventDefault();
    this.setState({ deleteModeON: false, selectedPidm:0 })
  }

  render() {
    return (
      <div style={{ margin:"2px" }}>
        <Label key={this.props.pidm} as='a' content={this.props.name.toUpperCase()} icon='remove circle' onClick={()=>this.handleDelete(this.props.pidm)} />

          {this.state.error?
                    <Message error header='Kayıt Silinemedi!' content='Silme İşleminde bilinmeyen hata oluştu. Lütfen veritabanı ve/veya ağ bağlantınızı kontrol edin.' />
                    :this.state.deleteModeON &&this.state.selectedPidm===this.props.pidm?
                        <div style={{ display: 'inline-block' }}>
                            <Icon   //Ekleme modunda kayıt butonu
                                link
                                name="remove circle"
                                size="large"
                                color="grey"
                                onClick={this.handleClose}
                            /><Icon  // listeleme modunda
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

export default DeleteBoxKurum;
