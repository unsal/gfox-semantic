import React, { Component } from 'react'
import { Dimmer, Header, Icon } from 'semantic-ui-react'


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

export class ShowDimmer extends Component {
  //props: title, message, icon
  constructor(props) {
      super(props);
      this.state = { active: true }
  }



//   handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  render() {
    const { active } = this.state

    return (
      <div>
        <Dimmer active={active} onClickOutside={this.handleClose} page>
          <Header as='h2' icon inverted>
            <Icon name={this.props.icon}/>
            {this.props.title}
            <Header.Subheader>{this.props.message}</Header.Subheader>
          </Header>
        </Dimmer>
      </div>
    )
  }
}



