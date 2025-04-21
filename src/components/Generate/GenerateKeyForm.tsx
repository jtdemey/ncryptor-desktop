import React, { useState } from "react";
import styled from "styled-components";
import AdvancedOptionsDrawer from "./AdvancedOptionsDrawer";
import BackBtn from "../Main/BackBtn";
import CancelCreateBtn from "./CancelCreateBtn";
import Dropdown from "../Form/Dropdown";
import GenerateKeySubmitBtn from "./GenerateKeySubmitBtn";
import RadioBtnGroup from "../Form/RadioBtnGroup";
import TextInput from "../Form/TextInput";
import ValidationErrorArea from "../Form/ValidationErrorArea";
import { AppViews } from "../../data/AppViews";
import { sanitizeEmail, sanitizeInput } from "../../utils/StringSanitizer";

type GenerateKeyFormProps = {
  refreshKeys: Function;
  setErrorText: Function;
  setView: Function;
};

export const Container = styled.article`
  max-width: 400px;
  margin: auto;
`;

export const Header = styled.h2`
  margin: 0 auto 1.5rem;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
  text-align: center;
`;

export const BtnBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
`;

// Make a dropdown selection with the same display text and value
const ds = (stringValue: string): [string, string] => [
  stringValue,
  stringValue,
];

const GenerateKeyForm = ({
  refreshKeys,
  setErrorText,
  setView,
}: GenerateKeyFormProps) => {
  const initialOptions: [string, string][] = [
    ds("ed25519"),
    ds("rsa4096"),
    ds("rsa2048"),
    ds("rsa1024"),
  ];
  const [dropdownOptions, _] = useState(initialOptions);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("ed25519");
  const [selectedDate, setSelectedDate] = useState("never");
  const initialErrors: string[] = [];
  const [validationErrors, setValidationErrors] = useState(initialErrors);
  const radioSelections = ["1m", "2m", "6m", "1y", "never", "custom"];

  // Advanced options
  const [capabilities, setCapabilities] = useState(["cert"]);
  const [subkeys, setSubkeys] = useState<string[]>(["auth", "encr", "sign"]);

  const onAlgorithmSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selection = e.toString();
    setSelectedAlgorithm(selection);

    // Default RSA keys to no subkeys for simplicity's sake
    if (selection.includes("rsa")) {
      setSubkeys([]);
      setCapabilities(["auth", "cert", "encr", "sign"]);
    }

    // ED25519 keys must have a CV25519 encryption subkey
    if (selection === "ed25519") {
      setCapabilities(capabilities.filter(c => c !== "encr"));
    }
  };

  return (
    <Container>
      <BackBtn clickFunc={() => setView(AppViews.Keyring)} />
      <Header>Create a new keypair</Header>
      <ValidationErrorArea errors={validationErrors} />
      <TextInput
        autoFocus
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserId(sanitizeInput(e.target.value))
        }
        maximum={64}
        label="User ID"
        value={userId}
      />
      <TextInput
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(sanitizeEmail(e.target.value))
        }
        maximum={128}
        label="Email (optional)"
        value={email}
      />
      <TextInput
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
          setComment(e.target.value)
        }
        maximum={128}
        label="Comment (optional)"
        value={comment}
      />
      <Dropdown
        animationDuration={0.75}
        selections={dropdownOptions}
        label="Algorithm"
        setValue={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onAlgorithmSelect(e)
        }
        subLabel="(recommended: ed25519)"
        selectedValue={selectedAlgorithm}
      />
      <RadioBtnGroup
        label="Expiration date"
        selections={radioSelections}
        selectedValue={selectedDate}
        selectValue={setSelectedDate}
      />
      <AdvancedOptionsDrawer
        capabilities={capabilities}
        selectedAlgorithm={selectedAlgorithm}
        setCapabilities={setCapabilities}
        setSubkeys={setSubkeys}
        subkeys={subkeys}
      />
      <BtnBar>
        <GenerateKeySubmitBtn
          algorithm={selectedAlgorithm}
          comment={comment}
          email={email}
          capabilities={capabilities.join(",")}
          expirationDate={selectedDate}
          userId={userId}
          refreshKeys={refreshKeys}
          setErrorText={setErrorText}
          setValidationErrors={setValidationErrors}
          setView={setView}
          subkeys={subkeys}
        />
        <CancelCreateBtn clickFunc={() => setView(AppViews.Keyring)} />
      </BtnBar>
    </Container>
  );
};

export default GenerateKeyForm;
