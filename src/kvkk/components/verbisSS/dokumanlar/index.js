import React, { PureComponent } from "react";
import { Table } from "semantic-ui-react";
import KVKKLayout from "../../../layout";

import { config } from "../../../../config";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";

import AddBox from "./addbox";
import DeleteBox from "./deletebox";

import {MyMessage, MyLoader, refreshStoreData} from "../../myComponents";

import '../../../kvkk.css';

class SSDokumanlar extends PureComponent {
  state = {
    didMount: false,
    isLoading: true,

    apiIsOnline: false,

  };

   async componentDidMount() {
      const URL_GET =  config.URL_GetSSDokumanlar
      const {cid} =  this.props

      //Addbox için
      this.setState({ apiIsOnline: true, didMount: true });
      await refreshStoreData(store, cid, URL_GET)

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }


  myRender() {
    const { data, cid, uid } = this.props; //data > from reducer
    const params = { store, cid, uid }

    return (
      <div className="kvkk-content">
        <h2 className="ui header">KV Içeren Dokümanlar</h2>
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
              <Table.HeaderCell style={{ width: "30%" }}> Süreç Sahibi </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "70%" }}> KV Dokumanlar </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?data.map((row) => (
              <Table.Row key={row.birim_pidm}>
                <Table.Cell style={{ verticalAlign: 'top' }}>{row.birim_name}</Table.Cell>
                <Table.Cell>
                     {row.dokumanlar?row.dokumanlar.map( item => ( //pidm -> unique keyidir

                            <DeleteBox
                                key={item.pidm}
                                selectedPidm={item.pidm}
                                dokuman_name={item.dokuman_name}
                                yayin_name={item.yayin_name}
                                params = {params}
                            />

                        )):null}
                        <AddBox
                            birim_pidm={row.birim_pidm}
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
      <KVKKLayout>
        {!isLoading && apiIsOnline? this.myRender()
         : !isLoading&&!apiIsOnline? <MyMessage error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         : <MyLoader /> // sayfa ilk yüklendiğinde ekranda birşey gözükmemesi için null yapıldı.. buraya loading koyabilirsin.
        }

      </KVKKLayout>
    );
  }
}

const mapStateToProps = state => ({ data: state.data, cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(SSDokumanlar);