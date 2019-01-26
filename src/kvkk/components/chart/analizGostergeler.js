import React, { PureComponent } from "react";
import { Segment, Grid } from "semantic-ui-react";

import {MyLoader} from "../mycomponents"

import ChartMaxKV from './pieKV'
import ChartMaxKurumlar from './barKurumlar'
import ChartMaxProfiller from './pieProfiller'
import ChartMaxSurecler from './pieSurecler'
import ChartTalepler from './lineTalepler'

export default class Component extends PureComponent {
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
  <Segment basic style={{marginTop:'1em'}}>
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
</Segment>


  render() {
    return this.state.isLoading ? <MyLoader />:<this.ShowCharts />
  }

}
