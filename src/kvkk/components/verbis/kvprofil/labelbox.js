import React, { PureComponent } from "react";
import { Label, Icon } from "semantic-ui-react";
import axios from "axios";
import { updateStoreData, updateStoreMode } from "../../../../reducer/actions";

import {MyMessage} from "../../myComponents";
import _ from 'lodash';
import { config } from "../../../../config";

//UPDATE BOX KURUM
class LabelBox extends PureComponent {
state = {

    error: false,
    deleteMode: false,

  }

  removedData = async ()=>{

    const {selectedPidm, dataCell} = this.props
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
          const config = { headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'}
              }
          await axios.post(URL_DELETE, params, config)
    } catch(err) {
      console.log("Error on entire row deleting", err)
    }
  }


  handleDelete = async (event) => {
    event.preventDefault();
    const URL_UPDATE= config.URL_UPDATE_KVPROFIL
    const pidm=this.props.rowPidm
    let data = await this.removedData() //remove selected kv pidm from data

    // data = JSON.stringify(data)

    const params = await {pidm, data}

    try {
        const config = { headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'}
    }
        await axios.post(URL_UPDATE, params, config)

            //son pidm silinmişse bütün satırı yok et
            const {dataCell} = this.props
            const size = _.size(dataCell)

            if (size===1) {
                await this.deleteEntireRecord()
            }

        await this.setState({ error: false, success:true })
        await this.refreshStoreData()
    } catch (err) {
          console.log("Update API Error!",err);
          this.setState({ error: true })
    }

  };

  onDeleteMode = async ()=>{
    const {store} = await this.props
    await this.setState({ deleteMode: true, error: false }); //updatemodu seçilen pidm için açar
    await store.dispatch(updateStoreMode('UPDATE'))
  }

  handleClose = async()=>{
    const {store} = await this.props
    await this.setState({ deleteMode: false })
    await store.dispatch(updateStoreMode('DEFAULT'))
  }

  refreshStoreData =() => {
    const URL_GET = config.URL_GET_KVPROFIL;
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

export default LabelBox;
