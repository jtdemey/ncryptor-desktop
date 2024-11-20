import React from "react";
// @ts-ignore
import { motion } from "framer-motion";
import styled from "styled-components";
import FileInput from "./FileInput";
import TextAreaSubmitBtn from "./TextAreaSubmitBtn";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CopyTextAreaBtn from "./CopyTextAreaBtn";
import { encryptMessage } from "../../services/encryptMessage";
import { decryptMessage } from "../../services/decryptMessage";

type TextAreaInputProps = {
  currentUser: string;
  encryptMode: boolean;
  recipient?: string;
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

const BtnRow = styled.section`
  display: flex;
`;

const TextAreaInput = ({
  currentUser,
  encryptMode,
  recipient,
}: TextAreaInputProps) => {
  const dimensions = useWindowDimensions();
  const [text, setText] = React.useState("");
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const btnText = encryptMode ? "Encrypt" : "Decrypt";
  const callService = encryptMode
    ? () => encryptMessage(currentUser, recipient ?? "", text)
    : () => decryptMessage(text);
  const textAreaStyle = {
    height: dimensions.height ? dimensions.height - 350 : "40vh",
  };

  return (
    <Container>
      <TextArea
        animate={{ x: [-30, 0] }}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleTextChange(e)
        }
        placeholder={encryptMode ? "Enter message" : "Enter PGP encrypted message"}
        style={textAreaStyle}
        transition={{ duration: 0.45, ease: "easeOut" }}
        value={text}
      />
      <BtnRow>
        <FileInput setText={setText} />
        <CopyTextAreaBtn value={text} visible={text !== ""} />
        <TextAreaSubmitBtn
          label={btnText}
          setText={setText}
          service={() => callService()}
        />
      </BtnRow>
    </Container>
  );
};

export default TextAreaInput;
