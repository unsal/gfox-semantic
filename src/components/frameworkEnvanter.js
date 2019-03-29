import React, { PureComponent } from "react";
import {
  Table,
  Dropdown,
  Header,
  Button,
  Label,
  Icon,
  Modal,
  Input,
  Checkbox
} from "semantic-ui-react";
import Layout from "../pages/layout";
import Login from "../pages/auth/login";
import axios from "axios";

//Redux
import { connect } from "react-redux";
import { store } from "../reducer";
import { updateStoreData, updateStoreSearchMode } from "../reducer/actions";

import { config, apiHost } from "../config";
import {
  clearStoreData,
  refreshStoreData,
  MyMessage,
  MyLoader,
  getOptions
} from "./gfox";

import "../pages/layout/layout.css";

class Component extends PureComponent {
  state = {
    mount: false,
    addMode: false,
    deleteMode: false,
    editMode: false,
    toolsON: false,

    //content table properties
    singleLine: true, //content>table>tek satır kontrolü için
    loadingSpinner: true,

    //en son eklenen kaydı yakalamak için
    maxPidm: 0
  };

  loadData = () => {
    try {
      // const { cid } = this.props;
      const { uid, cid } = this.props.auth;
      const url = this.props.template.url.get;
      refreshStoreData(store, cid, uid, url);
      return true;
    } catch (error) {
      return false;
    }
  };

  distinct = arr => {
    const distinctValues = [...new Set(arr)];
    var options = [];
    distinctValues.map(
      (item, index) =>
        (options = options.concat({ key: index, text: item, value: item }))
    );
    return options;
  };

  // Tanımlar ve mevcut tablodaki tüm optionalrı bir listede toplar
  concatOptions = async (field, type) => {
    try {
      const { data } = await this.props;
      const { cid } = this.props.auth
      const isMultiple = type === "json";
      const id = (await isMultiple)
        ? field.substring(0, field.length - 5)
        : field; //_data kısmını kaldırır
      const url = (await apiHost) + "/options/" + id;

      //1. Tanımardan optionsları getir
      const options2 = await getOptions(url, cid, "array");
      var options1 = [];
      //2. veritabanındaki bütün optionları bir arrayde topla.. [x,y,z,x,z]
      data &&
        (await data.map((row, index) =>
          row[field] && isMultiple
            ? row[field].map(item => (options1 = options1.concat(item)))
            : (options1 = options1.concat(row[field]))
        ));

      // 3. bir ve ikiyi birleştir..
      await options1.push(...options2);
      // console.log('ID*****', id)

      // 4. tekilleştir
      return this.distinct(options1);
    } catch (err) {
      console.log("frameworkEnvanter.js->concatOptions->HATA!");
      return [];
    }
  };

  loadOptions = async () => {
    try {
      const { fields } = this.props.template;
      // template'deki field alanlarından options'ları üretir
      await fields.map(
        async ({ field, type, component }) =>
          component === "dropdown" &&
          this.setState({
            ["options_" + field]: await this.concatOptions(field, type)
          })
      );
    } catch (error) {
      return false;
    }
  };

  async componentDidMount() {
    await this.loadData();
    await this.setState({ mount: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mount !== this.state.mount) {
      this.setState({ loadingSpinner: false });
    }
  }

  componentWillUnmount() {
    clearStoreData(store);
  }

  filterData = (name, value) => {
    const search = value.trim().toLowerCase();
    let data = this.props.initialData;
    const lowerCase = arr => arr.map(item => item.toLowerCase()); //array'i search için küçük harfe çevirir

    if (search.length > 0) {
      if (!name.includes("_data")) {
        data = data.filter(key => {
          return key[name] ? key[name].toLowerCase().match(search) : false; //false: null olan kayıtlar hata verdiği için false döndürdüm.
        });
      } else {
        data = data.filter(key => {
          return key[name] ? lowerCase(key[name]).includes(search) : false; //büyük küçük harfi olmadığı için
        });
      }
    }

    return data;
  };

  MyInputSearch = ({ name, placeholder }) => {
    const handleChangeSearch = (event, element) => {
      event.preventDefault();
      const { name, value } = element;
      this.setState({ [name]: value });
      const data = this.filterData(name, value);
      data && store.dispatch(updateStoreData(data));
    };

    return (
      <Input
        name={name}
        placeholder={placeholder}
        type="text"
        value={this.state[name] ? this.state[name] : ""}
        onChange={handleChangeSearch}
        onKeyDown={this.handleKeyDown}
        style={{ width: "100%" }}
      />
    );
  };

  TableHeader = () => {
    const Required = ({ children }) => <Label basic>{children}</Label>;
    const { titles } = this.props.template;
    const enableSearchMode = () => store.dispatch(updateStoreSearchMode(true));

    return (
      <Table.Header>
        <Table.Row>
          {titles.map(({ title, width, required, searchable, field }, index) =>
            this.props.searchMode && searchable ? (
              <Table.HeaderCell
                key={index}
                style={{
                  width,
                  verticalAlign: "TOP",
                  backgroundColor: "#f0f0f0"
                }}
              >
                {" "}
                <this.MyInputSearch name={field} placeholder={title} />
              </Table.HeaderCell>
            ) : (
              <Table.HeaderCell
                key={index}
                style={{
                  width,
                  verticalAlign: "TOP",
                  backgroundColor: "#f0f0f0"
                }}
                onClick={enableSearchMode}
              >
                {" "}
                {required ? <Required>{title}</Required> :<span className="table-header">{title}</span> }
              </Table.HeaderCell>
            )
          )}
        </Table.Row>
      </Table.Header>
    );
  };

  handleEdit = row => {
    const pidm = row.pidm;
    const { fields } = this.props.template;

    this.loadOptions();

    this.setState({ editMode: true, addMode: false, toolsON: true, pidm });
    fields.map(({ field }) => this.setState({ [field]: row[field] }));
  };

  DataTitle = props => {
    const color = props.row.pidm === this.state.maxPidm ? "green" : "black";
    return (
      <span onClick={() => this.handleEdit(props.row)} color={color} className="table-label">
        {props.children}
      </span>
    );
  };

  //id-> selected data id (ortamlar, tedbirler), aktarim pidm->silmek için, data
  DataTitles = ({ row, data, color, flag }) => {
    const style = { display: "block", marginTop: "2px", marginLeft: "3px" };
    const size = data.length;
    const limit = data && this.state.singleLine ? 1 : size;
    const isMultiple = size >= 1;
    const showAsCount = isMultiple && this.state.singleLine;
    const ShowCount = () => (
      // <Label circular={true} color={color} onClick={() => this.handleEdit(row)}>
      <Label circular={true} color={color} onClick={() => this.handleEdit(row)}>
        {" +" + size}
      </Label>
    );

    const showAsFlag = flag && this.state.singleLine;
    const ShowFlag = () => (
      <Icon
        name="flag checkered"
        color="green"
        size="large"
        onClick={() => this.handleEdit(row)}
      />
    );
    //slice ile map'ten sadece bir satır getirilir..
    return data.slice(0, limit).map((item, index) => {
      const content = item ? (
        <Label color={color} onClick={() => this.handleEdit(row)}>
          {" "}
          {item}{" "}
        </Label>
      ) : (
        <Icon name="ellipsis horizontal" />
      );
      // row.name && console.log(JSON.stringify(data))
      return (
        <div key={index} style={style}>
          {showAsFlag ? <ShowFlag /> : showAsCount ? <ShowCount /> : content}
        </div>
      );
    });
  };

  handleChange = (event, element) => {
    event.preventDefault();
    const { name, value } = element;

    this.setState({ [name]: value });
    // console.log(name,value)
  };

  handleCheckbox = (event, element) => {
    event.preventDefault();
    const { name, checked } = element;
    this.setState({ [name]: checked });
    // console.log(name,checked)
  };

  handleKeyDown = event => {
    // const type = this.state.addMode ? "add" : "update";
    // if (event.keyCode === 13 && !this.props.searchMode) {
    //   this.handleCommit(type);
    // } else
    if (event.keyCode === 27) {
      this.handleVazgec();
    }
  };

  handleAddition = (event, element) => {
    event.preventDefault();
    const { name, value } = element;
    const options = "options_" + name;
    this.setState({
      [options]: [{ text: value, value }, ...this.state[options]]
    });
  };

  MyDropdown = ({ name, type, error }) => {
    const isPrimary = this.props.template.primary.indexOf(name) > -1;
    const option = this.state["options_" + name];
    const options = option ? option : [];
    const multiple = type === "json";

    return (
      <Dropdown
        name={name}
        value={this.state[name]}
        multiple={multiple}
        search
        selection
        fluid // sağa doğru uzar
        options={options}
        allowAdditions
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
        error={isPrimary && error}
      />
    );
  };

  MyInput = ({ name, error }) => {
    const isPrimary = this.props.template.primary.indexOf(name) > -1;
    return (
      <Input
        name={name}
        type="text"
        value={this.state[name] ? this.state[name] : ""}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        error={isPrimary && error}
        style={{ width: "100%" }}
        placeholder={name}
      />
    );
  };

  MyCheckbox = ({ name }) => (
    <Checkbox
      toggle
      name={name}
      onChange={this.handleCheckbox}
      checked={this.state[name]}
    />
  );

  MyField = ({ name, type, component, error }) => {
    switch (component) {
      case "input":
        return <this.MyInput name={name} error={error} />;
      case "dropdown":
        return <this.MyDropdown name={name} type={type} error={error} />; //single ve multi dropdown kontrolü
      case "checkbox":
        return <this.MyCheckbox name={name} />;
      default:
        return null;
    }
  };

  styleEdit = {
    overflow: "visible",
    verticalAlign: "top",
    margin: "0px",
    padding: "2px"
  };

  TableEdit = () => (
    <Table.Row>
      {this.props.template.fields.map(({ field, type, component }, index) => (
        <Table.Cell key={index} style={this.styleEdit} selectable warning>
          <this.MyField name={field} type={type} component={component} />
        </Table.Cell>
      ))}
    </Table.Row>
  );

  styleView = { verticalAlign: "top", margin: "0px" };

  TableRow = ({ row, rowIndex }) => {
    const { DataTitle, DataTitles } = this;
    const { view } = this.props.template;

    return (
      <Table.Row warning={rowIndex === 0}>
        {view.map(({ field, type, color, flag }, index) =>
          type === "text" ? (
            <Table.Cell key={index} style={this.styleView}>
              <DataTitle row={row}>{row[field]}</DataTitle>
            </Table.Cell>
          ) : type === "json" ? (
            <Table.Cell key={index} style={this.styleView}>
              <DataTitles
                row={row}
                color={color}
                flag={flag} //show As Flas
                data={row[field]}
              />
            </Table.Cell>
          ) : (
            type === "bool" && (
              <Table.Cell key={index} style={this.styleView}>
                <DataTitle row={row}>
                  {row[field] && row[field].length > 0 && (
                    <Icon name="flag checkered" color="green" />
                  )}
                </DataTitle>
              </Table.Cell>
            )
          )
        )}
      </Table.Row>
    );
  };

  TableRows = ({ data }) => {
    return (
      data &&
      data.map((row, index) =>
        this.state.editMode && this.state.pidm === row.pidm ? (
          <this.TableEdit row={row} key={index} />
        ) : (
          <this.TableRow row={row} rowIndex={index} key={index} />
        )
      )
    );
  };

  TableForm = () => (
    <Table.Row key="0">
      {this.props.template.fields.map(({ field, type, component }, index) => (
        <Table.Cell key={index} style={this.styleEdit}>
          <this.MyField
            name={field}
            type={type}
            component={component}
            error={this.state.message}
          />{" "}
        </Table.Cell>
      ))}
    </Table.Row>
  );

  handleClose = () => {
    this.setState({ deleteMode: false });
  };

  handleReset = () =>
    this.props.template.fields.map(({ field, type }) =>
      type === "json"
        ? this.setState({ [field]: [] })
        : this.setState({ [field]: null })
    );

  // Check if exist entry. boş kayıt atmaması için kontrol fonksiyonu
  validEntry = () => {
    var arr = [];
    this.props.template.fields.map(({ field, required }) =>
      required && this.state[field].length > 0 ? (arr = arr.concat("1")) : null
    );
    // console.log('ARR: ', arr.includes('1'))
    return arr.includes("1");
  };

  handleCommit = async commitType => {
    //type = add, update

    const { pidm } = this.state;
    const { uid, cid } = this.props.auth;
    const { fields } = this.props.template;

    let params = { cid, uid };

    const sendPidmTypes = ["update", "delete"]; // add için pidm gönermemeli, sadece bu ikisi için göndermeli
    if (sendPidmTypes.indexOf(commitType) > -1) {
      params["pidm"] = pidm;
    }

    // sadece viewde bulunan post ederken gitmemesi gereken alanlar için type kontrolü yapılıyor. çünkü fields -> type boş geçiliyor şablonda
    const data = {};
    fields.map(({ field, type }) => type && (data[field] = this.state[field]));
    params["data"] = data;

    try {
      const URL_COMMIT = this.props.template.url.commit + "/" + commitType; // /add or /update
      // console.log('yurtdışı: ',yurtdisi)

      this.validEntry() && (await axios.post(URL_COMMIT, params, config.axios));

      await this.setState({
        addMode: false,
        editMode: false,
        toolsON: false,
        message: null,
        open: false,
        singleLine: true
      }); //open SilBox mesaj kutusu sildikten sonra açılmasın içindir.
      await this.handleReset();
      await refreshStoreData(store, cid, uid, this.props.template.url.get);
    } catch (err) {
      this.setState({
        message: "Zorunlu alanları girmelisiniz!"
      });
      setTimeout(() => {
        this.setState({ message: null });
      }, 3000); //mesajı tekrar tıklandığında göstermek için
    }
  };

  handleAdd = async event => {
    event.preventDefault();

    await this.loadOptions();

    await this.handleReset();
    await this.setState({
      addMode: true,
      editMode: false,
      toolsON: true,
      message: null
    });
  };

  handleDuplicate = async event => {
    event.preventDefault();
    // edit moduna geçtiğinde seçilen satırın field değerleri state'e kopyalandığından 'add' ile eklem e ypaılabilir.
    this.handleCommit("add");
  };

  handleVazgec = event => {
    this.setState({
      addMode: false,
      editMode: false,
      toolsON: false,
      message: null,
      singleLine: true
    });
    store.dispatch(updateStoreData(this.props.initialData));
    store.dispatch(updateStoreSearchMode(false));
  };

  Buttons = () => {
    const style = { float: "right" };
    const styleGroup = { float: "right", marginRight: "50px" };
    const { color } = this.props.template.page;

    const EkleButon = () => (
      <Button
        style={style}
        // circular
        color="blue"
        size="mini"
        onClick={() => this.handleCommit("add")}
      >
        EKLE
      </Button>
    );
    const GuncelleButon = () => (
      <Button
        style={style}
        color={color}
        size="mini"
        // circular
        onClick={() => this.handleCommit("update")}
      >
        GÜNCELLE{" "}
      </Button>
    );
    // const SilButon = () =>  <Button style={style} color='red' size='mini' onClick={()=>this.handleCommit("delete")}>SİL </Button>
    const { SilButon } = this;
    const VazgecButon = () => (
      <Button
        style={style}
        size="mini"
        // circular
        content="VAZGEÇ"
        onClick={this.handleVazgec}
      />
    );
    const YeniKayitButon = () => (
      <Button
        style={style}
        color={color}
        size="mini"
        // circular
        content="YENİ KAYIT"
        onClick={this.handleAdd}
      />
    );

    const DuplicateButton = () =>
      this.state.toolsON && (
        <Button
          basic
          style={style}
          // color='grey'
          // circular
          icon="copy outline"
          size="mini"
          onClick={this.handleDuplicate}
          content="KLONLA"
        />
      );

    const SingleLineButon = () => (
      <Button
        style={style}
        basic
        // circular
        // color={color}
        icon={this.state.singleLine ? "eye" : "eye slash outline"}
        size="mini"
        onClick={() => this.setState({ singleLine: !this.state.singleLine })}
        content="DETAY"
      />
    );

    return (
      <div>
        {this.state.addMode ? (
          <div>
            {" "}
            <EkleButon /> <VazgecButon />{" "}
          </div>
        ) : this.state.editMode ? (
          <div>
            {" "}
            <GuncelleButon />
            <VazgecButon />
            <div style={styleGroup}>
              <SilButon />
            </div>
          </div>
        ) : this.props.searchMode ? (
          <div>
            <YeniKayitButon />
            <VazgecButon />
          </div>
        ) : (
          <YeniKayitButon />
        )}

        <div style={styleGroup}>
          <DuplicateButton />
          <SingleLineButon />
        </div>
      </div>
    );
  };

  SilButon = () => {
    const show = () => this.setState({ open: true });
    const close = () => this.setState({ open: false });
    const commit = () => this.handleCommit("delete");
    const style = { float: "right" };

    return (
      <div>
        <Button
          style={style}
          // basic
          color="red"
          // circular
          icon="trash alternate"
          size="mini"
          onClick={show}
          content="SİL"
        />

        {/* <Button style={style} size="mini" color="red" onClick={show}>
          SİL
        </Button> */}

        <Modal
          style={{ height: "200px" }}
          size="mini"
          open={this.state.open}
          onClose={this.close}
        >
          <Modal.Header>Silme Onayı</Modal.Header>
          <Modal.Content>
            <p>İşaretli kaydı silmek istediğinizden emin misiniz?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={close}>VAZGEÇ</Button>
            <Button negative content="EVET" onClick={commit} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  Container = () => {
    const { data } = this.props; //data > from reducer
    const { title } = this.props.template.page;

    return (
      <div className="layout-container">
        <div className="layout-container-header">
          <Header size="large" style={{ float: "left", width: "20%" }}>
            {title}
          </Header>

          <div style={{ float: "right", width: "80%" }}>
            <this.Buttons />
          </div>
        </div>

        <div>
          {this.state.message && (
            <MyMessage error content={this.state.message} />
          )}
        </div>
        <div className="layout-container-body">
          <Table
            compact
            celled
            fixed
            stackable
            selectable
            singleLine={this.state.singleLine}
          >
            <this.TableHeader />
            <Table.Body>
              {this.state.addMode && <this.TableForm />}
              <this.TableRows data={data} />
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  };

  //Render içine aldığında zaman form input MyLoader yüzünden focusu kaybediyor.. state değiştiğinde render edildiğ için..
  LoadingSpinner = ({ children }) =>
    this.state.loadingSpinner ? <MyLoader /> : children;

  render() {
    return (
      <Login>
        <Layout showLeftMenu={true}>
          <this.LoadingSpinner>
            <this.Container />
          </this.LoadingSpinner>
        </Layout>
      </Login>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  initialData: state.initialData,
  searchMode: state.searchMode,
  auth: state.auth
});
export default connect(mapStateToProps)(Component);
