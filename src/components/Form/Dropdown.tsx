import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type DropdownProps = {
  animationDuration?: number;
  label: string;
  noSelectionsText?: string;
  selectedValue: string | number;
  selections: string[][];
  setValue: Function;
  subLabel?: string;
};

const Label = styled(motion.label)`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const SubLabel = styled.label`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 0.95rem;
  padding-left: 0.5rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0px;
`;

const Select = styled(motion.select)`
  appearance: none;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  background: #203031;
  border: 1px solid #222;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
  outline: none;

  &:focus {
    border: 1px solid #84a98c;
  }

  &::placeholder {
    color: #84a98c;
  }

  &:after {
    border-radius: 0px;
  }
`;

const CaretContainer = styled.div`
  color: #cad2c5;
  float: right;
  transform: translate(-18px, 8px);
`;

const Dropdown = ({
  animationDuration,
  selections,
  label,
  noSelectionsText = "No keys found",
  setValue,
  subLabel,
  selectedValue,
}: DropdownProps) => {
  return (
    <>
      {label && (
        <Label
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          {label || ""}
        </Label>
      )}
      {subLabel && <SubLabel>{subLabel || ""}</SubLabel>}
      <Container>
        <Select
          animate={{ opacity: [0, 1], x: [-30, 0] }}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setValue(e.target.value)
          }
          transition={{ duration: animationDuration ?? 0, ease: "easeOut" }}
          value={selectedValue}
        >
          {selections.length > 0 ? (
            selections.map((pair: string[]) => (
              <option key={pair[0]} value={pair[1]}>
                {pair[1]}
              </option>
            ))
          ) : (
            <option>{noSelectionsText}</option>
          )}
        </Select>
        <CaretContainer>
          <FontAwesomeIcon icon={faCaretDown} />
        </CaretContainer>
      </Container>
    </>
  );
};

export default Dropdown;
