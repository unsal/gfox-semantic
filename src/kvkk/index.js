import React from "react";
import { Container, Header } from "semantic-ui-react";
import KVKKLayout from "./layout/";
import './kvkk.css';

const KVKK = () => (
  <KVKKLayout>
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">GFox GRC v1.o</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p>
    </Container>
  </KVKKLayout>
);

export default KVKK;
