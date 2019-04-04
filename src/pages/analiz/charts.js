import React, {  useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";

import Layout from "../layout";
import Login from "../auth/login";
import TreeChart from "./treeChart";
import OrgGoogle from "./orgGoogle"
import PieGoogle from "./pieGoogle"
import GeoGoogle from "./geoGoogle"

import "./charts.css";

export default function Analiz() {

  const [activeMenu, setActiveMenu] = useState({})
  const menuitems = require("./charts.json")

  useEffect( () => {
      const fetchMenu = async () => 
              menuitems.map(
                  ({ active, id, title, name4chart, type }) =>
                    active && setActiveMenu({ id, title, name4chart, type })
                )
      
      fetchMenu()

      }, [])


  const ChartMenu = () => {
    const handleClick = (e, { name, title, name4chart, type }) =>
       setActiveMenu({ id: name, title, name4chart, type });
    
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

  const ChartCanvas = () => {
    const { title, name4chart, type } = activeMenu;
    // Dışardan çağrılan objelerin kopyası yaratılıyor.
    // Böyle yapmazsan Pie'dan Pie tıklayarak geçiş yaptığında değişiklik olmuyor.
    const Tree = () => <TreeChart title={title} name={name4chart} />
    const Org = () => <OrgGoogle title={title} name={name4chart} /> 
    const Pie = () => <PieGoogle title={title} name={name4chart} />
    const Geo = () => <GeoGoogle title={title} name={name4chart} />

    return (
      <div className="chart-canvas">
        {type === "pie" ? <Pie />
          : type === "tree" ?  <Tree />
          : type === "geo" ?  <Geo />
          : type === "org" ?  <Org />
          : null}
      </div>
    );
  };

    return (
      <Login>
        <Layout showLeftMenu={true}>
            <div className="chart-container">
              <ChartMenu />
              <ChartCanvas />
            </div>
        </Layout>
      </Login>
    );
}
