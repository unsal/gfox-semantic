import React, { PureComponent } from 'react'
import { Message, Segment, Icon, Dropdown, Button } from 'semantic-ui-react'
import axios from "axios";
import _ from 'lodash';
import { updateStoreData, updateErrorStatus } from "../../../reducer/actions";
import {config} from '../../../config'

import {store} from '../../../reducer';
import { updateStoreCID } from '../../../reducer/actions';

export const upperCase=string=>
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// HTML elementin koordinatini getirmek için ara prosedür
const offset=(element)=> {

    try{
        const rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    } catch(err) {
        // console.log(err)
        return 0
    }

   }

//html elementin ekrandaki left+top değerini döndürür.
export const getOffset = (element)=> {
    const _element = document.getElementById(element);
    const divOffset = offset(_element);
    const _position = { left: divOffset.left, top: divOffset.top }

    return _position;
  }


// MyMessage
  export class MyMessage extends PureComponent {
    constructor(props) {
      super(props);
        this.state = { visible: true }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({ visible: false })
      }, 2000)
    }

    handleDismiss = () => {
      this.setState({ visible: false })
    }

    render() {
      if (this.state.visible) {
        return (
         this.props.error?
            <Message error onDismiss={this.handleDismiss} header={this.props.header} content={this.props.content} size='tiny' attached='top' />
          :this.props.success?
            <Message success onDismiss={this.handleDismiss} header={this.props.header} content={this.props.content} ize='tiny' attached='top' />
          : <Message onDismiss={this.handleDismiss} header={this.props.header} content={this.props.content} ize='tiny' attached='top' />
            )
      }

      return null;



    }
  }

// my Loader
  export const MyLoader = () => {
    return <div style={{ padding: "100px" }}>
      <Segment basic compact>
        <Icon loading name="circle notch" size="big" />
           <span>Yükleniyor...</span>
      </Segment>
    </div>
  }

  //Somehow not WORKS!!
  // get Options for Dropdown components. !!! only works for pidm, name included Tanimlar tables..


   export const getOptions =  async (URL) => {
    let options = []

    const response = await axios.get(URL)
        try {
            await response.data.map( ({pidm, name}) => options = options.concat({'key':pidm, 'text':name, 'value':pidm}) )
        } catch (err) {
          console.log(err)
        }
        return options

    }

//Remove Duplicates from an Array
export const removeDuplicates=(arr)=> {
    var cleaned = [];
    arr.forEach(item1=> {
        var unique = true;
        cleaned.forEach(item2=> {
            if (_.isEqual(item1, item2)) unique = false;
        });
        if (unique)  cleaned.push(item1);
    });
    return cleaned;
}


export const refreshStoreData = async (URL, store) => {
    const response = await axios.get(URL)
    try {
        const data = await _.size(response.data)>0?response.data:[]
        await store.dispatch(updateStoreData(data))
    } catch (err) {
      // store.dispatch(updateStoreError(true))
      console.log(err)
    }
}

export const refreshStoreData2 = (store, cid, URL_GET) => {
  const params  = {cid}

    try {
      axios.post(URL_GET, params, config.axios)
      .then(result => {
        const data = _.size(result.data)>0?result.data:[];
        store.dispatch(updateStoreData(data)); //store data güncelle
      })
    } catch (err) {
          console.log("refreshStoreData hatası..",err);
    }

}

//Hata durumunu store'a atar..
export const updateStoreError = (errorStatus, store) => {
  try {
      store.dispatch(updateErrorStatus(errorStatus))
  } catch (err) {
    console.log(err)
  }

}


export const createDropdownOptions = async (URL_OPTIONS, cid) => {
//{pidm:, text:, value:} for Semantic Dropdown Component. cid=> her kurum için ayrı ayrı
  const params  = {cid}
  let options =[]

  try {
    const result = await axios.post(URL_OPTIONS, params, config.axios)
    const data = await _.size(result.data)>0?result.data:[];
    await data.map( ({pidm, name}) =>  options = options.concat({'key':pidm, 'text':name, 'value':pidm}) )

  } catch (err) {
        console.log("myComponents->createDropdownOptions() hatası..",err);
        options = []
  }

  return options
}


export const createYayindurumlariOptions = async () => {
  //{pidm:, text:, value:} for Semantic Dropdown Component. cid=> her kurum için ayrı ayrı
    const URL_GET = config.URL_GET_YAYINDURUMLARI
    const params  = {cid:'0'} //yayın durumları için  cid'ye ihtiyaç duyulmadığından
    let options =[]

    try {
      const result = await axios.post(URL_GET, params, config)
      const data = await _.size(result.data)>0?result.data:[];
      await data.map( ({pidm, name}) =>  options = options.concat({'key':pidm, 'text':name, 'value':pidm}) )

    } catch (err) {
          console.log("myComponents->createYayindurumlariOptions() hatası..",err);
          options = []
    }

    return options
  }


  export const createCidOptions = async (uid) => {
    const params  = {uid}
    let options =[]

    try {
      const result = await axios.post(config.URL_GET_AUTH_CIDS, params, config.axios)
      const data = await result.data?result.data:[]
      await data.map( ({cid, name}) =>  options = options.concat({'key':cid, 'text':name, 'value':cid}) )

    } catch (err) {
          console.log("myComponents->createCidOptions() hatası..",err);
          options = []
    }
    return options

  }


   // Change Cid Dropbox for using everywhere
   export class DropboxSelectCID extends PureComponent {
     state = {
        options: [],
        cid: 1
     }

     async componentDidMount() {
       const {cid, uid} = await this.props
       const options = await createCidOptions(uid)
       await this.setState({ options, cid })
     }

     handleChange = async (e, data)=> {
      e.preventDefault()
      const cid = await data.value
      await this.setState({ cid })
      await store.dispatch(updateStoreCID(cid))
    }

    render() {
        const {options, cid} = this.state
        return <Button.Group color='black'>
                <Dropdown
                    value={cid}
                    options={options}
                    onChange={this.handleChange}
                    button
                    placeholder='Seçiminiz?'
                />
                </Button.Group>
          }
          }


