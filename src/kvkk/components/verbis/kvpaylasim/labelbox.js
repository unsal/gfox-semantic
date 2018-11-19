import React, { PureComponent } from "react";
import { Label, Icon } from "semantic-ui-react";
import axios from "axios";
import {store} from "../../../../reducer"
import { connect } from "react-redux";

import {MyMessage, refreshStoreData } from "../../myComponents";
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
    const URL_UPDATE= config.URL_UPDATE_KVPAYLASIM+"/"+this.props.id // ../ia, ../pa, ../ps
    const pidm=this.props.rowPidm
    const {cid, uid} = this.props
    let data = await this.removedData() //remove selected pidm from data

    const params = await {pidm, data, uid} //silinen kayde uid logu düşer

    try {
        await axios.post(URL_UPDATE, params, config.axios)
        await this.setState({ error: false, success:true })
        await refreshStoreData(store, cid, config.URL_GET_KVPAYLASIM)
    } catch (err) {
          console.log("KVPaylasim->Update on delete API Error!",err);
          this.setState({ error: true })
    }

  };

  onDeleteMode = async ()=>{
    await this.setState({ deleteMode: true, error: false }); //updatemodu seçilen pidm için açar
  }

  handleClose = async()=>{
    await this.setState({ deleteMode: false })
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
    const nameFormatted =  labelClicked?name:name.substring(0,30)+"..."

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

const mapStateToProps = state => ({ cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(LabelBox);
