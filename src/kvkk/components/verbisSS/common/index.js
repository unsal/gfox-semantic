import React, { PureComponent } from "react";
import { Table, Message } from "semantic-ui-react";
import KVKKLayout from "../../../layout";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { store } from "../../../../reducer";
import { updateStoreData } from "../../../../reducer/actions";

import AddBox from "./addbox";
import DeleteBox from "./deletebox";

import '../../../kvkk.css';
import { config } from "../../../../config";
import {MyLoader} from '../../myComponents';


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

    didMount: false,
    isLoading: true,

    apiIsOnline: false,


  };


  componentDidMount() {
    const {URL_GET} = this.state;
    // console.log("Log:",URL_GET)
    axios
      .get(URL_GET)
      .then(json => {
        const data = json.data;
        store.dispatch(updateStoreData(data)); //store data güncelle
        this.setState({ apiIsOnline: true, didMount: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ apiIsOnline: false, didMount: true });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount !== this.state.didMount) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this.setState( {isLoading: false, didMount: false} )
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
                     {key.related_items.map( ({pidm, related_item_name}) => ( //related_item_name: api tarafında kurumlar, toplamakanallari ve kullanilansistemler için tek bir common api yazıldığı için: ordan gelen kolon adıdır
                      // related_item_pidm yerine pidm kullanıldu çünkü: tablodaki unique kayıt pidmine ihtiyaç var..
                            <DeleteBox
                                id={this.state.id}
                                URL_DELETE={this.state.URL_DELETE}
                                URL_GET={this.state.URL_GET} //Store Refresh için
                                key={pidm}
                                selectedPidm={pidm}
                                name={related_item_name}
                                store={store}
                            />

                        ))}

                        <AddBox
                            id={this.state.id} //Form submit ederken common alan belirlemek için
                            URL_GET= {this.state.URL_GET} // Store Refresh için
                            URL_ADD= {this.state.URL_ADD}
                            URL_OPTIONS={this.state.URL_OPTIONS} //dropdown için
                            birimPidm={key.birim_pidm}
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
        { !isLoading && apiIsOnline? this.render_()
         : !isLoading&&!apiIsOnline? <Message error header='API Bağlantı Hatası' content='Veriye erişilemiyor' />
         :  <MyLoader />
        }

      </KVKKLayout>
    );
  }
}


const mapStateToProps = state => ({ data: state.data });
export default connect(mapStateToProps)(Common);
