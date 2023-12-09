import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AppViews } from "../../data/AppViews";

type GenerateKeyBtnProps = {
  setView: Function;
  text?: string;
};

export const Button = styled.div`
  margin: 0 0.1rem 1rem 0.1rem;
  padding: 0.5rem;
  background: #52796f;
  border: 1px solid #354f52;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.45);
  color: #cad2c5;
  cursor: pointer;
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

export const SvgSpan = styled.span`
  padding: 0.25rem 0.25rem 0.25rem 0;
`;

export const TextSpan = styled.h3`
  display: inline-block;
  margin: 0;
  padding: 0 0 0 0.25rem;
`;

const GenerateKeyBtn = ({
  setView,
  text
}: GenerateKeyBtnProps): JSX.Element => (
  <Button onClick={() => setView(AppViews.GenerateKey)}>
    <SvgSpan>
      <FontAwesomeIcon
        icon={faPlus}
        size="lg"
        width={16}
      />
    </SvgSpan>
    <TextSpan>{text || "Generate"}</TextSpan>
  </Button>
);

export default GenerateKeyBtn;
