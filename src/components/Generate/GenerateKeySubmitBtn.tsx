import React from "react";
import styled from "styled-components";
import { executeFetch } from "../../client/ApiClient";
import { handleGpgError } from "../../client/ErrorHandlers";
import { AppViews } from "../../data/AppViews";

type GenerateKeySubmitBtnProps = {
  algorithm: string;
  expirationDate: string;
  userId: string;
  refreshKeys: Function;
  setErrorText: Function;
  setValidationErrors: Function;
  setView: Function;
};

export const Button = styled.div`
  width: calc(100% - 1rem);
  margin: 1rem 0.5rem 0.5rem;
  padding: 0.5rem 0;
  background: #52796f;
  border: 1px solid #222;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  outline: none;
  text-align: center;
`;

const dateRegex = new RegExp(
  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
);

const validateInput = (
  algorithm: string,
  expirationDate: string,
  userId: string
): string[] => {
  const validationErrors: string[] = [];
  if (!userId) {
    validationErrors.push("User ID is required.");
  }
  if (!algorithm) {
    validationErrors.push("Algorithm selection is required.");
  }
  if (!expirationDate) {
    validationErrors.push("Expiration date is required.");
  } else if (dateRegex.test(expirationDate)) {
    const now = new Date();
    const then = new Date(expirationDate);
    if (then < now) {
      validationErrors.push("Expiration date must be in the future.");
    }
  }
  return validationErrors;
};

const GenerateKeySubmitBtn = ({
  algorithm,
  expirationDate,
  userId,
  refreshKeys,
  setErrorText,
  setValidationErrors,
  setView
}: GenerateKeySubmitBtnProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const clickFunc = () => {
    const validationErrors = validateInput(algorithm, expirationDate, userId);
    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      return;
    }
    setLoading(true);
    executeFetch("genkey", { userId, algorithm, expirationDate })
      .then((response: Response) => response.json())
      .then((response: any) => {
        setLoading(false);
        if (handleGpgError(response, setErrorText)) {
          setView(AppViews.Keyring);
          refreshKeys();
        }
      });
  };
  return (
    <Button onClick={() => clickFunc()}>{loading ? "..." : "Generate"}</Button>
  );
};

export default GenerateKeySubmitBtn;
