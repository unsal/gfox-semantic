import React, { PureComponent } from "react";
import ReactEcharts from "echarts-for-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";
import { MyLoader } from "../../components/mycomponents";

class Component extends PureComponent {
  state = {};

  getOption = (name, dataX, dataY) => ({
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "5%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: dataX, //["xxx","yyy",...] döner
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name,
        type: "bar",
        barWidth: "60%",
        data: dataY // [1,2,4,5,2,..] döner
      }
    ]
  });

  async componentDidMount() {
    const { cid, name } = this.props;
    const type = "bar";
    const url = config.URL_CHART;
    const params = { cid, name, type };

    try {
      const result = await axios.post(url, params, config.axios);
      const data = (await result.data) ? result.data : [];
      await data.map(row =>
        this.setState({
          dataX: row.name,
          dataY: row.value,
          mount: true
        })
      );
    } catch (err) {
      console.log("!! Axios URL Error !! ", err);
    }
  }

  render() {
    const { name } = this.props;
    return this.state.dataX ? (
      <ReactEcharts
        style={{ width: "600px", height: "500px" }}
        option={this.getOption(name, this.state.dataX, this.state.dataY)}
      />
    ) : (
      <MyLoader />
    );
  }
}

const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);
