import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, SvgSpan, TextSpan } from "../Keyring/GenerateKeyBtn";
import { useState } from "react";
import styled from "styled-components";

type ViewPublicKeyBtnProps = {
  keyText: string;
};

const Text = styled.article`
  grid-column: 1 / span 2;
  padding-bottom: 20px;
`;

const ViewPublicKeyBtn = ({ keyText }: ViewPublicKeyBtnProps) => {
  const [isViewing, setIsViewing] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsViewing(!isViewing)}
        style={{
          background: "hsl(324, 56%, 30%)",
          border: "1px solid hsl(324, 36%, 10%)",
          maxWidth: "320px",
        }}
      >
        <SvgSpan>
          <FontAwesomeIcon
            icon={isViewing ? faEyeSlash : faEye}
            width="16px"
            style={{ transform: "translateY(0.1rem)" }}
          />
        </SvgSpan>
        <TextSpan>{isViewing ? "Hide" : "View"} full key</TextSpan>
      </Button>
      {isViewing && <Text>{keyText}</Text>}
    </>
  );
};

export default ViewPublicKeyBtn;
