import React from "react";
import styled, { keyframes } from "styled-components";

const speen = keyframes`
	0%, 100% {
		animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
	}
	0% {
		transform: rotateY(0deg);
	}
	50% {
		transform: rotateY(1800deg);
		animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
	}
	100% {
		transform: rotateY(3600deg);
	}
`;

const Wheel = styled.div`
	display: flex;
	justify-content: center;
`;

const InnerWheel = styled.div`
  display: inline-block;
  width: 48px;
  height: 48px;
  margin: 8px;
  background: #84a98c;
  border-radius: 50%;
  animation: ${speen} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

const LoadingIndicator = (): JSX.Element => {
  return (
    <Wheel>
      <InnerWheel />
    </Wheel>
  );
};

export default LoadingIndicator;