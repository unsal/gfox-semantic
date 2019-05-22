
import React, { useState, useEffect, useContext, memo } from 'react'

import { Table, Checkbox, Input, Icon, Button, Header } from 'semantic-ui-react'

// import { Table, } from "semantic-ui-react";

import Layout from "../layout";
import Login from "./login";

//Redux
import { connect } from "react-redux";
import axios from "axios";

import { config } from "../../config";
import { axiosData, isNull } from "../../components/gfox";


import "./auth.css"

const DataContext = React.createContext();

const template = {
    url: config.URL_AUTH_ACCOUNTS,
    titles: [
        { title: "Kullanıcı Adı", width: "30%" },
        { title: "Şifre", width: "30%" },
        { title: "Aktif", width: "5%" },
    ],
    fields: [
        { field: "username", type: "text", visible: true, focus: true },
        { field: "password", type: "password", visible: true },
        { field: "enabled", type: "boolean", visible: true },
        { field: "admin", type: "boolean" },
        { field: "dpo", type: "boolean" }
    ]
}


// =============================================================================
//  ! DIKKAT Bunu hooks componentin içine alınca rerender edildiği için focus kayboluyor. bu yüzden TableCellsEdit dışına aldım.
// =============================================================================
const EditField = ({ row, fields }) => {

    const {editMode, setEditMode } = useContext(DataContext) //enabled:b, row:{}, add:b, update:b, delete:b, get:b

    const handleChangeInput = (e) => {
        const newRow = { ...editMode.row, [e.target.name]: e.target.value }
        const _editMode = { ...editMode, row: newRow }
        setEditMode(_editMode)
    }

    //Semantic'de element parametresini kullanabilirsin
    const handleChangeCheckbox = (e, element) => {
        const newRow = { ...editMode.row, [element.name]: element.checked }
        const _editMode = { ...editMode, row: newRow}
        setEditMode(_editMode)
    }

    const {field, type} = fields
    const stateValue = isNull(editMode.row[field]) //state'ten getirir
    const rowValue = row[field]

    // rownumber view'daki unique satırı edit'de yakalamak içindir. pidm kullanılamıyor çünkü farklı cid'lerde aynı pidm olabiliyor.
    if (editMode.enabled && (row.rownumber === editMode.row.rownumber)) {
        return (["text", "password"].includes(type)) ? <Input autoFocus={field === "username" } name={field} value={stateValue} onChange={handleChangeInput} style={{ width: "100%" }} />
        : (type === "boolean") && <Checkbox name={field} checked={(Boolean(stateValue))} onChange={handleChangeCheckbox} />

    } else {
        return (type === "text") ? rowValue
            : (type === "password") ? "*****"
                : (type === "boolean") ? rowValue && <Icon name="checkmark" color="green" />
                    : "undefined type"
    }
}


const TableCellsEdit =({ row })=> {

    return template.fields.map((fields, index) => (
        fields.visible &&
        <Table.Cell key={index}> <EditField row={row} fields={fields} /> </Table.Cell>
    )
    )


}


const MyToggle =({ row })=> {

    const {editMode, setEditMode, setDeleteMode } = useContext(DataContext) 
    
    const handleChangeToggle = (e, element) => {
        const _editMode = { enabled: element.checked, row: element.row, type:"update" }
        setEditMode(_editMode)
        setDeleteMode(false)
    }

    const disabled = (row) => {
        // editmode dışındaki satırlardaki checkbox toggle disable yapar. yoksa enable iken diğerlerine tıklama yapınca sapıtıyor state
        return editMode.row === {} ? false
            : editMode.enabled && (row.rownumber !== editMode.row.rownumber)
    }

    const checked = (row) => editMode.enabled && (row.rownumber === editMode.row.rownumber)

    return (
        <Checkbox toggle onChange={handleChangeToggle} name={String(row.rownumber)} checked={checked(row)} row={row} disabled={disabled(row)} />
    )

}


const TableHeader =memo( ()=> {
    const { editMode, addMode } = useContext(DataContext)
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell />
                {template.titles.map((row, index) => (
                    <Table.HeaderCell key={index} style={{ width: row.width }}>{row.title}</Table.HeaderCell>)
                )}
                {(editMode.enabled || addMode.enabled) && <Table.HeaderCell style={{ with: "10%"}} />}
            </Table.Row>
        </Table.Header>
    )
})

// ! Ana Component içinde nested olunca Render edildiğinde sıkıntı yaratıyor. Bu yüzden ayırdım
const AddField = ({fields}) => {

    const {addMode, setAddMode } = useContext(DataContext) //enabled:b, row:{}, add:b, update:b, delete:b, get:b

    const handleChangeInput = (e) => {
        const newRow = { ...addMode.row, [e.target.name]: e.target.value }
        const _addMode = { ...addMode, row: newRow }
        setAddMode(_addMode)
    }

    //Semantic'de element parametresini kullanabilirsin
    const handleChangeCheckbox = (e, element) => {
        const newRow = { ...addMode.row, [element.name]: element.checked }
        const _addMode = { ...addMode, row: newRow }
        setAddMode(_addMode)
    }

    return (
        (["text", "password"].includes(fields.type)) ? <Input autoFocus={fields.field === "username" } name={fields.field} value={isNull(addMode.row[fields.field])} onChange={handleChangeInput} style={{ width: "100%" }} />
    : (fields.type === "boolean") && <Checkbox name={fields.field} checked={false} onChange={handleChangeCheckbox} />
    )

} 

const TableCellsAdd=()=> {

    return template.fields.map((fields, index) => (
        fields.visible &&
        <Table.Cell key={index}> <AddField fields={fields} /> </Table.Cell>
    )
    )

}


const TableBody =()=> {

    const { auth, 
            editMode, setEditMode, 
            addMode, setAddMode, 
            deleteMode, setDeleteMode,
            data, setData ,
            onError, setOnError
        } = useContext(DataContext)


    async function commit(params) {

         if (validEmail(params.username) && validPassword(params.password)) {
            await axios.post(template.url, params, config.axios)
            refreshContextData()
        } else {
            setOnError({mode: true, message:"Kullanıcı adı e-posta formatında olmalı, Şifre en az 6 basamak uzunluğunda olmalı"})
            setTimeout(()=>setOnError({...onError, mode: false}), 2000)
        }

    }

    function reset() {
             // list mode
             setEditMode({...editMode, enabled: false})
             setAddMode({...addMode, enabled: false})
             setDeleteMode(false)
             setOnError({...onError, mode: false})
    }

    async function refreshContextData() {
    
        const { cid } = auth.cids
        const params = { cid, type:"get" }
    
        try {
            const _data = await axiosData(template.url, params);
            await setData(_data)
            
            reset()

        } catch (err) {
            console.log("error on fetch Accounts data..", err)
        }
    }

    

    async function handleUpdate(e) {
        e.preventDefault()
        const { uid } = auth;
        const { cid } = auth.cids;
        const { pidm, username, password, enabled }  = editMode.row; //row.username, row.password, row.enabled

        const params = {cid, uid, pidm, username, password, enabled, type: "update"}

        await commit(params)
        
    } 


    async function handleAdd(e) {
        e.preventDefault()
        const { uid } = auth;
        const { cid } = auth.cids;

        const cid_data = []
        cid_data.push(cid)  // [2] üretir.. sakın string olarak gönderme...

        const { username, password, enabled } = addMode.row
        const params = {cid_data, uid, username, password, enabled, type: "add"}

        await commit(params)
    } 

    function handleDelete(e) {
        e.preventDefault()
        setDeleteMode(true)
    }

    async function handleDeleteQuery(e) {
        e.preventDefault()
        const { pidm, username, password } = editMode.row;

        const params = {pidm, username, password, type: "delete"}

        await commit(params)
        refreshContextData()
    } 

    function handleVazgec(e) {
        e.preventDefault()
        reset()
    }

    const UpdateButton = () => <Button size="mini" color="green" onClick={handleUpdate} >GÜNCELLE</Button>
    const AddButton = () => <Button size="mini" color="blue" onClick={handleAdd} >EKLE</Button>
    const DeleteButton = () => <Button size="mini" color="grey" onClick={handleDelete} style={{marginLeft:"5px"}}>SİL</Button>
    const EditModeButtons = () => <div><UpdateButton /><DeleteButton /></div>
    
    const DeleteQuery = () => <div>
                                    Silinsin mi? <Button size="mini" color="grey" onClick={handleVazgec} >Vazgeç</Button>
                                    <Button size="mini" color="red" onClick={handleDeleteQuery}>Evet</Button>
                              </div>


    function validEmail(username) {
        return username.includes("@") && username.includes(".")
    }

    function validPassword(password) {
        return password.length > 6
    }

    const style = { with: "10%"}

    return (
        <Table.Body>
          {addMode.enabled && (
            <Table.Row active>
              <Table.Cell>
                <Button
                  size="mini"
                  color="grey"
                  onClick={() => setAddMode({ ...addMode, enabled: false })}
                >
                  VAZGEÇ
                </Button>
              </Table.Cell>
              <TableCellsAdd />
              <Table.Cell style={style}>
                <AddButton />
              </Table.Cell>
            </Table.Row>
          )}
          {data.map((row, index) => (
            <Table.Row
              key={index}
              active={row.rownumber === editMode.row.rownumber}
            >
              <Table.Cell collapsing style={{ width: "5%" }}>
                <MyToggle row={row} />
              </Table.Cell>
              <TableCellsEdit row={row} />
              {editMode.enabled &&
              row.rownumber === editMode.row.rownumber ? (
                <Table.Cell style={style}>
                  {deleteMode ? <DeleteQuery /> : <EditModeButtons />}
                </Table.Cell>
              ) : (
                (editMode.enabled || addMode.enabled) && <Table.Cell />
              )}
            </Table.Row>
          ))}
        </Table.Body>
    );

}


function CheckAuth({ auth, children })  {
    return (auth.dpo || auth.admin) ? children : <div style={{ margin: "200px", color: "#ff0000" }}>Bu menüye erişim izniniz bulunmamaktadır.</div>
}

const CheckValidation = ({children}) => {
    const { onError } = useContext(DataContext)
    return (
        <div>
            {children}
            {onError.mode && <div style={{color: "red" }}>{onError.message}</div>}
        </div>
    )
}

const Container =()=> {
    const { editMode, addMode, setAddMode } = useContext(DataContext)

    const handleAdd = (e) => {
        e.preventDefault()
        const _addMode = {...addMode, enabled: true }
        setAddMode(_addMode)
    }
    
    const Title = () => <Header as="h1" style={{float: "left"}}><Icon name="lock" />Hesaplar</Header>
    const AddButton = () => <Button 
                                    size="mini" 
                                    color="blue" 
                                    disabled={ editMode.enabled || addMode.enabled } 
                                    style={{ float: "right"}}
                                    onClick = {handleAdd}
                                    >
                                    <Icon name="plus" />
                                    EKLE
                            </Button>
    const HeaderRow = () => <div className="accounts-header"><Title /><AddButton /></div>

    // const ShowOnError = () => onError.mode && <div style={{color: "red" }}>{onError.message}</div> 

    return (
      <div className="accounts-container">
        <CheckValidation>
        <HeaderRow />
          <Table
            compact
            celled
            definition
            className="accounts-table"
            selectable
          >
            <TableHeader />
            <TableBody />
          </Table>
        </CheckValidation>
      </div>
    );
       
}

const Hesaplar =(props)=> {

    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState({ enabled: false,  row: {} }) 
    const [addMode, setAddMode] = useState({ enabled: false, row: {} })
    const [deleteMode, setDeleteMode] = useState(false)
    const [onError, setOnError] = useState({mode: false, message: ""})

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const { cid } = props.auth.cids
        const params = { cid, type:"get" }

        try {
            const _data = await axiosData(template.url, params);
            setData(_data)
        } catch (err) {
            console.log("error on fetch Hesaplar data..", err)
        }
    }

    // Context için...
    const value = { 
        auth:props.auth, 
        editMode: editMode, 
        setEditMode: setEditMode, 
        data: data, 
        setData: setData,
        addMode: addMode,
        setAddMode: setAddMode,
        deleteMode: deleteMode,
        setDeleteMode: setDeleteMode ,
        onError: onError,
        setOnError: setOnError
        
    }

    // * =============================================================================
    // * MAIN
    // * =============================================================================
    return (
        <Login>
            <Layout showLeftMenu={true}>
                <CheckAuth auth={props.auth}>
                    <DataContext.Provider value={value} >
                        <Container />
                    </DataContext.Provider>
                </CheckAuth>
            </Layout>
        </Login>
    );

}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(Hesaplar);
