import React, { PureComponent, createRef } from "react";
import { Menu, Icon } from "semantic-ui-react";

import Layout from "../layout";
import Login from "../auth/login";
import TreeChart from "./treeChart";
import MapChart from "./mapChart";
import PieChart from "./pieChart";
import DonutChart from "./donutChart";

// import "./index.css";
import "./index.css";

const menuitems = [
  {
    title: "KV",
    name: "kv",
    type: "pie",
    icon: "chart pie",
    active: true
  },
  { title: "Kv Harita", name: "map", type: "map", color: "red", icon: "world" },
  {
    title: "Profil - Kv",
    name: "profil",
    type: "tree",
    icon: "sitemap"
  },
  {
    title: "Birim - Kv",
    name: "birim",
    type: "tree",
    icon: "sitemap"
  },
  {
    title: "Bölüm - Kv",
    name: "bolum",
    type: "tree",
    icon: "sitemap",
    layout: "radial"
  },
  {
    title: "Süreç - Kv ",
    name: "surec",
    type: "tree",
    icon: "sitemap"
  },
  {
    title: "Profil - Kv",
    name: "profil",
    type: "donut",
    icon: "life ring"
  },
  {
    title: "Birim - Kv",
    name: "birim",
    type: "donut",
    color: "yellow",
    icon: "life ring"
  },
  {
    title: "Bölüm - Kv",
    name: "bolum",
    type: "donut",
    color: "yellow",
    icon: "life ring"
  },
  {
    title: "Süreç - Kv",
    name: "surec",
    type: "donut",
    color: "yellow",
    icon: "life ring"
  },
  {
    title: "Aktarım Yapılan Kurumlar",
    name: "kurumlar_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    title: "Sistemler - Kv",
    name: "sistemler_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    title: "Ortamlar - Kv",
    name: "ortamlar_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    title: "Ülkeler - Kv",
    name: "ulkeler_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  }
];

export default class Analiz extends PureComponent {
  componentDidMount() {
    menuitems.map(
      ({ active, title, name, type, layout }) =>
        active &&
        this.setState({
          activeMenu: {
            title,
            name,
            type,
            layout
          }
        })
    );
  }

  ChartMenu = () => {
    const handleClick = (e, { title, name, type, layout }) =>
      this.setState({
        activeMenu: { title, name, type, layout }
      });

    const { activeMenu } = this.state;

    return (
      <div className="chart-menu">
        <Menu text vertical>
          {menuitems.map((row, index) => (
            <Menu.Item
              name={row.name}
              key={index}
              title={row.title} //handleClick'te state'e atmak için
              type={row.type} //handleClick'te state'e atmak için
              layout={row.layout} //handleClick'te state'e atmak için
              active={activeMenu.name === row.name}
              onClick={handleClick}
            >
              <Icon name={row.icon} color="teal" />
              {row.title}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  };

  ChartCanvas = () => {
    const { title, name, type, layout } = this.state.activeMenu;
    // Dışardan çağrılan objelerin kopyası yaratılıyor.
    // Böyle yapmazsan Pie'dan Pie tıklayarak geçiş yaptığında değişiklik olmuyor.
    const Pie = () => <PieChart title={title} name={name} />;
    const Tree = () => <TreeChart title={title} name={name} layout={layout} />;
    const Map = () => <MapChart title={title} name={name} />;
    const Donut = () => <DonutChart title={title} name={name} />;

    return (
      <div className="chart-canvas">
        {type === "pie" ? (
          <Pie />
        ) : type === "tree" ? (
          <Tree />
        ) : type === "map" ? (
          <Map />
        ) : type === "donut" ? (
          <Donut />
        ) : null}
      </div>
    );
  };

  contextRef = createRef();

  render() {
    return (
      <Login>
        <Layout showLeftMenu={true}>
          <div className="chart-container">
            <this.ChartMenu />
            <this.ChartCanvas />
          </div>
        </Layout>
      </Login>
    );
  }
}
