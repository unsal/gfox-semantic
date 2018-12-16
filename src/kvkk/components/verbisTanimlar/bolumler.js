import React, { PureComponent } from "react";
import { Table,  Header, Label, Input, Icon, Message} from "semantic-ui-react";
import KVKKLayout from "../../layout";

import { config } from "../../../config";
import axios from "axios";
import {store} from "../../../reducer"

import Login from '../../../auth/login'

//Redux
import { connect } from "react-redux";
import { LoadingStoreData, refreshStoreData} from "../myComponents"

class Bolumler extends PureComponent {
 state = {
  URL_GET: config.URL_GET_BOLUMLER,
  mounted: false,
  addMode: false, // eklem modunda bölüm ekleme fieldbox getirmesi için..
  onSubmitError: false
 }

 componentDidMount() {
   this.setState({mounted: true})
 }

 BolumlerListesi = ({selectedBirimPidm, data}) => (
   data && data.map(({bolum_pidm, bolum_name}) =>
          bolum_name!==null &&
                <div key={bolum_pidm} style={{ display:'block', marginTop:'3px'}}>
                      <Label key={bolum_pidm} as='a' content={bolum_name} onRemove={()=>this.setState({ deleteMode: true, selectedBirimPidm: selectedBirimPidm, selectedBolumPidm: bolum_pidm })} />
                      { (bolum_pidm===this.state.selectedBolumPidm && this.state.deleteMode && !this.state.onSubmitError) &&<this.DeleteBox /> }
                </div>)
 )

// (+)
AddButton= ({pidm}) =>(
  // (pidm===this.state.mouseOverPidm && !this.state.addMode) &&
        <Icon  // listeleme modunda (+) butonu
            link
            name="add circle"
            // size="small"
            color="teal"
            onClick={()=> this.setState({addMode: true, birim_pidm: pidm}) }
          />
  )


InputBox= ({pidm}) =>{
 return (pidm===this.state.mouseOverPidm && this.state.addMode && !this.state.onSubmitError) ?
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
           (pidm===this.state.mouseOverPidm && this.state.onSubmitError) &&
           <Message negative size='tiny' onDismiss={()=>this.setState({ onSubmitError: false })}>
                Başarız İşlem! Mükerrer kayıt / veri servisinde hata olabilir..
           </Message>
}

   //(x)(v)
DeleteBox = () => {
    return <div style={{ display: 'inline-block' }}>
              <Icon   //(x)
                link
                name="dont"
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

handleClose = ()=>{
     this.setState({ deleteMode: false })
}

handleDelete = async (event) => {
  event.preventDefault();

  const {cid} = this.props
  const birim_pidm = this.state.selectedBirimPidm
  const pidm = this.state.selectedBolumPidm

  const params = await {birim_pidm, pidm, cid}

  try {
      await axios.post(config.URL_DELETE_BOLUM, params, config.axios)
      await refreshStoreData(store, this.props.cid, config.URL_GET_BOLUMLER)
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

    const {name, birim_pidm} = this.state
    const {cid, uid} = this.props

    const params = {birim_pidm, name, cid, uid}

    try {
        await axios.post(config.URL_ADD_BOLUM, params, config.axios)

        await this.setState({ onSubitError:false, addMode: false, inputIsVisible: false  })
        await refreshStoreData(store, cid, config.URL_GET_BOLUMLER)

    } catch (err) {
          this.setState({ onSubmitError: true })
    }
  };


 myRender =()=>{
   const {data} = this.props
   // console.log('data: ', data)

    return (
     <div className="kvkk-content">
       <Header as='h2'>BİRİM > BÖLÜMLER</Header>

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
           </Table.Row>
         </Table.Header>
         <Table.Body>
           {(this.state.mounted && data) && data.map((row) => (
                 <Table.Row key={row.birim_pidm}>
                   <Table.Cell style={{textAlign:"left", verticalAlign:'top'}}> {row.birim_name} </Table.Cell>
                   <Table.Cell style={{textAlign:"left"}} onMouseOver={()=>!this.state.addMode && setTimeout(()=>this.setState({ mouseOverPidm: row.birim_pidm }),50)}>
                       <this.BolumlerListesi selectedBirimPidm={row.birim_pidm} data={row.bolumler_data}/>
                       <this.InputBox pidm={row.birim_pidm} />
                       <this.AddButton pidm={row.birim_pidm} />
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
  const url = config.URL_GET_BOLUMLER
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
export default connect(mapStateToProps)(Bolumler);
