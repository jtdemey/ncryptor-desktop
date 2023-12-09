import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shiftLightness } from "../../utils/ColorUtils";

type KeyHeaderProps = {
  color: string;
  fingerprint: string;
  isKeyPrivate: boolean;
};

const Container = styled.div`
  display: flex;
  position: relative;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
`;

const PrivacyLabel = styled(motion.span)`
  position: absolute;
  top: 20px;
  left: 40px;
  padding: 0.25rem;
  border-radius: 3px;
  font-family: "Lora", serif;
  font-size: 0.9rem;
  z-index: 1;
`;

const Text = styled(motion.h1)`
  position: absolute;
  top: 38px;
  left: 30px;
  margin: 0.75rem;
  padding-left: 3rem;
  font-size: 1.25rem;
  letter-spacing: 0.2rem;
`;

const KeyHeader = ({
  color,
  fingerprint,
  isKeyPrivate
}: KeyHeaderProps): JSX.Element => (
  <Container>
    <PrivacyLabel
      animate={{ opacity: [0, 1], x: [-20, 0] }}
      style={{ background: isKeyPrivate ? "#4C1E4F" : "#32021F" }}
      transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
    >
      {isKeyPrivate ? "Private" : "Public"}
    </PrivacyLabel>
    <FontAwesomeIcon
      color={shiftLightness(color, 10)}
      icon={faKey}
      size="8x"
      style={{
        transform: `rotate(-45deg) scale(-1, 1) translate(-40px, 20px)`
      }}
      width={160}
    />
    <Text
      animate={{ opacity: [0, 1], y: [8, 0] }}
      transition={{ delay: 0.75, duration: 0.45, ease: "easeOut" }}
    >
      {fingerprint.substring(fingerprint.length - 8, fingerprint.length)}
    </Text>
  </Container>
);

export default KeyHeader;
