import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type PublicKeyInputProps = {
  setText: Function;
  text: string;
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
`;

const TextArea = styled(motion.textarea)`
  width: calc(100% - 0.8rem - 1px);
  height: 50vh;
  margin: 0 auto 0;
  padding: 0.4rem;
  background: #203031;
  border-top: 1px solid #84a98c;
  border-bottom: 1px solid #84a98c;
  border-right: none;
  border-left: none;
  box-shadow: -0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.45);
  color: #cad2c5;
  font-family: "Lora", serif;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const PublicKeyInput = ({
  setText,
  text
}: PublicKeyInputProps): JSX.Element => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  return (
    <Container>
      <TextArea
        animate={{ x: [-30, 0] }}
        onChange={e => handleTextChange(e)}
        transition={{ duration: 0.45, ease: "easeOut" }}
        value={text}
      />
    </Container>
  );
};

export default PublicKeyInput;
