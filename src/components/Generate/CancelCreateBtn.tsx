import React from "react";
import styled from "styled-components";

type CancelCreateBtnProps = {
  clickFunc: Function;
};

const Button = styled.div`
	width: calc(100% - 1rem);
  margin: 1rem 0.5rem 0.5rem;
  padding: 0.5rem 0;
  background: #354f52;
  border: 1px solid #222;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
	font-weight: bold;
  outline: none;
	text-align: center;
`;

const CancelCreateBtn = ({ clickFunc }: CancelCreateBtnProps): JSX.Element => {
  return <Button onClick={() => clickFunc()}>Cancel</Button>;
};

export default CancelCreateBtn;