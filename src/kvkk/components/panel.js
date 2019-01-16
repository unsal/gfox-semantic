import React, { PureComponent } from "react";
import { Header } from "semantic-ui-react";
import { connect } from "react-redux";
import KVKKLayout from "../layout";
import Login from '../../auth/login'
import BirimPieChart from './charts/birimpiechart'
import TaleplerPieChart from './charts/taleplerpiechart'

class Panel extends PureComponent {
  state = {}


  MyContent = () => {
    return <React.Fragment>
      <Header> Rechart Demo</Header>
      <TaleplerPieChart />
      <BirimPieChart />
    </React.Fragment>
  }

  render() {
    return (
      <Login>
        <KVKKLayout>
          <this.MyContent />
        </KVKKLayout>
      </Login>
    );
  }


}

const mapStateToProps = state => ({ cid: state.cid, uid: state.uid });
export default connect(mapStateToProps)(Panel);