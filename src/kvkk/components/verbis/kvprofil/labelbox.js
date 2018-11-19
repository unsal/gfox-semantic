import React, { PureComponent } from "react";
import { Label, Icon } from "semantic-ui-react";
import axios from "axios";

import {MyMessage, refreshStoreData} from "../../myComponents";
import _ from 'lodash';
import { config } from "../../../../config";
import {store} from "../../../../reducer"
import { connect } from "react-redux";

//UPDATE BOX KURUM
class LabelBox extends PureComponent {
state = {

    error: false,
    deleteMode: false,

  }

  removedData = async (selectedPidm)=>{

    const {dataCell} = this.props
    let newData = []  //[{pidm, name}]
    await dataCell.forEach(pidm=>{
        if (pidm!==selectedPidm) {
            newData.push(pidm)
        }
    })
    return await (newData)

  }


  deleteEntireRecord = async () => {
     // delete entire record after last kv pidm was deleted
    const URL_DELETE = config.URL_DELETE_KVPROFIL
    const pidm = this.props.rowPidm

    const params = await {pidm}

    try {
          await axios.post(URL_DELETE, params, config.axios)
    } catch(err) {
      console.log("Error on entire row deleting", err)
    }
  }


  handleDelete = async (event) => {
    event.preventDefault();
    const pidm=this.props.rowPidm
    const {selectedPidm, uid} = this.props
    let data = await this.removedData(selectedPidm) //remove selected kv pidm from data

    // data = JSON.stringify(data)

    const params = await {pidm, data, uid}

    try {
        await axios.post(config.URL_UPDATE_KVPROFIL, params, config.axios)

            //son pidm silinmişse bütün satırı yok et
            const size = _.size(this.props.dataCell)
            if (size===1) {
                await this.deleteEntireRecord()
            }

        await refreshStoreData(store, this.props.cid, config.URL_GET_KVPROFIL)
        await this.setState({ error: false, success:true, deleteMode: false })
    } catch (err) {
          console.log("Update API Error!",err);
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

  render() {
    const {selectedPidm,name} = this.props
    const {deleteMode} = this.state
    const color = this.state.deleteMode?'red':'teal';

    return (
      <div style={{ margin:"2px"}}>
        <Label color={color} key={selectedPidm} as='a' content={name} onRemove={()=>this.onDeleteMode()} />

          {this.state.error?
                    <this.ErrorMessage />
                    :deleteMode? <this.DeleteBox />
                    :null}

      </div>
    )
  }
}

const mapStateToProps = state => ({ cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(LabelBox);