import React, { PureComponent } from "react";
import ReactEcharts from 'echarts-for-react';

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";
import {MyLoader} from "../../components/gfox"

class Component extends PureComponent {
  state = {}

  getOption = () => (
    {
      title: {
        text: 'Talepler',
        subtext: '2019',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}"
      },
      color: ['#61a0a8'],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.names
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.state.values,
        type: 'line',
        // smooth: true
        // areaStyle: {}
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

    this.setState({ data, names, values})
  }


  async componentDidMount() {
    const { cid } = this.props
    const params = { cid }

    try {
      const result = await axios.post(config.URL_CHART_TALEPLER, params, config.axios)
      const data = await result.data ? result.data : [];
      await this.setStateData(data)
      // await result.data.map(({ name }) =>  titles = titles.concat(name) )
      // await this.setState({ data, titles })
    } catch (err) {
      console.log("KVChart > SQL Error...", err);
    }
  }

  render() {
    return this.state.data ? <ReactEcharts option={this.getOption()} /> : <MyLoader />
  }
}


const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);


