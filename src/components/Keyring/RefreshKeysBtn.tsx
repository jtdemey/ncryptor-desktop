import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { Button, SvgSpan, TextSpan } from "./GenerateKeyBtn";

type RefreshKeysBtnProps = {
  refreshKeys: Function;
};

const RefreshKeysBtn = ({ refreshKeys }: RefreshKeysBtnProps): JSX.Element => (
  <Button onClick={() => refreshKeys()}>
    <SvgSpan>
      <FontAwesomeIcon
        icon={faRedo}
        size="lg"
        width="16px"
      />
    </SvgSpan>
    <TextSpan>Refresh</TextSpan>
  </Button>
);

export default RefreshKeysBtn;
