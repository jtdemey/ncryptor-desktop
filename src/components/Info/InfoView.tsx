import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { getGpgVersion } from "../../services/getGpgVersion";
import SectionCard from "../Main/SectionCard";
import useCommandResult from "../../hooks/useCommandResult";

const Container = styled.section`
  padding: 0 1rem;
  color: hsl(97, 13%, 80%);
  font-family: "Lora", serif;
  text-align: left;

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

const Text = styled(motion.article)`
  margin-top: 2rem;
  color: #cad2c5;
  font-family: "Lora", serif;
  font-size: 1rem;
`;

const animationProps = {
  animate: { opacity: [0, 1], y: [10, 0] },
  transition: { ease: "easeOut", duration: 0.4 }
};

const InfoView = (): JSX.Element => {
  const gpgVersionText = useCommandResult(getGpgVersion);
  return (
    <Container>
      <SectionCard>
        <MetaBox {...animationProps}>
          Ncryptor Desktop v1.0
          <br />
          by <a href="https://www.johntorsten.com">John Torsten</a>
          <br />© 2023
        </MetaBox>
        <Text {...animationProps}>
          {gpgVersionText}
        </Text>
        <Text {...animationProps}>
          Ncryptor Desktop is a simple frontend used to invoke the{" "}
          <a href="https://www.gnupg.org">GNU Privacy Guard</a>. It is{" "}
          <a href="https://github.com/jtdemey/ncryptor-desktop">
            open source software
          </a>
          .
        </Text>
      </SectionCard>
    </Container>
  );
};

export default InfoView;
