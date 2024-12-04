import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  width: 100%;
  border-bottom: 1px solid #111;
`;

const Text = styled.h5`
  margin: 0;
  padding: 0 0 0.1rem 0.25rem;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
`;

const KeysListLegend = () => (
  <Container>
    <Text>User ID</Text>
    <Text>Fingerprint</Text>
    <Text>Type</Text>
  </Container>
);

export default KeysListLegend;
