import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type SectionCardProps = {
	backgroundColor?: string;
  children: React.ReactNode;
};

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const SectionCard = ({ backgroundColor, children }: SectionCardProps): JSX.Element => (
  <Container
    animate={{ opacity: [0, 1], x: [-20, 0] }}
		style={{ background: backgroundColor ?? "none" }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    {children}
  </Container>
);

export default SectionCard;
