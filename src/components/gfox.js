import React, { PureComponent } from "react";
import { Message, Segment, Icon } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import {
  updateStoreData,
  updateStoreInitialData,
  updateStoreURL
} from "../reducer/actions";
import { config } from "../config";

import { store } from "../reducer";

export const upperCase = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const spinnerIcon = "firefox";

// HTML elementin koordinatini getirmek için ara prosedür
const offset = element => {
  try {
    const rect = element.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  } catch (err) {
    // console.log(err)
    return 0;
  }
};

//html elementin ekrandaki left+top değerini döndürür.
export const getOffset = element => {
  const _element = document.getElementById(element);
  const divOffset = offset(_element);
  const _position = { left: divOffset.left, top: divOffset.top };

  return _position;
};

// MyMessage
export class MyMessage extends PureComponent {
  // props: success, error, header, content
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 2000);
  }

  handleDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    if (this.state.visible) {
      return this.props.error ? (
        <Message
          error
          onDismiss={this.handleDismiss}
          header={this.props.header}
          content={this.props.content}
          size="tiny"
          attached="top"
        />
      ) : this.props.success ? (
        <Message
          success
          onDismiss={this.handleDismiss}
          header={this.props.header}
          content={this.props.content}
          size="tiny"
          attached="top"
        />
      ) : (
        <Message
          onDismiss={this.handleDismiss}
          header={this.props.header}
          content={this.props.content}
          ize="tiny"
          attached="top"
        />
      );
    }

    return null;
  }
}

// my Loader
export const MyLoader = () => {
  return (
    <div style={{ padding: "100px" }}>
      <Segment basic compact>
        <Icon loading name={spinnerIcon} size="big" />
      </Segment>
    </div>
  );
};

// loader küçük alanlar için
export const MyLittleLoader = () => {
  return <Icon loading name="spinner" size="large" />;
};

//Somehow not WORKS!!
// get Options for Dropdown components. !!! only works for pidm, name included Tanimlar tables..

//Remove Duplicates from an Array
export const removeDuplicates = arr => {
  var cleaned = [];
  arr.forEach(item1 => {
    var unique = true;
    cleaned.forEach(item2 => {
      if (_.isEqual(item1, item2)) unique = false;
    });
    if (unique) cleaned.push(item1);
  });
  return cleaned;
};

export const clearStoreData = store => {
  try {
    store.dispatch(updateStoreData(null));
  } catch (err) {
    console.log("clearStoreData() ERROR!!", err);
  }
};

export const refreshStoreData = async (store, cid, uid, url) => {
  const params = { cid, uid };
  try {
    const result = await axios.post(url, params, config.axios);
    const data = (await result.data) ? result.data : [];
    await store.dispatch(updateStoreData(data)); //store data güncelle
    await store.dispatch(updateStoreInitialData(data)); //store data güncelle
    await store.dispatch(updateStoreURL(url));
  } catch (err) {
    console.log("gfox>refreshstoredata() hatası..", err);
  }
};

export const axiosData = async (url, params) => {

  let data = []
  
  try {
    const result = await axios.post(url, params, config.axios);
    data = (result.data) && result.data;
    
  } catch (err) {
    console.log("axiosData hatası..", err);
  } finally  {
    return data;
  }

};


export const getOptions = async (url, cid, type) => {
  //{pidm:, text:, value:} for Semantic Dropdown Component. cid=> her kurum için ayrı ayrı
  //python > framework.py > getOptions
  // type: array / json... array free format giriş sürümü için, jon eski tanımlardan gelen sürüm için
  const params = { cid };
  let options = [];

  try {
    const result = await axios.post(url, params, config.axios);
    const data = (await result.data) ? result.data : [];
    await data.map(({ pidm, name }) =>
      type === "array"
        ? (options = options.concat(name)) //yeni yöntemle getir
        : (options = options.concat({ key: pidm, text: name, value: pidm }))
    );
  } catch (err) {
    console.log("myComponents->getOptions() hatası..", err);
    options = [];

  }

  // if (url.indexOf('/options/sureler') >-1) { console.log('Options:', options) }

  return options;
};

//Loading Data with Spinner
export class LoadingStoreData extends PureComponent {
  state = { isLoading: true, mounted: false };

  async componentDidMount() {
    const { cid, uid, url } = this.props;
    await refreshStoreData(store, cid, uid, url);
    this.setState({ mounted: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mounted !== this.state.mounted) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    clearStoreData(store);
  }

  render() {
    return this.state.isLoading ? <MyLoader /> : this.props.children;
  }
}


export const isNull = (v) => v ? v : "";