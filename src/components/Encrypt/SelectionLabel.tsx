import React from "react";
import styled from "styled-components";

type SelectionLabelProps = {
  text: string;
};

const Container = styled.div`
  padding: 0.5rem;
	background: #2f3e46;
	z-index: 1;
`;

const Text = styled.h6`
	margin: 0;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const SelectionLabel = ({ text }: SelectionLabelProps): JSX.Element => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

export default SelectionLabel;