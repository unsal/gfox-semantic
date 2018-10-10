import React, { Component } from "react";
import { Button, Modal, Icon, Form, Checkbox } from "semantic-ui-react";
import { getAPI } from "../../../config";
import axios from "axios";
import { updateStoreData } from "../../../reducer/actions";

export default class AddFormTanim extends Component {
  // props: id, store, data, title
  constructor(props) {
    super(props);
    this.state = {
      url: getAPI.addTanimlar,
      open: false,
      dimmer: true,

      //sistemlerden default harici
      local: false,

      //ulkelerden
      secure: false,
      nextPidm: null,
    };
  }

 // Tanımlar tablosuna yeni pidm eklemek için. Data concat edince array must have unique key hatası verdiği için..
 getNextPidm() {
   const _url = getAPI.getNextPidm+"/"+this.props.id;
   let nextPidm = 0;

   axios
      .get(_url)
      .then( json => {
              const data = json.data;
              data.map(({ pidm }) => ( nextPidm = pidm ));
            })
      .catch(err => {
        console.log(err);
      });

   return nextPidm;

 }

  // FIXME: Handle Submit()
  handleSubmit = event => {
    event.preventDefault();
    const _form = new FormData(event.target);
    // const id = formData.get("id")

    //Sistemler
    const _pidm = this.getNextPidm();
    const _name = _form.get("name");
    const _local = this.state.local;
    const _phone_area = _form.get("phone_area");
    const _secure = this.state.secure;

    _form.set("local",_local);
    _form.set("secure",_secure);

    //Ulkeler
    // formData.set("secure",this.state.secure);

    axios({
      method: "POST",
      url: this.state.url,
      data: _form
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(() => {
        const { data, store } = this.props;
        const _data =
              data.concat([{ pidm: _pidm, name: _name, local:_local, phone_area: _phone_area, secure: _secure }])
              .sort((a, b) => {
               var nameA = a.name.toUpperCase(); // ignore upper and lowercase
               var nameB = b.name.toUpperCase(); // ignore upper and lowercase
               if (nameA < nameB) {
                 return -1;
               }
               if (nameA > nameB) {
                 return 1;
               }

               // names must be equal
               return 0;

              }
              ); //first name less then the previous

        store.dispatch(updateStoreData(_data));
      })
      .then(() => {
        this.setState({local: false}) // yoksa hafızadaki son seçenek kalıyor
        this.close();
      })
      .catch(err => {
        console.log(err);
      });
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  // local handleSubmit'de kullanılır. Sistemler için
  handleLocal = (e, { checked }) => {
    this.setState({ local: checked});
  }

  //Güvenli Ülkeler
  handleSecure = (e, { checked }) => {
    this.setState({ secure: checked})
  }


  render() {
    const { open, dimmer } = this.state;
    const {id, title} = this.props;
    const isSistemler = id === "kvsistemler";
    const isUlkeler = id === "ulkeler";

    return (

      <div>
        <Icon
          color="blue"
          size="large"
          name="add circle"
          onClick={this.show(true)}
        />
        <Modal size="tiny" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header> {title}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                  <input type="hidden" name="id" value={id} />

                  <Form.Field> <label>Başlık</label> <input name="name" />
                  </Form.Field>

                  {isSistemler?
                  <Form.Field> <label>Dahili Sistem</label> <Checkbox toggle name="local" onChange={this.handleLocal} /> </Form.Field>
                  : null
                  }

                  {isUlkeler?
                  <Form.Field> <label>Tel Kodu</label> <input name="phone_area" /></Form.Field>
                  : null
                  }
                  {isUlkeler?
                  <Form.Field> <label>Güvenli Ülke</label> <Checkbox toggle name="secure" onChange={this.handleSecure}/> </Form.Field>
                  : null
                  }


                  <Button basic onClick={this.close}>Vazgeç</Button>
                  <Button type="submit" positive content="Ekle" />
              </Form>
            </Modal.Description>
          </Modal.Content>
          {/* <Modal.Actions>

          </Modal.Actions> */}
        </Modal>

      </div>
    );
  }
}
