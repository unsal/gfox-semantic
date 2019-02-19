import React, { PureComponent } from 'react'
import { Icon, Dropdown, Button } from 'semantic-ui-react'
import { updateStoreCID, updateStoreCIDName } from "../../reducer/actions";
import { store } from '../../reducer';
import { connect } from 'react-redux';

// Change Cid Dropbox for using everywhere
class Component extends PureComponent {
  state = {
    isLoading: true,
    mounted: false
  }

  async componentDidMount() {
    await this.setState({ mounted: true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mounted !== this.state.mounted) {
      this.setState({ isLoading: false });
    }
  }

  handleChange = async (e, data) => {
    e.preventDefault()
    const cid = await data.value
    const cidName = await data.options.find(key => key.value === data.value)
    await this.setState({ cid })
    await store.dispatch(updateStoreCID(cid))
    await store.dispatch(updateStoreCIDName(cidName))
  }

  Loader = () => {
    return <Icon loading name="firefox" size="large" />
    //   return <span>yükleniyor...</span>
  }

  render() {
    const { cidOptions, cid, color } = this.props
    const { isLoading } = this.state
    // console.log('options: ',options)
    return isLoading ? <this.Loader /> : <Button.Group color={color}>
      <Dropdown
        value={cid}
        options={cidOptions}
        onChange={this.handleChange}
        button
        placeholder='Firma seçiminiz?'
      />
    </Button.Group>
  }
}

const mapStateToProps = (state) => ({ cid: state.cid, cidOptions: state.cidOptions })
export default connect(mapStateToProps)(Component)

