import React, { PureComponent } from "react";
import { Label, Icon } from "semantic-ui-react";
import axios from "axios";
import { updateStoreData } from "../../../../reducer/actions";

import {MyMessage} from "../../myComponents";
import _ from 'lodash';
import { config } from "../../../../config";


//UPDATE BOX KURUM
class LabelBox extends PureComponent {
state = {

    error: false,
    deleteMode: false,

    //onClick Label > show full label
    labelClicked: false

  }

  removedData = async ()=>{
  //remove item from array and update it..
    const {selectedPidm, dataCell} = this.props
    let newData = []
    await dataCell.forEach(item=>{
        if (item!==selectedPidm) {
            newData.push(item)
        }
    })
    return await (newData)

  }

  handleDelete = async (event) => {
    event.preventDefault();
    const URL_UPDATE= config.URL_UPDATE_KVANAVERI+"/"+this.props.id // ../id_ulkeler, id_kanallar..etc
    const pidm=this.props.rowPidm
    let data = await this.removedData() //remove selected pidm from data

    const params = await {pidm, data}

    try {
        const config = { headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'}
    }
        await axios.post(URL_UPDATE, params, config)
        await this.setState({ error: false, success:true })
        await this.refreshStoreData()
    } catch (err) {
          console.log("KVAnaveri->Labelbox->Update on delete API Error!",err);
          this.setState({ error: true })
    }

  };

  onDeleteMode = async ()=>{
    await this.setState({ deleteMode: true, error: false }); //updatemodu seçilen pidm için açar
  }

  handleClose = async()=>{
    await this.setState({ deleteMode: false })
  }

  refreshStoreData =() => {
    const URL_GET = config.URL_GET_KVANAVERI;
    const {store} = this.props

    axios
      .get(URL_GET)
      .then(json => {
        const data = _.size(json.data)>0?json.data:[];
        store.dispatch(updateStoreData(data)); //store data güncelle
      })
      .then(this.setState({error: false}))
      .catch(err => {
        this.setState({ error: true})
        console.log(err);
      });
  }

  //(x)(v)
  DeleteBox = () => {
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

  handleClickLabel=(event)=>{
    event.preventDefault()
    const labelClicked = !this.state.labelClicked //label full mode aç kapa
    this.setState({labelClicked}) //onLabelClick show full label otherwise short ... version

  }

  render() {
    const {selectedPidm, name} = this.props
    const {deleteMode} = this.state
    const color = this.state.deleteMode?'red':this.props.color;
    const {labelClicked} = this.state
    const nameFormatted =  labelClicked?name:name.substring(0,7)+"..."

    return (
      <div style={{ margin:"2px"}}>
        <Label  color={color}
                key={selectedPidm}
                as='a'
                content={nameFormatted}
                onRemove={()=>this.onDeleteMode()}
                onClick={this.handleClickLabel}
          />

          {this.state.error?
                    <this.ErrorMessage />
                    :deleteMode? <this.DeleteBox />
                    :null}

      </div>
    );
  }
}

export default LabelBox
