import React, { PureComponent } from "react";
import ReactEcharts from 'echarts-for-react';
// import 'echarts/lib/chart/map.js';
import 'echarts/map/js/world.js';

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";
import {MyLoader} from "../../components/mycomponents"


class Component extends PureComponent {
  state = { maxValue: 1000  } //default

  getOption = () => (
    {
      title: {
        text: 'KV Aktarılan Ülkeler',
        left: 'center',
        top: 'top'
    },
    visualMap: {
        min: 0,
        max: this.state.maxValue,
        text:['High','Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue','yellow', 'orangered']
        }
    },
    series: [
        {
            name: 'KV Aktarılan Ülkeler',
            type: 'map',
            mapType: 'world',
            roam: true,
            itemStyle:{
                emphasis:{label:{show:true}}
            },
            data: this.state.data
        }
    ]
    }
)


  async componentDidMount() {
    const { cid } = this.props
    const params = { cid }

    try {
      const result = await axios.post(config.URL_CHART_MAP, params, config.axios)
      const data = await result.data ? result.data : [];
      // [{"name", "value", "maxvalue"}]

      //get max value from json row
      let maxValue = 0
      data.map(key => maxValue = key.maxvalue)

      await this.setState({data, maxValue})
    } catch (err) {
      console.log("KVChart > SQL Error...", err);
    }
  }

  render() {
    return this.state.data? <ReactEcharts option={this.getOption()} style={{height:'600px'}}/>:<MyLoader />
  }
}


const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);


