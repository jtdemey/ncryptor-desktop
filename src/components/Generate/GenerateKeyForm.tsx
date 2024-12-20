import React from "react";
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
  const [dropdownOptions, _] = React.useState(initialOptions);

  const [userId, setUserId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [comment, setComment] = React.useState("");

  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState("rsa4096");
  const [selectedDate, setSelectedDate] = React.useState("never");
  const initialErrors: string[] = [];
  const [validationErrors, setValidationErrors] = React.useState(initialErrors);
  const radioSelections = ["1m", "2m", "6m", "1y", "never", "custom"];

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
          setSelectedAlgorithm(e.toString())
        }
        subLabel="(recommended: rsa4096)"
        selectedValue={selectedAlgorithm}
      />
      <RadioBtnGroup
        label="Expiration Date"
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
