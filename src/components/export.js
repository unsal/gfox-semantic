import React, { PureComponent } from 'react'
import axios from "axios";
import {config} from '../config'
import { Icon, Modal, Button } from "semantic-ui-react"
import FileSaver from 'file-saver';

const exportFile = async (cid) => {
  const params  = {cid}
  const URL = config.URL_EXPORT
    try {
      const result = await axios.post(URL, params, config.export)
      const blob = await new Blob([result.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      await FileSaver.saveAs(blob, "gfox.xlsx");
      // return data
    } catch (err) {
          console.log("gfox>refreshstoredata() hatası..",err);
          // return []
    }
}

//Excel Export
export class ExportButton extends PureComponent {
  state = {
    open: false,
    exporting: false
  }

  handleClick= async ()=>{
    await this.setState({ exporting: true })
    await exportFile(this.props.cid)
    await this.close()
  }

  show =  () => this.setState({ open: true })
  close = () => this.setState({ open: false, exporting: false })

  render() {
    const { open } = this.state
    return (

      <div>
        {<Icon link name="cloud download" size='large' onClick={this.show} />}

        <Modal size='mini' open={open} onClose={this.close}>
          <Modal.Header>Tüm veriyi Excel'e aktar...</Modal.Header>
          <Modal.Content>

              {this.state.exporting?<p>Excel dosyası indiriliyor...</p>:<p>Tüm kvkk veritabanının Excel çıktısı üretilecek, onaylıyor musunuz?</p>}
          </Modal.Content>

          <Modal.Actions>
            <Button basic onClick={this.close}>Hayır</Button>
            <Button positive icon='download' labelPosition='right' content='Evet' onClick={this.handleClick} />
          </Modal.Actions>

        </Modal>

      </div>
    )
  }
}





