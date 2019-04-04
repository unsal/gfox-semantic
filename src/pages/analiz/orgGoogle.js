import React, { useState, useEffect } from "react";
import Chart from 'react-google-charts';
import { Header, Segment } from "semantic-ui-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";

function OrgGoogle(props) { 
  const [data, setData] = useState([])

  useEffect(() => {
    const {cid} = props.auth.cids
    const { name } = props;
    const type = "org";
    const params = { cid, type, name };

    const fetchData = 
      async () => {
        const result = await axios.post(config.URL_CHART, params, config.axios);
        setData(result.data)
      }
   
    try {
      fetchData();
    } catch (err) {
      console.log("Google Org API Error ! ", err);
    }

  }, [])


const OrgChart = 
      () => <Chart
              width={'100%'}
              height={'100%'}
              chartType="OrgChart"
              loader={<div>Yükleniyor...</div>}
              data={data}
              options={{
                allowHtml: true,
                size: "small"
              }}
            />


    return (
      <Segment basic>
        <Header>{props.title}</Header>
        {data && <OrgChart />} 
      </Segment>
    );
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(OrgGoogle);
