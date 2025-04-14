import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";
import Button from "../Main/Button";

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
        backgroundColor="hsl(324, 56%, 30%)"
        borderColor="hsl(324, 36%, 10%)"
        icon={isViewing ? faEyeSlash : faEye}
        onClick={() => setIsViewing(!isViewing)}
        style={{ maxWidth: "320px" }}
        text={`${isViewing ? "Hide" : "View"} full key`}
      />
      {isViewing && <Text>{keyText}</Text>}
    </>
  );
};

export default ViewPublicKeyBtn;
