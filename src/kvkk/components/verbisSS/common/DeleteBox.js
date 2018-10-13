import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";
import { config } from "../../../../config";
import axios from "axios";
import { updateStoreData } from "../../../../reducer/actions";
import MyMessage from "../../myComponents";

//DELETE BOX KURUM
class DeleteBox extends Component {
state = {

    //get props
    URL_GET: this.props.URL_GET,
    URL_DELETE: this.props.URL_DELETE,
    selectedPidm: this.props.selectedPidm,
    name: this.props.name,
    store: this.props.store,

     error: false,
     deleteMode: false,

  }

  handleDelete = () => {

    const formData = new FormData();
    formData.set("pidm", this.state.selectedPidm);

    axios({
      method: "POST",
      url: this.state.URL_DELETE,
      data: formData

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

  handleDeleteMode =()=>{
    this.setState({ deleteMode: true, error: false }); //deletemodu seçilen pidm için açar
  }

  handleClose =()=>{
    this.setState({ deleteMode: false })
  }

  refreshStoreData =() => {
    const {URL_GET, store} = this.state;

    axios
      .get(URL_GET)
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
        onClick={this.handleDelete}
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
    const {selectedPidm,name, deleteMode} = this.state;

    return (
      <div style={{ margin:"2px" }}>
        <Label key={selectedPidm} as='a' content={name.toUpperCase()} icon='remove circle' onClick={()=>this.handleDeleteMode()} />

          {this.state.error?
                    <this.ErrorMessage />
                    :deleteMode? <this.DeleteMenuButtons />
                    :null}


      </div>
    );
  }
}

export default DeleteBox;
