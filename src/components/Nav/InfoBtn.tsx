import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { AppViews } from "../../data/AppViews";

type InfoBtnProps = {
  setView: Function;
};

const Container = styled.div`
  position: absolute;
  top: 0.65rem;
  right: 1rem;
  font-size: 1.25rem;
`;

const InfoBtn = ({ setView }: InfoBtnProps): JSX.Element => (
  <Container onClick={() => setView(AppViews.Info)}>
    <FontAwesomeIcon
      icon={faInfoCircle}
      color="#84A98C"
      size="lg"
      title="Application info"
      width="32px"
    />
  </Container>
);

export default InfoBtn;
