import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import KeyCapabilitiesCheckboxes from "./KeyCapabilitiesCheckboxes";

interface AdvancedOptionsDrawerProps {
  capabilities: string[];
  selectedAlgorithm: string;
  setCapabilities: (x: string[]) => void;
  setSubkeys: (x: string[]) => void;
  subkeys: string[];
}

const Container = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin: 24px 0px;
  padding-bottom: 10px;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
  border-bottom: 2px solid #cad2c5;
  border-radius: 2px;
  div {
    transition: rotate 0.2s;
  }
`;

const Drawer = styled(motion.div)`
  padding-bottom: 16px;
  border-bottom: 2px solid #cad2c5;
`;

const AdvancedOptionsDrawer = ({
  capabilities,
  selectedAlgorithm,
  setCapabilities,
  setSubkeys,
  subkeys,
}: AdvancedOptionsDrawerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Container onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{ rotate: isExpanded ? "180deg" : "0deg" }}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {isExpanded ? "Hide" : "Show"} advanced options
      </Container>
      {isExpanded && (
        <Drawer
          animate={{ opacity: [0, 1], y: [-50, 0] }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <KeyCapabilitiesCheckboxes
            capabilities={capabilities}
            selectedAlgorithm={selectedAlgorithm}
            setCapabilities={setCapabilities}
            setSubkeys={setSubkeys}
            subkeys={subkeys}
          />
        </Drawer>
      )}
    </>
  );
};

export default AdvancedOptionsDrawer;
