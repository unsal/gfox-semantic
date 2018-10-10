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
// import AddBoxTanim from "./AddBoxTanim";
import './Tanimlar.css';
import _ from 'lodash';

class Tanimlar extends Component {
  state = {
    // bu ikisi
    didMount: false,
    isLoading:true,

    apiIsOnline: false, // data load ederken
    apiHasInsertError: false, // kayıt eklerken
    apiInsertSuccessfull: false, // kayıt başarı ile eklendiyse
    searchString: '', // girilen texte göre datayı filtrelemesi için gerekli alan
    // Form Fields
    formId: '',
    formLocal: false,
    formName: '',
    formPhoneArea: '',
    formSecure: false,

    selectedTanimPidm: 0   //Seçilmiş tanımı silmek için
  };

  loadData() {
    const urlGET= getAPI.getTanimlar + "/" + this.props.id;
    let data =[];
    axios
      .get(urlGET) //api den data yükler
      .then(res => {
        data = res.data;
        store.dispatch(updateStoreData(data)); //store data güncelle
        this.setState({ apiIsOnline: true, didMount: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ apiIsOnline: false });
      });
  }

  componentDidMount() {
     this.setState({ formId: this.props.id})
     this.loadData();
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

    const urlADD= getAPI.addTanimlar;
    axios({ method: "POST", url: urlADD, data: form })
      .then(() => {
        this.loadData();
      })
      .then(()=> {
        // submit ettikten sonra mevcut değerleri resetlemek için
        this.setState({
          apiHasInsertError: false,
          apiInsertSuccessfull: true,
          formName: '', formLocal: false, formPhoneArea:'', formSecure:''});
      })
      .catch(err => {
        console.log(err);
        this.setState({apiHasInsertError: true, apiInsertSuccessfull: false})
      });
  }

  handleChangeName= (event)=> {
    event.preventDefault();
    this.setState({
      searchString: event.target.value,
      apiInsertSuccessfull: false, // zemin rengini resetlemesi için
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
          this.loadData();
          console.log("Escape pressed...")
    } else if (event.keyCode===27) {
           this.handleSubmit()
    }
  }

  handleHomeClick =(event)=>{
    event.preventDefault();
    console.log("Home Clicked...");
  }

  AddBox =(props)=> {
    const { id, inputIcon } = props;
    const isSistemler = id ==="kvsistemler";
    const isUlkeler = id === "ulkeler";

    return (
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
    )
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
    // Kayıt yoksa Gri, varsa Kırmızı, başarı ile eklenirse yeşil olması için
    // const _bgcolor = !recordExist?"#F0F0F0"
    //         :this.state.apiInsertSuccessfull?"#C1EFB2"
    //         :"#FDBCB8";
    const _inputIcon = !recordExist?'pencil alternate'
            :this.state.apiInsertSuccessfull?'check'
            :'remove';


    return (
      <div className="kvkk-content">
        <Header as='h2' onClick={this.handleHomeClick}>{title}</Header>

        {/* Form */}
        <Segment basic compact className="segment-form" >

        <this.AddBox id={this.props.id} inputIcon={_inputIcon} recordExist={recordExist}/>

        {/* Kayıt sonrası uyarı Mesajı Bölümü */}
        {this.state.apiInsertSuccessfull?
            <Message success header='İşlem tamam' content='Başarı ile kaydedildi' />
        :null}

        {/* Kayıt hatası alınırsa   */}
        {this.state.apiHasInsertError?
          <Message error header='Hata!' content='Hatalı işlem! Kayıt zaten mevcut olabilir. Lütfen kontrol edin.' />
        :null}


        </Segment>

        <Table
          sortable
          celled
          fixed
          compact
          size="large"
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
