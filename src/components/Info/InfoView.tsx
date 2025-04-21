import { motion } from "framer-motion";
import styled from "styled-components";
import SectionCard from "../Main/SectionCard";
import useCommandResult from "../../hooks/useCommandResult";
import { getGpgVersion } from "../../services/getGpgVersion";

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
  transition: { ease: "easeOut", duration: 0.4 },
};

const InfoView = () => {
  const gpgVersionText = useCommandResult(getGpgVersion);
  return (
    <Container>
      <SectionCard>
        <MetaBox {...animationProps}>
          Ncryptor Desktop v0.7
          <br />
          by <strong>John Torsten</strong>
          <br />
          🄯 2024
        </MetaBox>
        <Text {...animationProps}>{gpgVersionText}</Text>
        <Text {...animationProps}>
          Ncryptor Desktop is a simple frontend used to invoke the{" "}
          <i>GNU Privacy Guard</i> (gpg). It is free and open source software.
        </Text>
      </SectionCard>
    </Container>
  );
};

export default InfoView;
