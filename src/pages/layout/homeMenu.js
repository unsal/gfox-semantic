import React, { PureComponent } from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import ImgAnaveriler from "../../assets/img/menuanaveriler.png";
import ImgAktarimlar from "../../assets/img/menuaktarimlar.png";
// import ImgTalepler from "../../assets/img/kvtalepler.jpg";
import ImgAnaliz from "../../assets/img/menuanaliz2.png";
import ImgTalepler from "../../assets/img/menutalepler.png";

class HomeMenu extends PureComponent {
  GridColCard = ({ img, title, route }) => (
    <Grid.Column>
      <Card as={Link} to={route}>
        <Image src={img} />
        <Card.Content>
          <Card.Header textAlign="center">{title}</Card.Header>
        </Card.Content>
      </Card>
    </Grid.Column>
  );

  render() {
    const { GridColCard } = this;
    return this.props.cid !== 1 ? (
      <div className="layout-homemenu">
        <Grid>
          <Grid.Row columns={4} >
            <GridColCard
              img={ImgAnaveriler}
              title="ANAVERİLER"
              route="/anaveriler"
            />{" "}
            <GridColCard
              img={ImgAktarimlar}
              title="AKTARIMLAR"
              route="/aktarimlar"
            />{" "}
            <GridColCard img={ImgAnaliz} title="ANALİZ" route="/analiz" />{" "}
            <GridColCard img={ImgTalepler} title="TALEPLER" route="/talepler" />{" "}
          </Grid.Row>
        </Grid>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  cid: state.cid
});
export default connect(mapStateToProps)(HomeMenu);
