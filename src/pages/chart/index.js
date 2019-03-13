import React, { PureComponent } from "react";
import { Icon, Label, Segment, Grid } from "semantic-ui-react";

import Layout from "../layout";
import Login from "../auth/login";
import TreeChart from "./treeChart";
import MapChart from "./mapChart";
import PieChart from "./pieChart";
import DonutChart from "./donutChart";
import BarChart from "./barChart";

const menuitems = [
  {
    title: "KV",
    name: "kv",
    type: "piebar",
    color: "red",
    icon: "chart bar",
    active: true
  },
  { title: "Kv Harita", name: "map", type: "map", color: "red", icon: "world" },
  {
    title: "Profil Kv Ağacı",
    name: "profil",
    type: "tree",
    color: "orange",
    icon: "sitemap"
  },
  {
    title: "Birim Kv Ağacı",
    name: "birim",
    type: "tree",
    color: "orange",
    icon: "sitemap"
  },
  {
    title: "Bölüm Kv Ağacı",
    name: "bolum",
    type: "tree",
    color: "orange",
    icon: "sitemap",
    layout: "radial"
  },
  {
    title: "Süreç Kv Ağacı",
    name: "surec",
    type: "tree",
    color: "orange",
    icon: "sitemap"
  },
  {
    title: "Kv Profil Oranı",
    name: "profil",
    type: "donut",
    color: "yellow",
    icon: "circle outline"
  },
  {
    title: "Kv Birim Oranı",
    name: "birim",
    type: "donut",
    color: "yellow",
    icon: "circle outline"
  },
  {
    title: "Kv Bölüm Oranı",
    name: "bolum",
    type: "donut",
    color: "yellow",
    icon: "circle outline"
  },
  {
    title: "Kv Süreç Oranı",
    name: "surec",
    type: "donut",
    color: "yellow",
    icon: "circle outline"
  },
  {
    title: "Kv Kullanan Kurumlar",
    name: "kurumlar_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    title: "Kv Kullanılan Sistemler",
    name: "sistemler_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    title: "Kv Bulundurulan Ortamlar",
    name: "ortamlar_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    title: "Kv Aktarılan Ülkeler",
    name: "ulkeler_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  }
];

export default class Component extends PureComponent {
  componentDidMount() {
    menuitems.map(
      ({ active, title, name, type, layout }) =>
        active && this.setState({ activeItem: { title, name, type, layout } })
    );
  }

  MenuBar = () => {
    const handleClick = (e, { title, name, type, layout }) =>
      this.setState({ activeItem: { title, name, type, layout } });

    return menuitems.map((row, index) => (
      <Label
        key={index}
        as="a"
        title={row.title} //handleClick'te state'e atmak için
        name={row.name} //handleClick'te state'e atmak için
        type={row.type} //handleClick'te state'e atmak için
        layout={row.layout} //handleClick'te state'e atmak için
        style={{ marginTop: "3px" }}
        color={row.color}
        active={this.state.activeItem.name === row.name}
        onClick={handleClick}
      >
        {row.title}
        <Icon name={row.icon} style={{ marginLeft: "5px" }} />
      </Label>
    ));
  };

  Content = () => {
    const { title, name, type, layout } = this.state.activeItem;
    // Dışardan çağrılan objelerin kopyası yaratılıyor.
    // Böyle yapmazsan Pie'dan Pie tıklayarak geçiş yaptığında değişiklik olmuyor.
    const Bar = () => <BarChart name={name} />;
    const Pie = () => <PieChart title={title} name={name} />;
    const Tree = () => <TreeChart title={title} name={name} layout={layout} />;
    const Map = () => <MapChart title={title} name={name} />;
    const Donut = () => <DonutChart title={title} name={name} />;

    const PieBar = () => (
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Pie />
          </Grid.Column>
          <Grid.Column>
            <Bar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    return (
      <Segment basic style={{ marginTop: "1em" }}>
        {type === "pie" ? (
          <Pie />
        ) : type === "piebar" ? (
          <PieBar />
        ) : type === "tree" ? (
          <Tree />
        ) : type === "map" ? (
          <Map />
        ) : type === "donut" ? (
          <Donut />
        ) : null}
      </Segment>
    );
  };

  render() {
    return (
      <Login>
        <Layout>
          <this.MenuBar />
          <this.Content />
        </Layout>
      </Login>
    );
  }
}
