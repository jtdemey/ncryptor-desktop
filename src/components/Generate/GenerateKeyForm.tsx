import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../Form/Dropdown";
import RadioBtnGroup from "../Form/RadioBtnGroup";
import TextInput from "../Form/TextInput";
import BackBtn from "../Main/BackBtn";
import CancelCreateBtn from "./CancelCreateBtn";
import GenerateKeySubmitBtn from "./GenerateKeySubmitBtn";
import { AppViews } from "../../data/AppViews";
import { sanitizeEmail, sanitizeInput } from "../../utils/StringSanitizer";
import ValidationErrorArea from "../Form/ValidationErrorArea";

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

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("rsa4096");
  const [selectedDate, setSelectedDate] = useState("never");
  const initialErrors: string[] = [];
  const [validationErrors, setValidationErrors] = useState(initialErrors);
  const radioSelections = ["1m", "2m", "6m", "1y", "never", "custom"];

  return (
    <Container>
      <BackBtn clickFunc={() => setView(AppViews.Keyring)} />
      <Header>Create a new keypair</Header>
      <ValidationErrorArea errors={validationErrors} />
      <Notice>Are you creating a personal key? You may want to use a more modern approach similarly to what's documented <a href="https://www.gniibe.org/memo/software/gpg/keygen-25519.html">here</a>.</Notice>
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
