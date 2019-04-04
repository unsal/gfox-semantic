import React, { useState, useEffect } from "react";
import Chart from 'react-google-charts';
import { Header, Segment } from "semantic-ui-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";


function GeoGoogle(props) {
  const [data, setData] = useState([]);

  useEffect(() => {

    const { cid } = props.auth.cids;
    const type = "geo"
    const params = { cid , type}

    const fetchData = async () => {
      const result = await axios.post(config.URL_CHART, params, config.axios)
      setData(result.data)
    }
  
    try {
      fetchData()
    } catch (err) {
      console.log("GeoChart Axios Error !!", err);
    }
  
  }, [])


  const GeoChart = () => <Chart
        width={'800px'}
        height={'600px'}
        chartType="GeoChart"
        data={data}
        mapsApiKey="YOUR_KEY_HERE"
        rootProps={{ 'data-testid': '1' }}
    />

    return (
        <Segment basic>
        <Header>{props.title}</Header>
        {data && <GeoChart />}
        </Segment>
    )
}


const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(GeoGoogle);


