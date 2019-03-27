import React, { PureComponent, createRef } from "react";
import { Menu, Icon } from "semantic-ui-react";

import Layout from "../layout";
import Login from "../auth/login";
import TreeChart from "./treeChart";
import OrgGoogle from "./orgGoogle"
import PieGoogle from "./pieGoogle"
import GeoGoogle from "./geoGoogle"

import "./charts.css";

const menuitems = [

  {
    id: "16",
    title: "Organizasyon Şeması", //Google Org Charts
    name4chart: "org",
    type: "org",
    icon: "sitemap",
    active: true
  },
  {
    id: "17",
    title: "KV Aktarılan Ülkeler", //Google Org Charts
    name4chart: "geo",
    type: "geo",
    icon: "globe"
  },
  {
    id: "01",
    title: "KV",
    name4chart: "kv",
    type: "pie",
    icon: "chart pie",
  },

  {
    id: "11",
    title: "Kurum Bazında KV Aktarımı",
    name4chart: "kurumlar_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    id: "12",
    title: "Kv Girilen Sistemler",
    name4chart: "sistemler_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    id: "13",
    title: "Kv Tutulan Ortamlar",
    name4chart: "ortamlar_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    id: "14",
    title: "Kv Aktarılan Ülkeler",
    name4chart: "ulkeler_data",
    type: "pie",
    color: "olive",
    icon: "chart pie"
  },
  {
    id: "07",
    title: "Profil Kv Kullanımı",
    name4chart: "profil",
    type: "pie",
    icon: "chart pie"
  },
  {
    id: "08",
    title: "Birim Kv Kullanımı",
    name4chart: "birim",
    type: "pie",
    color: "yellow",
    icon: "chart pie"
  },
  {
    id: "09",
    title: "Bölüm Kv Kullanımı",
    name4chart: "bolum",
    type: "pie",
    color: "yellow",
    icon: "chart pie"
  },
  {
    id: "10",
    title: "Süreç Kullanımı",
    name4chart: "surec",
    type: "pie",
    color: "yellow",
    icon: "chart pie"
  },

  {
    id: "03",
    title: "Profil Kv Ağacı",
    name4chart: "profil",
    type: "tree",
    icon: "sitemap"
  },
  {
    id: "04",
    title: "Birim Kv Ağacı",
    name4chart: "birim",
    type: "tree",
    icon: "sitemap"
  },
  {
    id: "05",
    title: "Bölüm Kv Ağacı",
    name4chart: "bolum",
    type: "tree",
    icon: "sitemap",
    layout: "radial"
  },
  {
    id: "06",
    title: "Süreç Kv Ağacı",
    name4chart: "surec",
    type: "tree",
    icon: "sitemap"
  }
];

export default class Analiz extends PureComponent {
  componentDidMount() {
    menuitems.map(
      ({ active, id, title, name4chart, type, layout }) =>
        active &&
        this.setState({
          activeMenu: {
            id,
            title,
            name4chart,
            type,
            layout
          }
        })
    );
  }

  ChartMenu = () => {
    const handleClick = (e, { name, title, name4chart, type, layout }) =>
      this.setState({
        activeMenu: { id: name, title, name4chart, type, layout }
      });

    const { activeMenu } = this.state;

    return (
      <div className="chart-menu">
        <Menu fluid vertical tabular size="small">
          {menuitems.map((row, index) => (
            !row.disabled && <Menu.Item
              name={row.id} //menu kendi parametresi, unique olmalı.. id olarak bunu kullanıyorum.
              name4chart={row.name4chart}
              key={index}
              title={row.title} //handleClick'te state'e atmak için
              type={row.type} //handleClick'te state'e atmak için
              layout={row.layout} //handleClick'te state'e atmak için
              active={activeMenu.id === row.id}
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
    const { title, name4chart, type, layout } = this.state.activeMenu;
    // Dışardan çağrılan objelerin kopyası yaratılıyor.
    // Böyle yapmazsan Pie'dan Pie tıklayarak geçiş yaptığında değişiklik olmuyor.
    const Tree = () => (
      <TreeChart title={title} name={name4chart} layout={layout} />
      );
      const Org = () => <OrgGoogle title={title} name={name4chart} layout={layout}/> //Google Org Chart
      const Pie = () => <PieGoogle title={title} name={name4chart} />;
      const Geo = () => <GeoGoogle title={title} name={name4chart} />;

    return (
      <div className="chart-canvas">
        {type === "pie" ? (
          <Pie />
        ) : type === "tree" ? (
          <Tree />
        ) : type === "geo" ? (
            <Geo />
        ) : type === "org" ? (
            <Org />
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
