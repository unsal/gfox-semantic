import React from "react";
import { Container, Image } from "semantic-ui-react";
import KVKKLayout from "./layout/";
import './kvkk.css';
import watermark from "../assets/img/watermark.png"

const KVKK = () => (
  <KVKKLayout>
    <Container text style={{ marginTop: "7em" }}>
      <Image src={watermark}  disabled />
    </Container>
  </KVKKLayout>
);

export default KVKK;
