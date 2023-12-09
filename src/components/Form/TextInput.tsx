import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type TextInputProps = {
  autoFocus?: boolean;
  changeHandler: Function;
  maximum: number;
  label?: string;
  value?: string;
};

const Label = styled(motion.label)`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const Input = styled(motion.input)`
  width: calc(100% - 1rem);
  margin: 0 0 1.5rem;
  padding: 0.5rem;
  background: #203031;
  border: 1px solid #222;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  font-family: "Lora", serif;
  font-size: 1.1rem;
  outline: none;

  &:focus {
    border: 1px solid #84a98c;
  }

  &::placeholder {
    color: #84a98c;
  }
`;

const TextInput = ({
  autoFocus,
  changeHandler,
  maximum,
  label,
  value
}: TextInputProps): JSX.Element => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <>
      <Label
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        {label || ""}
      </Label>
      <Input
        animate={{ opacity: [0, 1], x: [-30, 0] }}
        onChange={e => changeHandler(e)}
        max={maximum || 128}
        ref={inputRef}
        transition={{ duration: 0.55, ease: "easeOut" }}
        type="text"
        value={value}
      />
    </>
  );
};

export default TextInput;
