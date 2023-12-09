import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import SectionCard from "../Main/SectionCard";

const Container = styled.section`
  color: hsl(97, 13%, 80%);
  font-family: "Lora", serif;
  text-align: center;

  a {
    color: hsl(97, 28%, 70%);
    text-decoration: none;
  }
`;

const MetaBox = styled(motion.article)`
  color: #cad2c5;
  font-family: "Lora", serif;
  font-size: 1rem;
`;

const Description = styled(motion.article)`
  margin-top: 2rem;
  color: #cad2c5;
  font-family: "Lora", serif;
  font-size: 1rem;
`;

const InfoView = (): JSX.Element => {
  return (
    <Container>
      <SectionCard>
        <MetaBox
          animate={{ opacity: [0, 1], y: [10, 0] }}
          transition={{ ease: "easeOut" }}
        >
          Ncryptor v1.0.1
          <br />
          by <a href="https://www.johntorsten.com">John Torsten</a>
          <br />© 2021
        </MetaBox>
        <Description
          animate={{ opacity: [0, 1], y: [10, 0] }}
          transition={{ delay: 0.1, ease: "easeOut" }}
        >
          Ncryptor is a simple frontend used to invoke the{" "}
          <a href="https://www.gnupg.org">GNU Privacy Guard</a>. It is{" "}
          <a href="https://github.com/jtdemey/ncryptor">open source software</a>.
        </Description>
      </SectionCard>
    </Container>
  );
};

export default InfoView;
