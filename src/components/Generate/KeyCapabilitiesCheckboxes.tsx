import {
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const CAPABILITIES = {
  cert: "Certify",
  auth: "Authenticate",
  encr: "Encrypt",
  sign: "Sign",
};

const INVALID_KEY_CAPABILITIES = {
  ed25519: {
    currentKey: "encr",
    text: "ED25519 must use a CV25519 subkey for encryption",
  },
};

interface KeyCapabilitiesCheckboxesProps {
  capabilities: string[];
  selectedAlgorithm: string;
  setCapabilities: (x: string[]) => void;
  subkeys: string[];
  setSubkeys: (x: string[]) => void;
}

const Cell = styled.div`
  grid-column-start: span 2;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 8px;
`;

const Checkbox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #cad2c5;
  margin: 16px;
  border-radius: 2px;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px 0px;
`;

const ColumnHeader = styled.span`
  grid-column-start: span 3;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const ErrorArea = styled.section`
  grid-column-start: span 6;
  display: flex;
  align-items: center;
  gap: 16px;
  background: hsl(22, 98%, 35%);
  border: 6px solid hsl(22, 98%, 55%);
  border-radius: 2px;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  margin-bottom: 12px;
  padding: 12px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 12px;
`;

const HiddenInput = styled.input`
  display: hidden;
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const Label = styled.span`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const CheckboxInput = ({
  abbreviatedCapability,
  handleClick,
  isChecked = false,
}: {
  abbreviatedCapability: string;
  handleClick: (value: string) => void;
  isChecked?: boolean;
}) => {
  const _handleClick = () => {
    handleClick(abbreviatedCapability);
  };
  return (
    <Field onClick={() => _handleClick()}>
      <HiddenInput
        checked={isChecked}
        name={`capability-${abbreviatedCapability}`}
        onChange={() => _handleClick()}
        type="checkbox"
      />
      <Checkbox>{isChecked && <FontAwesomeIcon icon={faCheck} />}</Checkbox>
    </Field>
  );
};

const KeyCapabilitiesCheckboxes = ({
  capabilities,
  selectedAlgorithm,
  setCapabilities,
  subkeys,
  setSubkeys,
}: KeyCapabilitiesCheckboxesProps) => {
  const [errorText, setErrorText] = useState("");
  const handleClick = (
    abbreviatedCapability: string,
    isSubkeyColumn: boolean = false,
  ) => {
    const state = isSubkeyColumn ? subkeys : capabilities;
    const otherState = isSubkeyColumn ? capabilities : subkeys;

    const setState = isSubkeyColumn ? setSubkeys : setCapabilities;
    const setOtherState = isSubkeyColumn ? setCapabilities : setSubkeys;

    // Check for invalid selections
    let invalidSelection: any = null;
    let shouldPrevent = false;
    Object.keys(INVALID_KEY_CAPABILITIES).forEach(keyAlgorithm => {
      if (selectedAlgorithm !== keyAlgorithm) {
        return;
      }
      invalidSelection = INVALID_KEY_CAPABILITIES[keyAlgorithm];
      if (
        !isSubkeyColumn &&
        invalidSelection?.currentKey === abbreviatedCapability
      ) {
        shouldPrevent = true;
      }
    });
    if (shouldPrevent) {
      setErrorText(invalidSelection?.text);
      return;
    }

    if (state.some(cap => cap === abbreviatedCapability)) {
      setState(state.filter(cap => cap !== abbreviatedCapability));
      return;
    }

    setState(state.concat([abbreviatedCapability]));

    // Uncheck opposite column if checked
    if (
      isSubkeyColumn &&
      otherState.some(cap => cap === abbreviatedCapability)
    ) {
      setOtherState(otherState.filter(cap => cap !== abbreviatedCapability));
    }
  };
  return (
    <Container>
      {errorText !== "" && (
        <ErrorArea>
          <FontAwesomeIcon icon={faExclamationCircle} />
          {errorText}
        </ErrorArea>
      )}
      <ColumnHeader>This key can:</ColumnHeader>
      <ColumnHeader style={{ textAlign: "right" }}>
        Create subkeys to:
      </ColumnHeader>
      {Object.keys(CAPABILITIES).map(abbreviatedCapability => (
        <>
          <Cell style={{ justifyContent: "left" }}>
            <CheckboxInput
              abbreviatedCapability={abbreviatedCapability}
              handleClick={handleClick}
              isChecked={capabilities.some(
                capability => capability === abbreviatedCapability,
              )}
            />
          </Cell>
          <Cell style={{ justifyContent: "center" }}>
            <Label>{CAPABILITIES[abbreviatedCapability]}</Label>
          </Cell>
          <Cell style={{ justifyContent: "right" }}>
            <CheckboxInput
              abbreviatedCapability={abbreviatedCapability}
              handleClick={() => handleClick(abbreviatedCapability, true)}
              isChecked={subkeys.some(
                subkey => subkey === abbreviatedCapability,
              )}
            />
          </Cell>
        </>
      ))}
    </Container>
  );
};

export default KeyCapabilitiesCheckboxes;
