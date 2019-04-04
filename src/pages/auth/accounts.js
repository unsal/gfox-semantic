import React, { useState, useEffect } from 'react'
import { Table, Checkbox, Header } from 'semantic-ui-react'

// import { Table, } from "semantic-ui-react";

import Layout from "../../pages/layout";
import Login from "../../pages/auth/login";

//Redux
import { connect } from "react-redux";

import { config } from "../../config";
import {
   axiosData,
} from "../../components/gfox";

import "./auth.css"

function Accounts (props) {

    const [data, setData] = useState([]);

    const template = {
        titles:[
            {title:"Kullanıcı Adı", width:"45%"},
            {title:"Şifre", width:"45%"},
        ],
        cols: [
            {field:"username", type: "text", visible: true},
            {field:"password", type: "paswword", visible: true},
            {field:"admin", type: "boolean"},
            {field:"dpo", type: "boolean"},
            {field:"enabled", type: "boolean"},
        ]
    }

    const fetchData = async () => {
        const url =  config.URL_AUTH_ACCOUNTS+"/get";
        const { cid } = props.auth.cids
        const params = {cid}

        try {
            const myData = await axiosData(url, params);
            setData(myData)
        } catch (err) {
            console.log("error on fetch accounts data..", err)
        }
    }

    useEffect(() => {

        fetchData()
        
    }, [])


    const DataTable = () => {

        const TableHeader = ()=>(
            <Table.Header>
                <Table.Row>
                <Table.HeaderCell /> 
                 {template.titles.map((row, index)=> (
                 <Table.HeaderCell key={index} style={{ width:row.width }}>{row.title}</Table.HeaderCell> ) 
                 )}
                </Table.Row>
            </Table.Header>
        )

        const TableBody = () =>{
            const TableCols = ({row}) => (
                template.cols.map((col, index)=>(
                   col.visible && <Table.Cell key={index}>
                                    {row[col.field]}
                                </Table.Cell>
                )
                )
            )
            return (
            <Table.Body>
                 {data.map( (row, index) => (
                        <Table.Row>
                            <Table.Cell collapsing>
                                <Checkbox slider />
                            </Table.Cell>
                            <TableCols row={row}/>
                        </Table.Row>
                 )
                 )
                }   
            </Table.Body>
            )
            }

        return (
            <Table compact celled definition className="hesaplar-table">
                <TableHeader />
                <TableBody />
            </Table>
        )
    }

    const Container = () =>{
        return <div className="hesaplar-container">
           <Header>Kullanıcı Hesapları</Header>
            <DataTable />
        </div>
    }

    const CheckAuth = ({children}) => (
        (props.auth.dpo || props.auth.admin) ? children : <div style={{margin:"200px", color: "#ff0000"}}>Bu menüye erişim izniniz bulunmamaktadır.</div>
    )

    return (
        <Login>
          <Layout showLeftMenu={true}>
            <CheckAuth>
              <Container />
            </CheckAuth>
          </Layout>
        </Login>
      );

}

const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(mapStateToProps)(Accounts);
