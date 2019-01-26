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


      title : {
        text: 'Profil Bazında En Fazla İşlenen KV ',
        subtext: 'İLK 10',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: 'Profil',
            type: 'pie',
            radius : '75%',
            center: ['50%', '60%'],
            data:this.state.data,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    }
  )


  async componentDidMount() {
    const { cid } = this.props
    const params = { cid }

    try {
      const result = await axios.post(config.URL_CHART_MAX_PROFILLER, params, config.axios)
      const data = await result.data ? result.data : [];
      await this.setState({data})
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


