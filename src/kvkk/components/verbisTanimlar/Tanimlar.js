import React, { PureComponent } from "react";
import { Table, Icon, Header, Form, Input, Checkbox, Segment, Message } from "semantic-ui-react";
import KVKKLayout from "../../layout";

import axios from "axios";
import { config } from "../../../config";

//Redux
import { connect } from "react-redux";
import { store } from "../../../reducer";

import DeleteBoxTanim from "./DeleteBoxTanim";
import './Tanimlar.css';
import '../../kvkk.css';
import _ from 'lodash';

import {MyMessage, refreshStoreData2} from "../myComponents"


class Tanimlar extends PureComponent {

    state = {
      URL_GET: config.URL_GetTanimlar+"/"+this.props.id,
      // bu ikisi
      didMount: false,
      isLoading:true,

      apiIsOnline: false, // data load ederken
      apiHasInsertError: false, // kayıt eklerken
      searchString: '', // girilen texte göre datayı filtrelemesi için gerekli alan
      // Form Fields
      formId: '',
      formLocal: false,
      formName: '',
      formPhoneArea: '',
      formSecure: false,

      selectedTanimPidm: 0   //Seçilmiş tanımı silmek için
    };

  async componentDidMount() {
     const formId = this.props.id
     const {cid} = this.props

     await refreshStoreData2(store, cid, this.state.URL_GET)
     this.setState({ apiIsOnline: true, cid, formId, didMount: true });
  }

  // Herzaman iki değişken kullanmalısın yoksa hata verir
  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit =(event)=> {
    event.preventDefault();
    // const form = new FormData(event.target); //Form'dan alanları almak için bu kullanılır.
    const form = new FormData(event.target);
    // Must bu set; otherwise Python gets "AttributeError: 'NoneType' object has no attribute 'upper'"
    form.set("id", this.state.formId);
    form.set("name", this.state.formName);
    form.set("local",this.state.formLocal);
    form.set("phone_area",this.state.formPhoneArea);
    form.set("secure",this.state.formSecure);
    //auth
    form.set("cid", this.props.cid)
    form.set("uid", this.props.uid)

    const url= config.URL_AddTanimlar;
    axios({ method: "POST", url: url, data: form })
      .then(() => {
        refreshStoreData2(store, this.props.cid, this.state.URL_GET)
      })
      .then(()=> {
        // submit ettikten sonra mevcut değerleri resetlemek için
        this.setState({
          apiHasInsertError: false,
          formName: '', formLocal: false, formPhoneArea:'', formSecure:''
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({apiHasInsertError: true})
      });
  }

  handleChangeName= (event)=> {
    event.preventDefault();
    this.setState({
      searchString: event.target.value,
      apiHasInsertError: false,// hatadan sonra kırmızı olan alanın tuşa basılınca normale dönmesi için
      formName: event.target.value
    });
  }

  handleChangePhoneArea= (event)=> {
    event.preventDefault();
    this.setState({
      formPhoneArea: event.target.value
    });
  }

  handleChangeSecure=(e, { checked }) => {
    this.setState({ formSecure: checked});
  }

  // local handleSubmit'de kullanılır. Sistemler için
  handleChangeLocal = (e, { checked }) => {
    this.setState({ formLocal: checked});
  }

  handleKeyDown = (event) => {
    if (event.keyCode===27) {
          refreshStoreData2(store, this.props.cid, this.state.URL_GET)
          console.log("Escape pressed...")
    } else if (event.keyCode===27) {
           this.handleSubmit()
    }
  }

  handleHomeClick =(event)=>{
    event.preventDefault();
    refreshStoreData2(store, this.props.cid, this.state.URL_GET)
  }

  AddForm = (props) => {

    const { id, inputIcon } = props;
    const isSistemler = id ==="sistemler";
    const isUlkeler = id === "ulkeler";

    return <Segment basic compact className="segment-form" >

          <Form onSubmit={this.handleSubmit}>
          <Form.Group>
                  <input type="hidden" name="id" value={id} />

                  {/* CheckBox: Dahili / Harici Sistem  */}
                  {isSistemler?
                    <Form.Field width="2">
                      <label>Dahili Sistem</label>
                      <Checkbox
                          toggle
                          name="local"
                          onChange={this.handleChangeLocal}
                          checked = {this.state.formLocal}
                      />
                    </Form.Field>
                    : null
                  }

                  {/* Input: Name alani */}
                  <Form.Field width="12">
                    <Input
                        value={this.state.formName}
                        type= "text"
                        icon={inputIcon}
                        size="large"
                        name="name"
                        placeholder={id+" ekle"}
                        className='input'
                        onChange={this.handleChangeName}
                        onKeyDown={this.handleKeyDown}
                        autoComplete = "off"
                    />
                  </Form.Field>


                    {isUlkeler?
                      // Telefon Alan Kodu
                      <Form.Field width="4">
                      <Input
                          value={this.state.formPhoneArea}
                          type= "text"
                          icon={inputIcon}
                          size="large"
                          name="phone_area"
                          placeholder="Alan Kodu"
                          className='input'
                          onChange={this.handleChangePhoneArea}
                          onKeyDown={this.handleKeyDown}
                          autoComplete = "off"
                      />
                      </Form.Field>:null}

                       {isUlkeler?
                        <Form.Field width="2">
                          <label>Güvenli</label>
                          <Checkbox
                              toggle
                              name="secure"
                              onChange={this.handleChangeSecure}
                              // checked = {this.state.formSecure}
                          />
                        </Form.Field>
                        : null
                      }

                  <Form.Field width="2">
                      {/* {!recordExist? */}
                      <Icon
                          className="icon-button"
                          name="add circle"
                          size="big"
                          color="teal"
                          onClick={this.handleSubmit}
                          />
                          {/* :null} */}

                  </Form.Field>

              </Form.Group>
              </Form>


      {/* Kayıt hatası alınırsa   */}
      {this.state.apiHasInsertError ?
        <MyMessage error content='Hatalı işlem! Kayıt zaten mevcut olabilir. Lütfen kontrol edin.' />
        : null}

    </Segment>
  }

  myRender=()=> {
    const { data, id, title } = this.props; //data > from reducer

    let dataFiltered = data;
    const isSistemler = id === "sistemler";
    const isUlkeler = id === "ulkeler";

    // Data.Filter> Ekleme yapılarken tablo filtre ile girileni getirsin diye..
    const searchString = this.state.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      dataFiltered = dataFiltered.filter(({name}) => {
        return name.toLowerCase().match(searchString);
      });
    }

    // Kayıt varsa ekleme, uyarı ver. Aşağıda HeaderCell'de
    const count = _.size(dataFiltered);
    const recordExist = (count >0) && (searchString.length >0);
    const _inputIcon = 'pencil alternate';

    const params = {
                    id: this.props.id,
                    cid: this.props.cid,
                    store: store,
                    URL_GET: this.state.URL_GET
    }

    return (
      <div className="kvkk-content">
        <Header as='h2' onClick={this.handleHomeClick}>{title}</Header>

        <this.AddForm id={id} inputIcon = {_inputIcon} recordExist={recordExist} />
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
              <Table.HeaderCell>
                    Başlık
              </Table.HeaderCell>
              {isSistemler ? (
                <Table.HeaderCell className="headercell">
                  {" "}
                  Dahili{" "}
                </Table.HeaderCell>
              ) : null}
              {isUlkeler ? (
                <Table.HeaderCell className="headercell">
                  {" "}
                  Tel{" "}
                </Table.HeaderCell>
              ) : null}
              {isUlkeler ? (
                <Table.HeaderCell className="headercell">
                  {" "}
                  Güvenli{" "}
                </Table.HeaderCell>
              ) : null}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataFiltered?dataFiltered.map(item => (
                  <Table.Row key={item.pidm}>
                    <Table.Cell style={{textAlign:"left"}}>

                    <DeleteBoxTanim
                        pidm={item.pidm}
                        name={item.name}
                        params={params}
                      />

                    </Table.Cell>

                    {isSistemler ? (
                      <Table.Cell style={{ textAlign: "center" }}>
                        {item.local? ( <Icon name="hdd" color="orange" /> )
                        :( <Icon name="mixcloud" color="blue" /> )}
                      </Table.Cell>
                    ) : null}
                    {isUlkeler ? (
                      <Table.Cell style={{ textAlign: "center" }}>
                        {item.phone_area}
                      </Table.Cell>
                    ) : null}
                    {isUlkeler ? (
                      <Table.Cell style={{ textAlign: "center" }}>
                        {item.secure ? <Icon name="check circle" color="green" /> : null}
                      </Table.Cell>
                    ) : null}

                  </Table.Row>
                )):null
            }
          </Table.Body>
        </Table>
      </div>
    );
  }

  render() {
    const { isLoading, apiIsOnline } = this.state;
    return (
      <KVKKLayout>
      { !isLoading && apiIsOnline?
         this.myRender()
         :!isLoading&&!apiIsOnline?
         <Message error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         :null
      }
      </KVKKLayout>
    );
  }
}

const mapStateToProps = state => ({ data: state.data, cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(Tanimlar);
