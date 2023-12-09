import React from "react";
import styled from "styled-components";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shiftLightness } from "../../utils/ColorUtils";

type CopyBtnProps = {
  color?: string;
  value: string;
};

const Container = styled.div`
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0 0.25rem 0;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.45);
  font-size: 1.25rem;
`;

const CopyBtn = ({ color, value }: CopyBtnProps): JSX.Element => {
  const [copied, setCopied] = React.useState(false);
  const btnColor = color ?? "hsl(0, 0%, 5%)";
  React.useEffect(() => {
    if (copied) {
      const copiedInterval = setTimeout(() => {
        setCopied(false);
        clearInterval(copiedInterval);
      }, 2000);
      return () => clearTimeout(copiedInterval);
    }
  });
  return (
    <Container
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
      }}
      style={{ background: shiftLightness(btnColor, -10) }}
    >
      <FontAwesomeIcon
        color={shiftLightness(btnColor, 30)}
        icon={copied ? faCheck : faCopy}
        size="1x"
        width={18}
      />
    </Container>
  );
};

export default CopyBtn;
