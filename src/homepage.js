import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Modal,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ImageBanner from "./assets/img/cid.jpg"
import {CIDDropbox} from './components/mycomponents'
import { connect } from 'react-redux';
import ImageBackground from "./assets/img/bground.jpg" //1125 x 630px
import Logo from './assets/img/logo2.png'


// const Logo = () => <Image src={logo} size='small' />

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const HomepageHeading = ({ mobile }) => (

<Segment basic style={{ margin:'0px'}}>
<Image src={ImageBackground} fluid />
<div style = {{position: 'absolute', top: '50%', left: '10%'}}>
<div style={{marginBottom:'100px'}}>
    <div style={{ display:'inline-block'}}>
        <Image src={Logo} style={{ float:'left'}} />
        <Header
          as='h1'
          content='Gfox '
          // inverted
          style={{
            float: 'left',
            color:'#fff',
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            // marginBottom: 0,
            // marginTop: mobile ? '1.5em' : '3em',
          }}
        />
     </div>
    <Header
      as='h2'
      content='KVKK İşletim Sistemi'
      // inverted
      style={{
        color:'#fff',
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        // marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button
        color='teal'
        size='huge'
        as={Link} to='/login'
    >
       Hemen Başla
      <Icon name='right arrow' />
    </Button>
    </div>
    </div>
  </Segment>

)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends PureComponent {
  state = {}


  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })


 SelectCID = (props) => (
      <Modal trigger={<Button inverted >{props.children}</Button>} centered={false} closeIcon>
        <Modal.Header>KVKK Envanter Yönetimi için Şirketinizi Seçin</Modal.Header>
        <Modal.Content image>
        <Image wrapped size='medium' src={ImageBanner} />
          <Modal.Description>
            <Header>Şirket</Header>
            <p>Tüm işlemleriniz seçmiş olduğunuz şirket üzerinden gerçekleştirilecektir.</p>
            <p>Uygulama ekranlarından dilediğiniz zaman seçiminizi değiştirebilirsiniz</p>
            <CIDDropbox cid={this.props.cid} uid={this.props.uid} />
            {/* <Button style={{display: 'block', marginTop:'60px'}} basic content='Devam' /> */}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              // pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Anasayfa
                </Menu.Item>
                <Menu.Item as='a'>Hakkımızda</Menu.Item>
                <Menu.Item as='a'>Hizmetlerimiz</Menu.Item>
                <Menu.Item as='a'>İletişim</Menu.Item>
                <Menu.Item position='right'>
                  {/* <this.SelectCID> Giriş</this.SelectCID> */}
                  <Button as={Link} to='/login' inverted>Giriş</Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends PureComponent {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Homepage = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as='h3' style={{ fontSize: '2em' }}>
             Neden GFox?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ile kişisel verilerin işlenmesinde
            başta özel hayatın gizliliği olmak üzere kişilerin temel hak ve özgürlüklerinin korunması ve
            bu verileri işleyen kişilerin yükümlülüklerinin düzenlenmesi amaçlanmaktadır.
            Yürürlüğe girdiği Nisan 2018 tarihinden itibaren bu kanun, kişisel veri işleyen
            tüm kuruluşlar için verilerin iyi yönetilebileceği güçlü uygulama altyapılarına
            ihtiyaç bulundurmaktadır. Verbis ile tam uyumlu kişisel veri işletim ve yönetim sistemi için biz
            Türkiye'de ilk ve tek KVKK işletim sistemi olan GFox'u öneriyoruz.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
            GDPR ile uyumlu musunuz?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            GDPR (Genel Veri Koruma Yönetmeliği), 25 Mayıs 2018 tarihinde yürürlüğe girecek olan Avrupa
            Birliği merkezli veri koruma düzenlemesidir. AB vatandaşlarının kişisel verilerini işleyen tüm kuruluşları
            kapsamaktadır. Bu, AB ülkeleri dışında faaliyet gösteren şirketlerin de etkileneceği anlamına
            gelmektedir. GDPR, şu ana dek hazırlanmış en katı ve kapsamlı veri koruma düzenlemesidir.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "GDPR kapsamındaki en kritik değişiklikler neler?"
            </Header>
            <List bulleted style={{ fontSize: '1.33em', textAlign:'left', paddingLeft:'70px' }}>
              <List.Item >Yıllık cironun %4'ü kadar, 20 milyon Euro'ya varan yüksek para cezaları.</List.Item>
              <List.Item >Veri güvenliğini temin etmek adına gerekli teknik ve idari tedbirlerin alınması gerekliliği.</List.Item>
              <List.Item >Sistematik olarak veri işleyen kuruluşlar için “Veri Koruma Yetkilisi” belirleme zorunluluğu.</List.Item>
              <List.Item >AB ülkelerine ürün veya hizmet sunan farklı ülkelerdeki kuruluşlar da düzenleme kapsamında.</List.Item>
              <List.Item >Veriler, kullanım amaçları doğrultusunda kişilerin açık rızası olmadan işlenemiyor.</List.Item>
              <List.Item >İşletmeler, veri kullanımıyla ilgili bilgi talep edilmesi durumunda en geç 72 saat içerisinde bilgi vermek zorunda.</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "İşletmenizin ne gibi kişisel verileri koruması gerekiyor?"
            </Header>
            <List bulleted style={{ fontSize: '1.33em', textAlign:'left', paddingLeft:'70px' }}>
              <List.Item >Çalışanların kişisel bilgileri (kimlik bilgileri, adres, doğum tarihi, vb.).</List.Item>
              <List.Item >Müşterilerin/hastaların/konaklayanların kişisel bilgileri (pazarlama veritabanları
                          sağlık kayıtları, iletişim listeleri).</List.Item>
              <List.Item >İş ortaklarının ve hizmet sağlayıcıların kamuya açık olmayan kişisel verileri.</List.Item>
              <List.Item >Üçüncü şahıslara aktarılıp işlenen kişisel bilgiler (muhasebe kayıtları, kredi sicilleri, doğrudan pazarlama).</List.Item>
            </List>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          GDPR uyumluluğu için verilerinizi nasıl güvende tutabilirsiniz?
        </Header>
        <List bulleted style={{ fontSize: '1.33em', textAlign:'left', paddingLeft:'70px' }}>
              <List.Item ><strong>1) Veri Denetimi: </strong>Şirketinizin sahip olduğu tüm verilerin nasıl kullanıldığını bilmek zorundasınız. Hassas içeriğe sahip
              verilerin nereye taşındığını, bu verileri kimlerin, ne amaçla kullandığını görüntülemeniz gereklidir.</List.Item>
              <List.Item ><strong>2) Veri kullanım kuralları: </strong>İş ortaklarının ve hizmet sağlayıcıların kamuya açık olmayan kişisel verileri.Kişisel verilerle kimlerin, ne şekilde çalışabileceği konusunda kesin kurallar oluşturmalısınız. Bu kurallar
              kağıt üzerinde kalmamalı, etkin bir şekilde uygulanmalıdır.</List.Item>
              <List.Item ><strong>3) Çalışanların eğitimi: </strong>Her çalışan hangi verinin ne şekilde kullanılması gerektiğini bilmelidir. Çalışanları güvenlik politikanız
              hakkında bilgilendirerek veri kullanım sınırlarını belirleyebilirsiniz.</List.Item>
              <List.Item ><strong>4) Şifreleme</strong>Kişisel bilgiler içeren tüm veriler şifrelenmelidir. Şifreleme kullanımını uç noktalar da dahil olmak üzere tüm şirketinize yaymalısınız.</List.Item>
              <List.Item ><strong>5) Veri sızıntısı önleme (DLP): </strong>Veri sızıntısı önleme, mutlaka etkin bir şekilde uygulanmalı ve tüm iletişim kanallarını kapsamalıdır. E-posta, yazıcılar, USB, DVD gibi çıkarılabilir cihazlar ve diğer iletişim kanalları denetlenerek yalnızca belirli verilerin şirket
              dışına çıkabilmesi sağlanmalıdır.</List.Item>
          </List>


        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='xxx'>Daha fazlası için bize ulaşın...</a>
        </Divider>

      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Hakkımızda' />
              <List link inverted>
                <List.Item as='a'>Vizyon</List.Item>
                <List.Item as='a'>İletişim</List.Item>
                <List.Item as='a'>Hizmetlerimiz</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Hizmetlerimiz' />
              <List link inverted>
                <List.Item as='a'>Gfox Uygulama</List.Item>
                <List.Item as='a'>KVKK Danışmanlık</List.Item>
                <List.Item as='a'>XRM Danışmanlık</List.Item>
                <List.Item as='a'>BPM Danışmanlık</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                İletişim
              </Header>
              <p>
                <Icon name='envelope outline' />info@kvkk.org
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)


const mapStateToProps = (state) => ({ cid: state.cid, uid: state.uid})
connect(mapStateToProps)(DesktopContainer)

export default Homepage