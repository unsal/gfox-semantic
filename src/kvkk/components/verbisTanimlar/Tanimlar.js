import React, { Component } from "react";
import { Table, Icon, Header, Form, Input, Checkbox, Segment, Message } from "semantic-ui-react";
import KVKKLayout from "../../layout";

import axios from "axios";
import { getAPI } from "../../../config";

//Redux
import { connect } from "react-redux";
import { store } from "../../../reducer";
import { updateStoreData } from "../../../reducer/actions";

import DeleteBoxTanim from "./DeleteBoxTanim";
import './Tanimlar.css';
import '../../kvkk.css';
import _ from 'lodash';

import MyMessage from "../myComponents";

class Tanimlar extends Component {

    state = {
      url: getAPI.getTanimlar + "/" + this.props.id,
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


  refreshStoreData() {
    axios
      .get(this.state.url) //api den data yükler
      .then(this.setState({ searchString: '' }))
      .then(res => {
        store.dispatch(updateStoreData(res.data)); //store data güncelle
        this.setState({ apiIsOnline: true, didMount: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ apiIsOnline: false });
      });
  }

  componentDidMount() {
     this.setState({ formId: this.props.id})
     this.refreshStoreData();
  }

  // Herzaman iki değişken kullanmalısın yoksa hata verir
  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit =(event)=> {
    event.preventDefault();
      console.log("handle Submit ok")
    // const form = new FormData(event.target); //Form'dan alanları almak için bu kullanılır.
    const form = new FormData(event.target);
    // Must bu set; otherwise Python gets "AttributeError: 'NoneType' object has no attribute 'upper'"
    form.set("id", this.state.formId);
    form.set("name", this.state.formName);
    form.set("local",this.state.formLocal);
    form.set("phone_area",this.state.formPhoneArea);
    form.set("secure",this.state.formSecure);

    const url= getAPI.addTanimlar;
    axios({ method: "POST", url: url, data: form })
      .then(() => {
        this.refreshStoreData();
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
          this.refreshStoreData();
          console.log("Escape pressed...")
    } else if (event.keyCode===27) {
           this.handleSubmit()
    }
  }

  handleHomeClick =(event)=>{
    event.preventDefault();
    this.refreshStoreData();
  }

  AddForm = (props) => {

    const { id, inputIcon } = props;
    const isSistemler = id ==="kvsistemler";
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

  render_() {
    const { data, id, title } = this.props; //data > from reducer
    let _data = data;
    const isSistemler = id === "kvsistemler";
    const isUlkeler = id === "ulkeler";


    // Data.Filter> Ekleme yapılarken tablo filtre ile girileni getirsin diye..
    const searchString = this.state.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      _data = _data.filter(({name}) => {
        return name.toLowerCase().match(searchString);
      });
    }

    // Kayıt varsa ekleme, uyarı ver. Aşağıda HeaderCell'de
    const count = _.size(_data);
    const recordExist = (count >0) && (searchString.length >0);
    const _inputIcon = 'pencil alternate';

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
            {_data.map(({ pidm, name, local, phone_area, secure }) => (
              <Table.Row key={pidm}>
                <Table.Cell style={{textAlign:"left"}}>

                <DeleteBoxTanim
                    id={this.props.id}
                    pidm={pidm}
                    name={name}
                    store={store}
                    data={data}
                  />

                </Table.Cell>


                {isSistemler ? (
                  <Table.Cell style={{ textAlign: "center" }}>
                    {local? ( <Icon name="hdd" color="orange" /> )
                    :( <Icon name="mixcloud" color="blue" /> )}
                  </Table.Cell>
                ) : null}
                {isUlkeler ? (
                  <Table.Cell style={{ textAlign: "center" }}>
                    {phone_area}
                  </Table.Cell>
                ) : null}
                {isUlkeler ? (
                  <Table.Cell style={{ textAlign: "center" }}>
                    {secure ? <Icon name="check circle" color="green" /> : null}
                  </Table.Cell>
                ) : null}

              </Table.Row>
            ))}
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
         this.render_()
         :!isLoading&&!apiIsOnline?
         <Message error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         :null
      }
      </KVKKLayout>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });
export default connect(mapStateToProps)(Tanimlar);
