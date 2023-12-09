import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type DatepickerProps = {
  changeHandler: Function;
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
  margin: 0 0 1rem;
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

const Datepicker = ({
  changeHandler,
  label,
  value
}: DatepickerProps): JSX.Element => {
  return (
    <>
      <Label
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1.05, ease: "easeOut" }}
      >
        {label || ""}
      </Label>
      <Input
        animate={{ opacity: [0, 1], x: [-30, 0] }}
        onChange={e => changeHandler(e)}
        transition={{ duration: 0.55, ease: "easeOut" }}
        type="date"
        value={value}
      />
    </>
  );
};

export default Datepicker;
