import React, { PureComponent } from "react";
import { Segment, Grid } from "semantic-ui-react";

import {MyLoader} from "../../components/mycomponents"

// import ChartMaxKV from './pieKV'
// import ChartTalepler from './lineTalepler'

import PieChart from './pieChart'


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

  PieChartKV = () =>  <PieChart title="Max KV" name="kv" />
  PieChartProfil = () =>  <PieChart title="Profil" name="profil" />
  PieChartBirim = () =>  <PieChart title="Birim ->> KV" name="birim"  />
  PieChartBolum = () =>  <PieChart title="Bölüm ->> KV" name="bolum" />
  PieChartSurec = () =>  <PieChart title="Süreç ->> KV" name="surec"  />
  PieChartKurumlar = () =>  <PieChart title="Kurumlar ->> KV" name="kurumlar_data"  />
  PieChartSistemler = () =>  <PieChart title="Sistemler ->> KV" name="sistemler_data"  />
  PieChartOrtamlar = () =>  <PieChart title="Ortamlar ->> KV" name="ortamlar_data"  />
  PieChartUlkeler = () =>  <PieChart title="Ülkeler ->> KV" name="ulkeler_data"  />


  ShowCharts = () =>
  <Segment basic style={{marginTop:'1em'}}>
    <Grid divided>
      <Grid.Row columns={5}>
        <Grid.Column><this.PieChartKV /></Grid.Column>
        <Grid.Column><this.PieChartProfil /></Grid.Column>
        <Grid.Column><this.PieChartBirim /></Grid.Column>
        <Grid.Column><this.PieChartBolum /></Grid.Column>
        <Grid.Column><this.PieChartSurec /></Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4}>
        <Grid.Column><this.PieChartKurumlar /></Grid.Column>
        <Grid.Column><this.PieChartSistemler /></Grid.Column>
        <Grid.Column><this.PieChartUlkeler /></Grid.Column>
        <Grid.Column><this.PieChartOrtamlar /></Grid.Column>
        {/* <Grid.Column><ChartTalepler /></Grid.Column> */}
      </Grid.Row>
    </Grid>
</Segment>


  render() {
    return this.state.isLoading ? <MyLoader />:<this.ShowCharts />
  }

}
