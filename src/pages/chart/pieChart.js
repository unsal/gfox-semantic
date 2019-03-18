import React, { PureComponent } from "react";
import ReactEcharts from "echarts-for-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";
import { MyLoader } from "../../components/gfox";

class Component extends PureComponent {
  state = {};

  getOption = (text, name) => ({
    title: {
      text,
      subtext: "ILK 20",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name,
        type: "pie",
        radius: "75%",
        center: ["50%", "60%"],
        data: this.state.data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });

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

  render() {
    const { title, name } = this.props;
    return this.state.data ? (
      <ReactEcharts
        style={{ height: "500px" }}
        option={this.getOption(title, name)}
      />
    ) : (
      <MyLoader />
    );
  }
}

const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);
