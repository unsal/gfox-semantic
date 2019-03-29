import React, { PureComponent } from 'react'
import { Icon, Dropdown, Button } from 'semantic-ui-react'
import { updateStoreCID, updateStoreCIDName, updateStoreCIDChanged, updateStoreAuth } from "../../reducer/actions";
import { store } from '../../reducer';
import { connect } from 'react-redux';

// Change Cid Dropbox for using everywhere
class Component extends PureComponent {
  state = {
    isLoading: true,
    mounted: false,
    cidChanged: false
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
    const cidChanged = true
    const cid = await data.value
    const cidName = await data.options.find(key => key.value === data.value).text
    const auth = {...this.props.auth, cid}

    await store.dispatch(updateStoreCID(cid))
    await store.dispatch(updateStoreCIDName(cidName))
    await store.dispatch(updateStoreCIDChanged(cidChanged))
    await store.dispatch(updateStoreAuth(auth))

    console.log('auth: ', auth)
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

const mapStateToProps = (state) => ({ cid: state.cid, cidOptions: state.cidOptions, auth: state.auth })
export default connect(mapStateToProps)(Component)


