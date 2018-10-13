import React, { Component } from "react";
import { Table, Message } from "semantic-ui-react";
import KVKKLayout from "../../../layout";

import axios from "axios";
import { config } from "../../../../config";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";
import { updateStoreData } from "../../../../reducer/actions";

import AddBox from "./AddBox";
import DeleteBox from "./DeleteBox";

import '../../../kvkk.css';
import {getURL, addURL, deleteURL, optionsURL} from "./related"



class Common extends Component {
  state = {
    //props
    title: this.props.title,
    ssMode: this.props.ssMode,

    //URLs
    URL_GET: getURL(this.props.ssMode),
    URL_ADD: addURL(this.props.ssMode),
    URL_DELETE: deleteURL(this.props.ssMode),
    URL_OPTIONS: optionsURL(this.props.ssMode),

    didMount: false,
    isLoading: true,

    apiIsOnline: false,


  };


  componentDidMount() {
    const url = this.state.URL_GET;
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
        <h2 className="ui header">{this.state.title}</h2>
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
              <Table.HeaderCell style={{ width: "60%" }}> {this.state.title}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((key) => (
              <Table.Row key={key.birim_pidm}>
                <Table.Cell style={{ verticalAlign: 'top' }}>{key.birim_name}</Table.Cell>
                <Table.Cell>
                     {key.kurumlar.map( ({pidm, related_item_name}) => ( //related_item_name: api tarafında kurumlar, toplamakanallari ve kullanilansistemler için tek bir common api yazıldığı için: ordan gelen kolon adıdır

                            <DeleteBox
                                URL_DELETE={this.state.URL_DELETE}
                                URL_GET={this.state.URL_GET} //Store Refresh için
                                key={pidm}
                                selectedPidm={pidm}
                                name={related_item_name}
                                store={store}
                            />

                        ))}

                        <AddBox
                            URL_GET= {this.state.URL_GET} // Store Refresh için
                            URL_ADD= {this.state.URL_ADD}
                            URL_OPTIONS={this.state.URL_OPTIONS} //dropdown için
                            birimPidm={key.birim_pidm}
                            store={store}
                            ssMode={this.state.ssMode} //Form submit ederken common alan belirlemek için
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
          <Message error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         : null
        }
      </KVKKLayout>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });
export default connect(mapStateToProps)(Common);
