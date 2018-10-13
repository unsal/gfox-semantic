import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";
import { getAPI } from "../../../../config";
import axios from "axios";
import { updateStoreData } from "../../../../reducer/actions";
import MyMessage from "../../myComponents";

//DELETE BOX KURUM
class DeleteBox extends Component {
  // props: pidm, birim_pidm, name, store, data
  constructor(props) {
    super(props);
    this.state = {
     error: false,

     deleteMode: false,
     selectedPidm: 0 //seçili tanımı silmek için
    };
  }

  // Sil onayı
  approveDelete = () => {
    // event.preventDefault();

    const formData = new FormData();
    const { selectedPidm } = this.props;
    formData.set("pidm", selectedPidm);

    axios({
      method: "POST",
      url: getAPI.delPaylasilanKurumlar,
      data: formData
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(() => {

        this.refreshStoreData();
        this.setState({ error: false })
        this.handleClose();
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error)
      });
  };

  handleDelete =(selectedPidm)=>{
    // const deleteMode = !this.state.deleteMode;
    this.setState({ deleteMode: true, error: false, selectedPidm }); //deletemodu seçilen pidm için açar
  }

  handleClose =()=>{
    this.setState({ deleteMode: false, selectedPidm:0 })
  }

  refreshStoreData =() => {
    const url = getAPI.getPaylasilanKurumlar;
    const store = this.props.store;

    axios
      .get(url)
      .then(json => {
        const data = json.data;
        store.dispatch(updateStoreData(data)); //store data güncelle
      })
      .then(this.setState({error: false}))
      .catch(err => {
        this.setState({ error: true})
        console.log(err);
      });
  }

  //(x)(v)
  DeleteMenuButtons = () => {
    return <div style={{ display: 'inline-block' }}>
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
    </div>
  }

  ErrorMessage = () => {
    return <MyMessage
                error
                header='Kayıt Silinemedi!'
                content='Silme işleminde bilinmeyen hata oluştu. Lütfen veritabanı ve/veya ağ bağlantınızı kontrol edin.'
            />
  }

  render() {
    return (
      <div style={{ margin:"2px" }}>
        <Label key={this.props.pidm} as='a' content={this.props.name.toUpperCase()} icon='remove circle' onClick={()=>this.handleDelete(this.props.pidm)} />

          {this.state.error?
                    <this.ErrorMessage />
                    :this.state.deleteMode &&this.state.selectedPidm===this.props.pidm?
                       <this.DeleteMenuButtons />:null}


      </div>
    );
  }
}

export default DeleteBox;
