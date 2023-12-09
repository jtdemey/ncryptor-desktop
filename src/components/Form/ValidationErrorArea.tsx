import React from "react";
import styled from "styled-components";

type ValidationErrorAreaProps = {
  errors: string[];
};

const Container = styled.div`
  margin: 1rem auto;
`;

const ErrorLine = styled.h5`
  margin: 0.25rem;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
`;

const ValidationErrorArea = ({
  errors
}: ValidationErrorAreaProps): JSX.Element => (
  <Container style={{ border: errors.length > 0 ? "2px solid #7e1b1b" : "none" }}>
    {errors.map(err => (
      <ErrorLine key={err}>{err}</ErrorLine>
    ))}
  </Container>
);

export default ValidationErrorArea;
