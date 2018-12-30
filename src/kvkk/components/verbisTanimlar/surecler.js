import React, { PureComponent } from "react";
import { Table,  Header, Label, Input, Icon, Message, Item} from "semantic-ui-react";
import KVKKLayout from "../../layout";

import { config } from "../../../config";
import axios from "axios";
import {store} from "../../../reducer"

import Login from '../../../auth/login'

//Redux
import { connect } from "react-redux";
import { LoadingStoreData, refreshStoreData} from "../myComponents"

import { Link } from "react-router-dom";


class Surecler extends PureComponent {
 state = {
  URL_GET: config.URL_GET_SURECLER,
  mounted: false,
  addMode: false, // eklem modunda bölüm ekleme fieldbox getirmesi için..
  onSubmitError: false
 }

 componentDidMount() {
   this.setState({mounted: true})
 }

 SureclerListesi = ({rowBolumPidm, data}) => (
   data && data.map(({surec_pidm, surec_name}) =>
          surec_name!==null &&
                <div key={surec_pidm} style={{ display:'block', marginTop:'3px'}}>
                      <Label key={surec_pidm} as='a' content={surec_name} onRemove={()=>this.setState({ deleteMode: true, deleteBolumPidm: rowBolumPidm, selectedSurecPidm: surec_pidm })} />
                      { (surec_pidm===this.state.selectedSurecPidm && this.state.deleteMode && !this.state.onSubmitError) &&<this.DeleteBox /> }
                </div>)
 )

// (+)
AddButton= ({addBolumPidm}) =>(
        <Icon  // listeleme modunda (+) butonu
            link
            name="add circle"
            // size="small"
            color="teal"
            onClick={()=> this.setState({addMode: true, addBolumPidm}) }
          />
  )


InputBox= ({rowBolumPidm}) =>{
 return (rowBolumPidm===this.state.addBolumPidm && this.state.addMode && !this.state.onSubmitError) ?
         <Input
                action={{
                      color: 'teal',
                      icon: 'check',
                      onClick: ()=>this.handleSubmit()
                    }}

                placeholder='bölüm adını giriniz'
                style={{ marginTop:'2px'}}
                onKeyDown={this.handleKeyDown}
                ref={input => input && input.focus()}
                onChange={this.handleChange}
                name = "name"
          />:
           (rowBolumPidm===this.state.addBolumPidm && this.state.onSubmitError) &&
           <Message negative size='tiny' onDismiss={()=>this.setState({ onSubmitError: false })}>
                Başarız İşlem! Mükerrer kayıt / veri servisinde hata olabilir..
           </Message>
}

   //(x)(v)
DeleteBox = () => {
  return <div style={{ display: 'inline-block' }}>
             <Icon  // (v)
                  link
                  name="check circle"
                  size="large"
                  color="red"
                  onClick={this.handleDelete}
                />
              <Icon   //(x)
                link
                name="dont"
                size="large"
                color="grey"
                onClick={this.handleClose}
                />
            </div>
  }

handleClose = ()=>{
     this.setState({ deleteMode: false })
}

handleDelete = async (event) => {
  event.preventDefault();

  const {cid} = this.props
  const pidm = this.state.selectedSurecPidm

  const params = await {pidm, cid}

  try {
      await axios.post(config.URL_DELETE_SUREC, params, config.axios)
      await refreshStoreData(store, this.props.cid, config.URL_GET_SURECLER)
      await this.setState({ deleteMode: false })
  } catch (err) {
        console.log("Bolum Delete Error",err);
        this.setState({ onSubmitError: true })
  }
};


handleKeyDown = (event) => {
 if (event.keyCode===27) {
    this.setState({ addMode: false, inputIsVisible: false })
 } else if (event.keyCode===13) {
    this.handleSubmit()
 }
}

handleChange = e => {
      e.preventDefault()
      this.setState({
        [e.target.name]: e.target.value
      })
    }

handleSubmit = async() => {

    const {name, addBolumPidm} = this.state
    const {cid, uid} = this.props

    const params = {bolum_pidm: addBolumPidm, name, cid, uid}

    try {
        await axios.post(config.URL_ADD_SUREC, params, config.axios)

        await this.setState({ onSubitError:false, addMode: false, inputIsVisible: false  })
        await refreshStoreData(store, cid, config.URL_GET_SURECLER)

    } catch (err) {
          this.setState({ onSubmitError: true })
    }
  };


 myRender =()=>{
   const {data} = this.props
   // console.log('data: ', data)

    return (
     <div className="kvkk-content">
       <Header as='h2'>BİRİMLER > BÖLÜMLER > SÜREÇLER</Header>

       {/* Hata mesajı bölümü  */}
       {(this.state.addBolumPidm === null && this.state.addMode && !this.state.onSubmitError) &&
          <div style={{ width: "800px" }}>
            <Message warning size='tiny' onDismiss={()=>this.setState({ addMode: false })}>
                Önce Birim > Bölüm eklemelisiniz...
            </Message>
          </div>
       }

       <Table
         sortable
         celled
         fixed
         compact='very'
         size="small"
         style={{ width: "800px" }}
       >
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell> Birim </Table.HeaderCell>
             <Table.HeaderCell> Bölümler </Table.HeaderCell>
             <Table.HeaderCell> Süreçler </Table.HeaderCell>
           </Table.Row>
         </Table.Header>
         <Table.Body>
           {(this.state.mounted && data) && data.map((row, index) => (
                <Table.Row key={index}>
                   <Table.Cell style={{textAlign:"left", verticalAlign:'top'}}><Item as={Link} to='/kvkk/tanimlar/bolumler'>{row.birim_name}</Item> </Table.Cell>
                   <Table.Cell style={{textAlign:"left", verticalAlign:'top'}}> {row.bolum_name} </Table.Cell>
                   <Table.Cell style={{textAlign:"left"}} >
                       <this.SureclerListesi rowBolumPidm={row.bolum_pidm} data={row.surecler_data}/>
                       <this.InputBox rowBolumPidm={row.bolum_pidm===null?index*999:row.bolum_pidm} />
                       <this.AddButton addBolumPidm={row.bolum_pidm} />
                   </Table.Cell>
                 </Table.Row>
               ))
           }
         </Table.Body>
       </Table>
     </div>
   );

 }

 render() {
  const {cid} = this.props
  const url = config.URL_GET_SURECLER
  return (
    <Login>
      <KVKKLayout>
        <LoadingStoreData cid={cid} url={url}>
            {this.state.mounted && <this.myRender />}
        </LoadingStoreData>
      </KVKKLayout>
    </Login>
  );
}
}

const mapStateToProps = state => ({ data: state.data, cid: state.cid, uid: state.uid});
export default connect(mapStateToProps)(Surecler);
