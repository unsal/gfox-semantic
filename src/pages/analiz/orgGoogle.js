import React, { PureComponent } from "react";
import Chart from 'react-google-charts';
import { Header, Segment } from "semantic-ui-react";
import { MyLoader } from "../../components/gfox";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";

class Component extends PureComponent {
  state = {};



  async componentDidMount() {
    const { cid, name } = this.props;
    const type = "org";
    const params = { cid, type, name };

    try {
      const result = await axios.post(config.URL_CHART, params, config.axios);
      const data = (await result.data) ? result.data : [];
      // console.log(JSON.stringify(data))
      await this.setState({ data });
    } catch (err) {
      console.log("Google Org API Error ! ", err);
    }
  }


  OrgChart = () => <Chart
  width={'100%'}
  height={'100%'}
  chartType="OrgChart"
  loader={<div>Yükleniyor...</div>}
  data={this.state.data}
  options={{
    allowHtml: true,
    size: "small"
  }}
/>


  render() {
    return (
      <Segment basic>
        <Header>{this.props.title}</Header>
        {this.state.data ? (
         <this.OrgChart />
        ) : (
          <MyLoader />
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);
