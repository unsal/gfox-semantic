import React, { PureComponent } from 'react'
import { Icon, Dropdown, Button } from 'semantic-ui-react'
import { updateStoreAuth } from "../../reducer/actions";
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
    const cid = await data.value
    const cidName = await data.options.find(key => key.value === data.value).text
    const cidChanged = true
    const { cidOptions } = this.props.auth.cids;

    const cids = { cid, cidName, cidChanged, cidOptions }
    const auth = {...this.props.auth, cids }
    await store.dispatch(updateStoreAuth(auth))

    // console.log('auth: ', auth)
  }

  Loader = () => {
    return <Icon loading name="firefox" size="large" />
    //   return <span>yükleniyor...</span>
  }

  render() {
    const { color } = this.props
    const { cid, cidOptions } = this.props.auth.cids
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

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Component)


