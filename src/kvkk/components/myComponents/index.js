import React, { Component } from 'react'
import { Message, Segment, Icon } from 'semantic-ui-react'


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
  export class MyMessage extends Component {
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
            <Message error onDismiss={this.handleDismiss} header={this.props.header} content={this.props.content} />
          :this.props.success?
            <Message success onDismiss={this.handleDismiss} header={this.props.header} content={this.props.content} />
          : <Message onDismiss={this.handleDismiss} header={this.props.header} content={this.props.content} />
            )
      }

      return null;



    }
  }

// my Loader
  export class MyLoader extends Component {

    render() {

      return (
        <div style={{ padding:"100px" }}>
          <Segment basic compact>
              <Icon loading name="circle notch" size="big"/>
              <span>Yükleniyor...</span>
          </Segment>
        </div>
      )
    }
  }

  export default MyMessage;





