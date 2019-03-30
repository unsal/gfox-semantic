import React from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { updateStoreAuth } from "../../reducer/actions";
import { store } from "../../reducer";
import { connect } from "react-redux";

// Change Cid Dropbox for using everywhere
function SelectCID(props) {

  const handleChange = async (e, data) => {

    e.preventDefault();
    const cid = await data.value;
    const cidName = await data.options.find(key => key.value === data.value).text;
    const cidChanged = true;
    const { cidOptions } = props.auth.cids;

    const cids = { cid, cidName, cidChanged, cidOptions };
    const auth = { ...props.auth, cids };
    await store.dispatch(updateStoreAuth(auth));

  };

  const { color } = props;
  const { cid, cidOptions } = props.auth.cids;

    // console.log('options: ',options)
    return (
      <Button.Group color={color}>
        <Dropdown
          value={cid}
          options={cidOptions}
          onChange={handleChange}
          button
          placeholder="Firma seçiminiz?"
        />
      </Button.Group>
    )

}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(SelectCID);
