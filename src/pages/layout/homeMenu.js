import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import ImgAnaveriler from "../../assets/img/menuanaveriler.png";
import ImgAktarimlar from "../../assets/img/menuaktarimlar.png";
// import ImgTalepler from "../../assets/img/kvtalepler.jpg";
import ImgAnaliz from "../../assets/img/menuanaliz2.png";
import ImgTalepler from "../../assets/img/menutalepler.png";


const HomeMenu = (props) => {
  const GridColCard = ({ img, title, route }) => (
    <Grid.Column>
      <Card as={Link} to={route}>
        <Image src={img} />
        <Card.Content>
          <Card.Header textAlign="center">{title}</Card.Header>
        </Card.Content>
      </Card>
    </Grid.Column>
  );

  const { cid } = props.auth.cids;

  return (
    cid !== 1 ? (
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
  ) : null
  )

}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(HomeMenu);
