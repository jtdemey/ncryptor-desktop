import styled from "styled-components";

type ValidationErrorAreaProps = {
  errors: string[];
};

const Container = styled.div`
  margin: 1rem auto;
  background: hsl(22, 98%, 35%);
  border-color: hsl(22, 98%, 55%);
  border-style: solid;
  border-width: 0px;
  border-radius: 2px;
  box-shadow: -3px 3px 8px #222;
`;

const ErrorLine = styled.h5`
  margin: 0.25rem;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
`;

const ValidationErrorArea = ({ errors }: ValidationErrorAreaProps) => (
  <Container style={{ borderWidth: errors.length > 0 ? "4px" : "0px" }}>
    {errors.map(err => (
      <ErrorLine key={err}>{err}</ErrorLine>
    ))}
  </Container>
);

export default ValidationErrorArea;
