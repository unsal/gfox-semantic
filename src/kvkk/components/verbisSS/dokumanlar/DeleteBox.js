import React, { Component } from "react";
import { Label, Icon, Message, List } from "semantic-ui-react";
import { getAPI } from "../../../../config";
import axios from "axios";
import { updateStoreData } from "../../../../reducer/actions";

//DELETE BOX KURUM
class DeleteBox extends Component {
  // props: pidm, birim_pidm, name, store, data
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
    const { selectedPidm } = this.props;
    formData.set("pidm", selectedPidm);

    axios({
      method: "POST",
      url: getAPI.delSSDokumanlar,
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
    const deleteModeON = !this.state.deleteModeOn;
    this.setState({ deleteModeON, selectedPidm });
  }

  handleClose =()=>{
    this.setState({ deleteModeON: false, selectedPidm:0 })
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
        onClick={this.approveDelete}
      />
    </div>
  }

  ErrorMessage = () => {
    return <Message
                error
                header='Kayıt Silinemedi!'
                content='Silme işleminde bilinmeyen hata oluştu. Lütfen veritabanı ve/veya ağ bağlantınızı kontrol edin.'
            />
  }

  render() {
    const {pidm, dokuman_name, yayin_name} = this.props;
    return (
      <div style={{ margin:"2px", display: 'inline-block' }}>
        {/* <Label as='a' content={dokuman_name.toUpperCase()} icon='remove circle' onClick={()=>this.handleDelete(pidm)} />
        <Label as='a' content={yayin_name.toUpperCase()} color="teal"/> */}

        <List size='small' celled divided selection onClick={()=>this.handleDelete(pidm)} >
          <List.Item>
            <div style = {{ display: 'inline-block'}}>
            {dokuman_name}{" "}
            <Label as='a' size='mini' color={yayin_name==='yayında'?'olive':'gray'} horizontal> {yayin_name} </Label>
            </div>
        </List.Item>
        </List>

          {this.state.error?
                    <this.ErrorMessage />
                    :this.state.deleteModeON &&this.state.selectedPidm===this.props.pidm?
                       <this.DeleteMenuButtons />:null}


      </div>
    );
  }
}

export default DeleteBox;
