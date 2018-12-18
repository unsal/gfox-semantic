import React, { PureComponent } from "react";
import { Table, Message } from "semantic-ui-react";
import KVKKLayout from "../../../layout";
import Login from '../../../../auth/login'

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";

import AddBox from "./addbox";
import DeleteBox from "./deletebox";

import '../../../kvkk.css';
import { config } from "../../../../config";
import {MyLoader, refreshStoreData, createDropdownOptions} from '../../myComponents';


class Common extends PureComponent {

  state = {
    //props
    title: this.props.title,
    id: this.props.id,

    //URLs
    URL_GET: config.URL_GetSSCommon+'/'+this.props.id,
    URL_ADD: config.URL_AddSSCommon,
    URL_DELETE: config.URL_DeleteSSCommon,
    URL_OPTIONS: config.URL_GetTanimlar+'/'+this.props.id,

    options: null, //yüklenecek dropdown options içindir. performans için addbox'tan buraya taşındı. yoksa her bir satır için tekrr tekrar yüklüyordu.

    didMount: false,
    isLoading: true,

    apiIsOnline: false,

  };


  async componentDidMount() {
     const {cid} = this.props
     const {URL_OPTIONS, URL_GET} = this.state
     await refreshStoreData(store, cid, URL_GET)

     const options = await createDropdownOptions(URL_OPTIONS, cid)

     this.setState({ apiIsOnline: true, didMount: true, options });
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this.setState( {isLoading: false, didMount: false} )
  }


  myRender=()=> {
    const { data, id, title, cid, uid} = this.props; //data, cid, uid > from reducer
    const {URL_DELETE, URL_GET, URL_ADD, options} = this.state
    const params = { id, cid, uid, URL_DELETE, URL_GET, URL_ADD, options, store }

    return (
      <div className="kvkk-content">
        <h2 className="ui header">{title}</h2>
        <Table
          sortable
          celled
          fixed
          compact='very'
          size="small"
          style={{ width: "100%" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "40%" }}> Süreç Sahibi </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "60%" }}> {title}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?data.map(item => (
              <Table.Row key={item.birim_pidm}>
                <Table.Cell style={{ verticalAlign: 'top' }}>{item.birim_name}</Table.Cell>
                <Table.Cell>
                     {item.related_items?item.related_items.map( related => ( //related_item_name: api tarafında kurumlar, toplamakanallari ve kullanilansistemler için tek bir common api yazıldığı için: ordan gelen kolon adıdır
                      // related_item_pidm yerine pidm kullanıldu çünkü: tablodaki unique kayıt pidmine ihtiyaç var..
                            <DeleteBox
                                key={related.pidm}
                                selectedPidm={related.pidm}
                                name={related.related_item_name}
                                params= {params}
                            />

                        )):null}

                        <AddBox
                            birimPidm={item.birim_pidm}
                            params = {params}
                        />

                </Table.Cell>
              </Table.Row>
            )):null}
          </Table.Body>
        </Table>
      </div>
    );
  }

  render() {
    const { isLoading, apiIsOnline } = this.state;
    return (
    <Login>
      <KVKKLayout>
        { !isLoading && apiIsOnline? this.myRender()
         : !isLoading&&!apiIsOnline? <Message error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         :  <MyLoader />
        }
      </KVKKLayout>
    </Login>
    );
  }
}


const mapStateToProps = state => ({ data: state.data, cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(Common);
