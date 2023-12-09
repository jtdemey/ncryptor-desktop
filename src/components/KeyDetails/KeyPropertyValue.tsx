import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import CopyBtn from "./CopyBtn";

type KeyPropertyValueProps = {
  animationDelay?: number;
  color?: string;
  showCopyBtn?: boolean;
  text: string;
};

const Value = styled(motion.h6)`
  font-family: "Lora", serif;
  font-size: 1.5rem;
  line-break: anywhere;
  margin: 0.25rem 0 1.5rem;
`;

const KeyPropertyValue = ({
  animationDelay,
  color,
  showCopyBtn,
  text
}: KeyPropertyValueProps): JSX.Element => (
  <Value
    animate={{ opacity: [0, 1], x: [-10, 0] }}
    transition={{ delay: animationDelay ?? 0.25, duration: 0.45, ease: "easeOut" }}
  >
    {text}
    {showCopyBtn && <CopyBtn color={color} value={text} />}
  </Value>
);

export default KeyPropertyValue;
