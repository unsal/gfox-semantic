import React, { Component } from "react";
import { Table, Message } from "semantic-ui-react";
import KVKKLayout from "../../layout";

import axios from "axios";
import { getAPI } from "../../../config";

//Redux
import { connect } from "react-redux";
import { store } from "../../../reducer";
import { updateStoreData } from "../../../reducer/actions";

import AddBoxKurum from "./AddBoxKurum";
import DeleteBoxKurum from "./DeleteBoxKurum";

class SSKurumlar extends Component {
  state = {
    didMount: false,
    isLoading: true,

    apiIsOnline: false,
  };

  componentDidMount() {
    const url = getAPI.getPaylasilanKurumlar;
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


  _render() {
    const { data } = this.props; //data > from reducer

    return (
      <div className="kvkk-content">
        <h2 className="ui header">Paylaşılan Kurumlar</h2>
        <Table
          sortable
          celled
          fixed
          compact
          size="large"
          style={{ width: "100%" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "50%" }}> Süreç Sahibi </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "50%" }}> Paylaşılan Kurumlar </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((key) => (
              <Table.Row key={key.birim_pidm}>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.birim_name}</Table.Cell>
                <Table.Cell>
                     {key.kurumlar.map( ({pidm, kurum_pidm, kurum_name}) => ( //pidm -> birim_pidm, kurum_pidm satırının unique keyidir
                        // <Label key={kurum_pidm} as='a' content={kurum_name.toUpperCase()} icon='remove' style={{margin:"1px"}} />

                            <DeleteBoxKurum
                                key={pidm}
                                pidm={pidm}
                                name={kurum_name}
                                store={store}
                                data={data}
                            />

                        ))}

                        <AddBoxKurum
                            pidm={key.birim_pidm}
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
          this._render()
         : !isLoading&&!apiIsOnline?
          <Message error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         : null
        }
      </KVKKLayout>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });
export default connect(mapStateToProps)(SSKurumlar);
