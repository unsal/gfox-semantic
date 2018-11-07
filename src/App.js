import React, { PureComponent } from 'react';
import './App.css';
import Homepage from './homepage';

//Redux
import { store } from "./reducer";
import { updateStoreCID, updateStoreUID } from "./reducer/actions";

class App extends PureComponent {

  componentDidMount() {
      // const auth = [{'cid':1, 'uid':'admin@grcfox.com'}]
      store.dispatch(updateStoreUID('admin@grcfox.com'))
      store.dispatch(updateStoreCID(1))
  }

  render() {
    return (
        <Homepage />
    );
  }
}

// const mapStateToProps = state => ({ auth: state.auth });
// export default connect(mapStateToProps)(App);

export default App
