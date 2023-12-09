import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type KeyPropertyLabelProps = {
  text: string;
};

const Label = styled(motion.h6)`
  margin: 0;
`;

const KeyPropertyLabel = ({ text }: KeyPropertyLabelProps): JSX.Element => (
  <Label
    animate={{ opacity: [0, 1], y: [10, 0] }}
    transition={{ duration: 0.45, ease: "easeOut" }}
  >
    {text}
  </Label>
);

export default KeyPropertyLabel;
