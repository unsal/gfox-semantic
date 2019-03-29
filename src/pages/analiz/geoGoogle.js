import React, { PureComponent } from "react";
import Chart from 'react-google-charts';
import { Header, Segment } from "semantic-ui-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";
import {MyLoader} from "../../components/gfox"


class Component extends PureComponent {
  state = { maxValue: 1000  } //default

  async componentDidMount() {
    const { cid } = this.props.auth.cids;
    const type = "geo"
    const params = { cid , type}

    try {
      const result = await axios.post(config.URL_CHART, params, config.axios)
      const data = await result.data ? result.data : [];

      await this.setState({data})
    } catch (err) {
      console.log("GeoChart Axios Error !!", err);
    }
  }

  GeoChart = () => <Chart
  width={'800px'}
  height={'600px'}
  chartType="GeoChart"
  data={this.state.data}
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  mapsApiKey="YOUR_KEY_HERE"
  rootProps={{ 'data-testid': '1' }}
/>

  render() {
    return (
    <Segment basic>
    <Header>{this.props.title}</Header>
    {this.state.data ? <this.GeoChart /> : <MyLoader />}
    </Segment>
    )
  }
}


const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(Component);


