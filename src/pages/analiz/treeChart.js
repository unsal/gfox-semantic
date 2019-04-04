import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { Header, Segment } from "semantic-ui-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";

function TreeChart(props) {
  const [data, setData] = useState([]);

  const getOption = (layout, data) => ({
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove"
    },
    series: [
      {
        type: "tree",
        layout,

        data: [data],

        top: "1%",
        left: "7%",
        bottom: "1%",
        right: "20%",

        symbolSize: 7,

        label: {
          normal: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 9
          }
        },

        leaves: {
          label: {
            normal: {
              position: "right",
              verticalAlign: "middle",
              align: "left"
            }
          }
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  });

  useEffect(() => {
    const { cid } = props.auth.cids
    const { name } = props;
    const type = "tree";
    const params = { cid, type, name };

    const fetchData = 
          async ()=> {
            const result = await axios.post(config.URL_CHART, params, config.axios);
            setData(result.data)
          }

    try {
      fetchData()
    } catch (err) {
      console.log("TreeChart > SQL Error...", err);
    }
  }, [])
 
    const { layout } = props;
    return (
      <Segment basic>
        <Header>{props.title}</Header>
        {data && <ReactEcharts style={{ height: "2000px" }} option={getOption(layout, data)} /> }
      </Segment>
    );

}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(TreeChart);
