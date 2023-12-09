import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AppViews } from "../../data/AppViews";

export type NavBtnProps = {
  clickFunc: Function;
  color: string;
  currentView?: AppViews;
  id: number;
  svgSrc: IconDefinition;
  text: string;
};

const Btn = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  margin-top: 0.75rem;
  min-height: 3.75rem;
  box-shadow: -0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.45);
  border-radius: 50%;
  font-size: 1.25rem;
`;

const Label = styled.h5`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
  margin: auto;
  padding-top: 0.45rem;
  text-align: center;
`;

const NavBtn = ({
  clickFunc,
  color,
  currentView,
  id,
  svgSrc,
  text
}: NavBtnProps): JSX.Element => {
  const isFocused = currentView === id;
  const borderStyle = `${
    isFocused ? "0.3rem" : "0.15rem"
  } solid ${color}`;
  return (
    <section>
      <Btn
        animate={{
          background: `hsl(201, 21%, ${isFocused ? "10%" : "16%"})`,
          borderBottom: borderStyle,
          borderLeft: borderStyle,
          y: isFocused ? "-0.15rem" : "0rem"
        }}
        onClick={() => clickFunc()}
        title={text}
      >
        <FontAwesomeIcon icon={svgSrc} color="#CAD2C5" size="lg" width={28} />
      </Btn>
      <Label style={{ fontWeight: isFocused ? "bold" : "normal" }}>{text}</Label>
    </section>
  );
};

export default NavBtn;
