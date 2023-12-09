import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Datepicker from "./Datepicker";

type RadioBtnGroupProps = {
  label: string;
  selections: string[];
  selectedValue: string;
  selectValue: Function;
};

const Label = styled(motion.label)`
  display: block;
  margin: 1.5rem 0 0.5rem;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BtnGroup = styled.div`
  display: flex;
  flex-flow: column;
`;

const BtnLabel = styled(motion.label)`
  color: #cad2c5;
  padding: 0 0.25rem 0.25rem;
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
`;

const Input = styled(motion.input)`
  margin: 0 0 1rem;
  padding: 0.5rem;
  background: #203031;
  border: 1px solid #222;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  font-family: "Lora", serif;
  font-size: 1.1rem;
  outline: none;
`;

const dateRegex = new RegExp(
  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
);

const RadioBtnGroup = ({
  label,
  selections,
  selectedValue,
  selectValue
}: RadioBtnGroupProps): JSX.Element => {
  return (
    <>
      <Label
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1.05, ease: "easeOut" }}
      >
        {label || "Expiration Date"}
      </Label>
      <Container>
        {selections.map(selection => (
          <BtnGroup key={selection}>
            <BtnLabel>{selection}</BtnLabel>
            <Input
              checked={
                selection === selectedValue ||
                (selection === "custom" && dateRegex.test(selectedValue))
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                selectValue(e.target.value)
              }
              type="radio"
              value={selection}
            />
          </BtnGroup>
        ))}
        {(selectedValue === "custom" || dateRegex.test(selectedValue)) && (
          <Datepicker
            changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              selectValue(e.target.value);
            }}
          />
        )}
      </Container>
    </>
  );
};

export default RadioBtnGroup;
