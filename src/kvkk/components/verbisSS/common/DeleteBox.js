import React, { PureComponent } from "react";
import { Label, Icon } from "semantic-ui-react";
import axios from "axios";
import {MyMessage, refreshStoreData} from "../../myComponents";

//DELETE BOX KURUM
class DeleteBox extends PureComponent {
state = {

    error: false,
    deleteMode: false,

  }

componentDidMount() {

    const {URL_GET, URL_DELETE, id, cid, store} = this.props.params
    const {name, selectedPidm} = this.props
    this.setState({ URL_GET, URL_DELETE, id, cid, store, name, selectedPidm})

}

  handleDelete = () => {

    const formData = new FormData();
    formData.set("id", this.state.id)
    formData.set("pidm", this.state.selectedPidm);
    formData.set("cid", this.state.cid)

    axios({
      method: "POST",
      url: this.state.URL_DELETE,
      data: formData

    })
      .then(() => {
        refreshStoreData(this.state.store, this.state.cid, this.state.URL_GET);
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
    const color = this.state.deleteMode?'red':null;

    return (
      <div style={{ margin:"2px" }}>
        <Label color={color} key={selectedPidm} as='a' content={name} onRemove={()=>this.handleDeleteMode()} />

          {this.state.error?
                    <this.ErrorMessage />
                    :deleteMode? <this.DeleteMenuButtons />
                    :null}


      </div>
    );
  }
}

export default DeleteBox;
