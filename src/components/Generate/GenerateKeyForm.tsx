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

export const Notice = styled.article`
  margin: 0 auto 1.5rem;
  padding: 8px;
  background: #52796f;
  border-radius: 8px;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
  & > a {
    color: #00e600;
  }
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
  const [capabilities, setCapabilities] = useState([
    "cert",
    "auth",
    "encr",
    "sign",
  ]);
  console.log(capabilities);
  const [subkeys, setSubkeys] = useState<string[]>([]);

  return (
    <Container>
      <BackBtn clickFunc={() => setView(AppViews.Keyring)} />
      <Header>Create a new keypair</Header>
      <ValidationErrorArea errors={validationErrors} />
      <Notice>
        Are you creating a personal key? RSA will be deprecated in 2030. ED25519
        is a modern alternative. <em>Ncryptor</em> supports usage of ED25519,
        but generating them is coming in a future version.
      </Notice>
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
          setSelectedAlgorithm(e.toString())
        }
        subLabel="(recommended: rsa4096)"
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
        setCapabilities={setCapabilities}
        setSubkeys={setSubkeys}
        subkeys={subkeys}
      />
      <BtnBar>
        <GenerateKeySubmitBtn
          algorithm={selectedAlgorithm}
          comment={comment}
          email={email}
          expirationDate={selectedDate}
          userId={userId}
          refreshKeys={refreshKeys}
          setErrorText={setErrorText}
          setValidationErrors={setValidationErrors}
          setView={setView}
        />
        <CancelCreateBtn clickFunc={() => setView(AppViews.Keyring)} />
      </BtnBar>
    </Container>
  );
};

export default GenerateKeyForm;
