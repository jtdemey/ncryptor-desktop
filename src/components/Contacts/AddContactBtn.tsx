import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AppViews } from "../../data/AppViews";
import { Button, SvgSpan, TextSpan } from "../Keyring/GenerateKeyBtn";

type AddContactBtnProps = {
  setView: Function;
  text?: string;
};

const AddContactBtn = ({
  setView,
  text
}: AddContactBtnProps): JSX.Element => (
  <Button onClick={() => setView(AppViews.CreateContact)}>
    <SvgSpan>
      <FontAwesomeIcon
        icon={faPlus}
        size="lg"
        width="16px"
      />
    </SvgSpan>
    <TextSpan>{text || "New"}</TextSpan>
  </Button>
);

export default AddContactBtn;
