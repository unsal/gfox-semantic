import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import ImgAnaveriler from "../../assets/img/menuanaveriler.png";
import ImgAktarimlar from "../../assets/img/menuaktarimlar.png";
import ImgAnaliz from "../../assets/img/menuanaliz2.png";
import ImgTalepler from "../../assets/img/menutalepler.png";
import ImgHesaplar from "../../assets/img/menuhesaplar.png";


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
  const isDpo = (props.auth.dpo || props.auth.admin)
  let columns = isDpo ? 5 : 4

  return (
    cid !== 1 ? (
    <div className="layout-homemenu">
      <Grid>
        <Grid.Row columns={columns} >
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
          {isDpo && <GridColCard img={ImgHesaplar} title="HESAPLAR" route="/accounts" />}
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
