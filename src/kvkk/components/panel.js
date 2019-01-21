import React, { PureComponent } from "react";
import { Grid } from "semantic-ui-react";
import KVKKLayout from "../layout";
import Login from '../../auth/login'
import { connect } from "react-redux";
import {MyLoader} from "../components/mycomponents"

import ChartMaxKV from './chart/maxKV'
import ChartMaxKurumlar from './chart/maxKurumlar'
import ChartMaxProfiller from './chart/maxProfiller'
import ChartMaxSurecler from './chart/maxSurecler'
import ChartTalepler from './chart/talepler'

class Panel extends PureComponent {
  state = {
    isLoading: true,
    mounted: false
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mounted !== this.state.mounted) {
      this.setState({ isLoading: false });
    }
  }

  ShowCharts = () =>
    <Grid divided>
      <Grid.Row columns={3}>
        <Grid.Column><ChartMaxKV /></Grid.Column>
        <Grid.Column><ChartMaxProfiller /></Grid.Column>
        <Grid.Column><ChartMaxSurecler /></Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column><ChartMaxKurumlar /></Grid.Column>
        <Grid.Column><ChartTalepler /></Grid.Column>
      </Grid.Row>
    </Grid>


  render() {
    return <Login>
              <KVKKLayout>
                {this.state.isLoading ? <MyLoader />:<this.ShowCharts />}
              </KVKKLayout>
          </Login>
  }

}

const mapStateToProps = state => ({ cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(Panel);