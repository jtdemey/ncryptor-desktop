import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

type BackBtnProps = {
  clickFunc: Function;
};

const Button = styled.div`
  width: 2rem;
  position: absolute;
  margin: 0;
  font-size: 1.25rem;
  z-index: 1;
`;

const BackBtn = ({ clickFunc }: BackBtnProps): JSX.Element => (
  <Button>
    <FontAwesomeIcon
      icon={faArrowCircleLeft}
      color="#cad2c5"
      onClick={() => clickFunc()}
      size="lg"
      width="32px"
    />
  </Button>
);

export default BackBtn;
