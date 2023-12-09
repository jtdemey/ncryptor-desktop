import React from "react";
import styled from "styled-components";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CopyTextAreaBtnProps = {
  value: string;
  visible: boolean;
};

const Container = styled.div`
  margin: 1rem auto 0 0;
`;

const Button = styled.div`
  display: inline-block;
  padding: 0.25rem;
  border: 1px solid #cad2c5;
  border-radius: 2px;
  color: #cad2c5;
  font-size: 1.25rem;
  line-height: 1.1rem;
`;

const CopyTextAreaBtn = ({
  value,
  visible
}: CopyTextAreaBtnProps): JSX.Element => {
  const [copied, setCopied] = React.useState(false);
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
    <Container style={{ display: visible ? "block" : "none" }} title="Copy text to clipboard">
      <Button
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
        }}
      >
        <FontAwesomeIcon
          icon={copied ? faCheck : faCopy}
          size="lg"
          width={28}
          height={28}
        />
      </Button>
    </Container>
  );
};

export default CopyTextAreaBtn;
