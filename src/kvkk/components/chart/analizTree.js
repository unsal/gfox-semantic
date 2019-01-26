import React, { PureComponent } from "react";
import ReactEcharts from 'echarts-for-react';
import { Header, Segment } from "semantic-ui-react";
import {MyLoader} from "../mycomponents"

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../../config";


class Component extends PureComponent {
  state = { }

  getOption = () => (
    {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
            type: 'tree',

            data: [this.state.data],

            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',

            symbolSize: 7,

            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 9
                }
            },

            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }
    ]

  }
)

  async componentDidMount() {
    const { cid, url } = this.props
    const params = { cid }

    try {
      const result = await axios.post(url, params, config.axios)
      const data = await result.data ? result.data : [];
      // console.log(JSON.stringify(data))
      await this.setState({data})
    } catch (err) {
      console.log("TreeChart > SQL Error...", err);
    }
  }

  render() {
    return <Segment basic>
            <Header>{this.props.title}</Header>
              {this.state.data? <ReactEcharts option={this.getOption()} />:<MyLoader />}
            </Segment>
  }
}


const mapStateToProps = state => ({ cid: state.cid });
export default connect(mapStateToProps)(Component);


