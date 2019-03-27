import React, { PureComponent } from "react";
import Chart from 'react-google-charts';
import { Header, Segment } from "semantic-ui-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";
import { MyLoader } from "../../components/gfox";

class Component extends PureComponent {
  state = {};

  async componentDidMount() {
    const { cid, name } = this.props;
    const type = "pie";
    const url = config.URL_CHART;
    const params = { cid, name, type };

    try {
      const result = await axios.post(url, params, config.axios);
      const data = (await result.data) ? result.data : [];
      await this.setState({ data, mount: true });
    } catch (err) {
      console.log("!! Axios URL Error !! ", err);
    }
  }

  PieGoogle = () => <Chart
  chartType="PieChart"
  loader={<div>Yükleniyor...</div>}
  data={this.state.data}
  options={{
    is3D: true,
    width: "900px",
    height: "500px",
    slices: {  0: {offset: 0.2}}
  }}
  // rootProps={{ 'data-testid': '1' }}
/>

  render() {
    return (
    <Segment basic>
    <Header>{this.props.title}</Header>
    {this.state.data ? <this.PieGoogle /> : <MyLoader />}
    </Segment>
    )
  }
}

const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);
