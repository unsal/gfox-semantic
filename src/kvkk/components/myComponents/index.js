import React, { PureComponent } from 'react'
import { Message, Segment, Icon } from 'semantic-ui-react'
import axios from "axios";
import _ from 'lodash';
import { updateStoreData, updateErrorStatus } from "../../../reducer/actions";


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


   export const getOptions =  async URL => {
    let options = []

    //  await axios // bu işlem bitmeden en alttaki return işlemi yapılmaz
    //     .get(URL)
    //     .then(json => {
    //       const data = json.data;
    //       data.map( ({pidm, name}) =>  options = options.concat({'key':pidm, 'text':name, 'value':pidm}))
    //     })
    //     .catch(err => {
    //       console.log("myComponents > getOptions() hatası!", err);
    //     });

    // return options;

    //Yukardaki yerine çok daha az kod ile Async Await kullanımı ile..

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

//Hata durumunu store'a atar..
export const updateStoreError = (errorStatus, store) => {
  try {
      store.dispatch(updateErrorStatus(errorStatus))
  } catch (err) {
    console.log(err)
  }

}

