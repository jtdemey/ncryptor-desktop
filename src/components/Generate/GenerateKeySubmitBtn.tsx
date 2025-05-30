import React from "react";
import styled from "styled-components";
import { handleGpgError } from "../../client/ErrorHandlers";
import { AppViews } from "../../data/AppViews";
import { generateKeypair } from "../../services/generateKeypair";
import { generateSubkey } from "../../services/generateSubkey";

type GenerateKeySubmitBtnProps = {
  algorithm: string;
  comment: string;
  email: string;
  capabilities: string;
  expirationDate: string;
  userId: string;
  refreshKeys: Function;
  setErrorText: Function;
  setValidationErrors: Function;
  setView: Function;
  subkeys: string[];
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
  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
);

const validateInput = (
  algorithm: string,
  expirationDate: string,
  userId: string,
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

const findKeyFingerprint = (keyGenerationOutput: string): string | null => {
  let result: string | null = null;
  const lines = keyGenerationOutput.split("\n");
  lines.forEach(line => {
    const target = "Key fingerprint =";
    const maybeIndex = line.indexOf(target);
    if (maybeIndex === -1) {
      return;
    }

    result = line.substring(maybeIndex + target.length).replace(/\s/g, "");
  });
  return result;
};

const GenerateKeySubmitBtn = ({
  algorithm,
  comment,
  email,
  capabilities,
  expirationDate,
  userId,
  refreshKeys,
  setErrorText,
  setValidationErrors,
  setView,
  subkeys,
}: GenerateKeySubmitBtnProps) => {
  const [loading, setLoading] = React.useState(false);
  const clickFunc = () => {
    const validationErrors = validateInput(algorithm, expirationDate, userId);
    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      return;
    }
    setLoading(true);
    generateKeypair(
      userId,
      email,
      comment,
      algorithm,
      capabilities,
      expirationDate,
    ).then((response: any) => {
      const navigateAway = () => {
        setLoading(false);
        if (handleGpgError(response, setErrorText)) {
          setView(AppViews.Keyring);
          refreshKeys();
        }
      };
      if (subkeys.length > 0) {
        const fingerprint = findKeyFingerprint(response);
        if (!fingerprint) {
          setValidationErrors([
            "Created main key, but subkey creation failed (unabled to parse created key's fingerprint).",
          ]);
          return;
        }
        Promise.all(
          subkeys.map(capability =>
            generateSubkey(fingerprint, algorithm, capability, expirationDate),
          ),
        )
          .catch(err => {
            setValidationErrors([err]);
            return;
          })
          .then(() => navigateAway());
      } else {
        navigateAway();
      }
    });
  };
  return (
    <Button onClick={() => clickFunc()}>{loading ? "..." : "Generate"}</Button>
  );
};

export default GenerateKeySubmitBtn;
