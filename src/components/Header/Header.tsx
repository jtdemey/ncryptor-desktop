import styled from "styled-components";

const Banner = styled.div`
  width: 100%;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
  color: #cad2c5;
`;

const Title = styled.h1`
  height: 1rem;
  margin: 0.75rem;
  padding-left: 1.25rem;
  letter-spacing: 0.5rem;
`;

const Header = () => (
  <Banner>
    <Title>NCRYPTOR</Title>
  </Banner>
);

export default Header;
