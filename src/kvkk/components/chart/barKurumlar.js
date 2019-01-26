import React, { PureComponent } from "react";
import ReactEcharts from 'echarts-for-react';

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../../config";
import {MyLoader} from "../mycomponents"


class Component extends PureComponent {
  state = {}

  getOption = () => (
    {
      title: {
        text: 'En Fazla KV Aktarılan Kurumlar ',
        subtext: 'İLK 10',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}"
      },
      color: [ '#546570'],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: this.state.names
      },
      series: [{
        data: this.state.values,
        type: 'bar'
      }]
    }
  )


  setStateData = (data) => {
    let names = []
    let values = []

    data.map(({ name, value }) => {
      names = names.concat(name)
      values = values.concat(value)
      return null
    }
    )

    this.setState({ data, names, values })
  }

  async componentDidMount() {
    const { cid } = this.props
    const params = { cid }

    try {
      const result = await axios.post(config.URL_CHART_MAX_KURUMLAR, params, config.axios)
      const data = await result.data ? result.data : [];
      await this.setStateData(data)
    } catch (err) {
      console.log("Chart Query Failure!", err);
    }
  }

  render() {
    return this.state.data ? <ReactEcharts option={this.getOption()} /> : <MyLoader />
  }
}


const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);


