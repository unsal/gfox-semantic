import React, { useState, useEffect } from "react";
import Chart from 'react-google-charts';
import { Header, Segment } from "semantic-ui-react";

import axios from "axios";

//Redux
import { connect } from "react-redux";
import { config } from "../../config";

function PieGoogle(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const { cid } = props.auth.cids
    const { name } = props;
    const type = "pie";
    const url = config.URL_CHART;
    const params = { cid, name, type };

    const fetchData = async () => {
      const result = await axios.post(url, params, config.axios);
      setData(result.data)
    }

    try {
      fetchData()
    } catch (err) {
      console.log("!! Axios URL Error !! ", err);
    }
  }, [])


  const PieGoogle = () => <Chart
      chartType="PieChart"
      loader={<div>Yükleniyor...</div>}
      data={data}
      options={{
        is3D: true,
        width: "900px",
        height: "500px",
        slices: {  0: {offset: 0.2}}
  }}
  // rootProps={{ 'data-testid': '1' }}
/>

  return (
        <Segment basic>
        <Header>{props.title}</Header>
        {data && <PieGoogle /> }
        </Segment>
    )
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(PieGoogle);
