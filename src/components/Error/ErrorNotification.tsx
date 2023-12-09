import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export type ErrorNotificationProps = {
  setErrorText: Function;
  text?: string;
};

const Container = styled(motion.article)`
  position: fixed;
  top: 1rem;
  left: 2vw;
  width: 85vw;
  margin: auto;
  padding: 0.75rem 1rem;
  background: hsl(22, 98%, 35%);
  border: 6px solid hsl(22, 98%, 55%);
  border-radius: 2px;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
  word-wrap: break-word;
  z-index: 3;
`;

const ErrorNotification = ({
  setErrorText,
  text
}: ErrorNotificationProps): JSX.Element => {
  const [visible, setVisible] = React.useState(false);
  const hasErrorText = text && text !== "";
  React.useEffect(() => {
    if (hasErrorText) {
      setVisible(true);
      const setInvisibleTimeout = setTimeout(() => setVisible(false), 5000);
      const resetErrorTimeout = setTimeout(() => setErrorText(""), 5500);
      return () => {
        clearTimeout(setInvisibleTimeout);
        clearTimeout(resetErrorTimeout);
      };
    }
  }, [text]);
  return (
    <Container
      animate={{ opacity: visible ? 1 : 0, y: visible ? 20 : 0 }}
      style={{ display: hasErrorText ? "block" : "none" }}
      transition={{ ease: "easeIn" }}
    >
      {text}
    </Container>
  );
};

export default ErrorNotification;
