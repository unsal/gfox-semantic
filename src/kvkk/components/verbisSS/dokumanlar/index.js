import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import KVKKLayout from "../../../layout";

import axios from "axios";
import { getAPI } from "../../../../config";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";
import { updateStoreData } from "../../../../reducer/actions";

import AddBox from "./AddBox";
import DeleteBox from "./DeleteBox";

import {MyMessage, MyLoader} from "../../myComponents";

import '../../../kvkk.css';

class SSDokumanlar extends Component {
  state = {
    didMount: false,
    isLoading: true,

    apiIsOnline: false,
  };

  componentDidMount() {
    const url = getAPI.getSSDokumanlar;
    axios
      .get(url)
      .then(json => {
        const data = json.data;
        store.dispatch(updateStoreData(data)); //store data güncelle
        this.setState({ apiIsOnline: true, didMount: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ apiIsOnline: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }


  render_() {
    const { data } = this.props; //data > from reducer

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
            {data.map((key) => (
              <Table.Row key={key.birim_pidm}>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.birim_name}</Table.Cell>
                <Table.Cell>
                     {key.dokumanlar.map( ({pidm, dokuman_name, yayin_name}) => ( //pidm -> unique keyidir

                            <DeleteBox
                                key={pidm}
                                selectedPidm={pidm}
                                dokuman_name={dokuman_name}
                                yayin_name={yayin_name}
                                store={store}
                                data={data}
                            />

                        ))}
                        <AddBox
                            birim_pidm={key.birim_pidm}
                            store={store}
                        />



                </Table.Cell>
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
        {!isLoading && apiIsOnline?
          this.render_()
         : !isLoading&&!apiIsOnline?
          <MyMessage error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         : <MyLoader /> // sayfa ilk yüklendiğinde ekranda birşey gözükmemesi için null yapıldı.. buraya loading koyabilirsin.
        }
      </KVKKLayout>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });
export default connect(mapStateToProps)(SSDokumanlar);
