import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, SvgSpan, TextSpan } from "../Keyring/GenerateKeyBtn";

type DeleteKeyBtnProps = {
  showModal: Function;
};

const DeleteKeyBtn = ({ showModal }: DeleteKeyBtnProps): JSX.Element => (
  <Button
    onClick={() => showModal()}
    style={{
      background: "hsl(354, 93%, 22%)",
      border: "1px solid hsl(354, 93%, 22%)"
    }}
  >
    <SvgSpan>
      <FontAwesomeIcon
        icon={faTrash}
        width="16px"
        style={{ transform: "translateY(0.1rem)" }}
      />
    </SvgSpan>
    <TextSpan>Delete key</TextSpan>
  </Button>
);

export default DeleteKeyBtn;
