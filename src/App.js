import React, { PureComponent } from 'react';
import './App.css';
import Homepage from './homepage';

//Redux

class App extends PureComponent {

  render() {
    return (
        <Homepage />
    );
  }
}

// const mapStateToProps = state => ({ auth: state.auth });
// export default connect(mapStateToProps)(App);

export default App
