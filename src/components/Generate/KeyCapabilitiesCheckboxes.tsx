import { useState } from "react";
import styled from "styled-components";

const CAPABILITIES = {
  auth: "Authenticate",
  cert: "Certify",
  encr: "Encrypt",
  sign: "Sign",
};

interface KeyCapabilitiesCheckboxesProps {
  capabilities: string[];
  setCapabilities: (x: string[]) => void;
}

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 12px;
`;

const Label = styled.label`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const KeyCapabilitiesCheckboxes = ({
  capabilities,
  setCapabilities,
}: KeyCapabilitiesCheckboxesProps) => {
  const handleClick = (abbreviatedCapability: string) => {
    if (capabilities.some(cap => cap === abbreviatedCapability)) {
      setCapabilities(
        capabilities.filter(cap => cap !== abbreviatedCapability),
      );
      return;
    }
    setCapabilities(capabilities.concat([abbreviatedCapability]));
  };
  return (
    <Container>
      {Object.keys(CAPABILITIES).map(abbreviatedCapability => (
        <Field onClick={() => handleClick(abbreviatedCapability)}>
          <input name={`cap-${abbreviatedCapability}`} type="checkbox" />
          <Label htmlFor={`cap-${abbreviatedCapability}`}>
            {CAPABILITIES[abbreviatedCapability]}
          </Label>
        </Field>
      ))}
    </Container>
  );
};

export default KeyCapabilitiesCheckboxes;
