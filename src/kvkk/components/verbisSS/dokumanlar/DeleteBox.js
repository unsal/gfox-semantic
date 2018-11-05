import React, { PureComponent } from "react";
import { Label, Icon, List } from "semantic-ui-react";
import { config } from "../../../../config";
import axios from "axios";

import {MyMessage, refreshStoreData2} from "../../myComponents";

//DELETE BOX KURUM
class DeleteBox extends PureComponent {
  // props: pidm, birim_pidm, name, store, data

  state = {
     error: false,
     deleteMode: false,
  }

  componentDidMount() {

    const {cid, store} = this.props.params
    const {dokuman_name, yayin_name, selectedPidm} = this.props
    const URL_DELETE = config.URL_DeleteSSDokumanlar
    const URL_GET = config.URL_GetSSDokumanlar
    this.setState({ cid, store, dokuman_name, yayin_name, selectedPidm, URL_DELETE, URL_GET})

}

  // Sil onayı
  handleDelete = () => {
    // event.preventDefault();

    const formData = new FormData();
    formData.set("pidm", this.state.selectedPidm);
    formData.set("cid", this.state.cid)

    axios({
      method: "POST",
      url: this.state.URL_DELETE,
      data: formData
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(() => {
        refreshStoreData2(this.state.store, this.state.cid, this.state.URL_GET);
        this.setState({ error: false })
        this.handleClose();
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error)
      });
  };

  handleDeleteMode =(event)=>{
    event.preventDefault();
    this.setState({ deleteMode: true, error: false }); //deletemodu seçilen pidm için açar
  }

  handleClose =()=>{
    this.setState({ deleteMode: false, selectedPidm:0 })
  }


  //(x)(v)
  DeleteMenuButtons = () => {
    return <div style={{ display: 'inline-block'}}>
      <span>yukardaki dokuman silinsin mi?</span>
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
    const {dokuman_name, yayin_name} = this.state;

    return (
      <div style={{ margin:"2px", display: 'block' }}>

        <List size='small' celled divided selection onClick={this.handleDeleteMode} >
          <List.Item>
            <span style={{ float:'left' }}> {dokuman_name}</span>
            <Label style={{ float:'right'}} as='a' size='mini' color={yayin_name==='yayında'?'teal':null} horizontal> {yayin_name} </Label>
        </List.Item>
        </List>

          {this.state.error ? <this.ErrorMessage />
                    :this.state.deleteMode?<this.DeleteMenuButtons />
                    :null
          }


      </div>
    );
  }
}

export default DeleteBox;
