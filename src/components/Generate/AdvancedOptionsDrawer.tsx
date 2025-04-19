import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import KeyCapabilitiesCheckboxes from "./KeyCapabilitiesCheckboxes";

interface AdvancedOptionsDrawerProps {
  capabilities: string[];
  setCapabilities: (x: string[]) => void;
  setSubkeys: (x: string[]) => void;
  subkeys: string[];
}

const Container = styled.div`
  display: flex;
  gap: 12px;
  width: calc(100% - 1rem);
  margin: 24px 0px;
  padding-bottom: 8px;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
  border-bottom: 2px solid #cad2c5;
  border-radius: 2px;
`;

const AdvancedOptionsDrawer = ({
  capabilities,
  setCapabilities,
  setSubkeys,
  subkeys,
}: AdvancedOptionsDrawerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Container onClick={() => setIsExpanded(!isExpanded)}>
        <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} />
        {isExpanded ? "Hide" : "Show"} advanced options
      </Container>
      {isExpanded && (
        <KeyCapabilitiesCheckboxes
          capabilities={capabilities}
          setCapabilities={setCapabilities}
        />
      )}
    </>
  );
};

export default AdvancedOptionsDrawer;
