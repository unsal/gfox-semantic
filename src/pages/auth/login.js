import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import { config } from "../../config";
import { connect } from "react-redux";

// Her uygulamada login kontrol için...
function Login(props) {
  const [authenticated, setAuthenticated] = useState(false)
  const [mount, setMount] = useState(false)

  useEffect(() => {
    const { token } = props.auth;
    const tokenLocal = localStorage.getItem("gfox_token");
    const authenticated = token === tokenLocal;
  
    setAuthenticated(authenticated)

    return ()=> {
      setMount(true)
    }

  }, [])


  const MessageFailed =()=> {
    return (
      <Message
        color="red"
        style={{ margin: "3em", width: "600px", height: "150px" }}
      >
        <Message.Header>Güvenlik Uyarısı</Message.Header>
        <p>
          İzinsiz erişiminiz kayıt altına alınmıştır!
          <br />
          Yetkili kullanıcı olarak bu hatayı alıyorsanız lütfen uygulamayı
          tarayıcınızdan "Refresh" yapmadan, sadece menüler üzerinde gezinerek
          kullanın.
          <br />
          <a href={config.urlLogin}>Güvenli Giriş</a> yaparak kullanmaya devam
          edebilirsiniz!
        </p>
      </Message>
    );
  }

  return authenticated ? (
      props.children
    ) : (
      mount && <MessageFailed />
    );
}

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(Login);
