import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";
import { getAPI } from "../../../config";
import axios from "axios";
import { updateStoreData } from "../../../reducer/actions";
import MyMessage from "../myComponents";

class DeleteBoxTanim extends Component {
  // props: id, pidm, name, store, data
  constructor(props) {
    super(props);
    this.state = {
     url: getAPI.delTanimlar,
     error: false,

     deleteMode: false,
     selectedPidm: 0 //seçili tanımı silmek için
    };
  }

  // Sil onayı
  approveDelete = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { id, pidm, data, store } = this.props;
    formData.set("id", id);
    formData.set("pidm", pidm);

    axios({
      method: "POST",
      url: this.state.url,
      data: formData
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(() => {
        // Delete Table Row
        const _data = data.filter(row => row.pidm !== pidm);
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
    // const deleteMode = !this.state.deleteMode;
    this.setState({ deleteMode: true, error: false, selectedPidm }); //deletemodu seçilen pidm için açar
  }

  handleClose =(event)=>{
    event.preventDefault();
    this.setState({ deleteMode: false, selectedPidm:0 })
  }

  render() {
    return (
      <div>
        {/* <Icon color="grey" size="small" name="remove circle" onClick={this.show("mini")}/> */}
        <Label key={this.props.pidm} as='a' content={this.props.name.toUpperCase()} icon='remove circle' onClick={()=>this.handleDelete(this.props.pidm)} />

          {this.state.error?
                    <MyMessage error header='Kayıt Silinemedi!' content='Silme İşleminde bilinmeyen hata oluştu. Lütfen veritabanı ve/veya ağ bağlantınızı kontrol edin.' />
                    :this.state.deleteMode &&this.state.selectedPidm===this.props.pidm?
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

export default DeleteBoxTanim;
