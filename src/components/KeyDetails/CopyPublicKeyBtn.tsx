import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "../Main/Button";

type CopyPublicKeyBtnProps = {
  keyText: string;
};

const CopyPublicKeyBtn = ({ keyText }: CopyPublicKeyBtnProps) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const copiedInterval = setTimeout(() => {
        setCopied(false);
        clearInterval(copiedInterval);
      }, 2000);
      return () => clearTimeout(copiedInterval);
    }
  });
  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(keyText);
  };
  return (
    <Button
      backgroundColor="hsl(219, 26%, 52%)"
      borderColor="hsl(219, 18%, 22%)"
      icon={copied ? faCheck : faCopy}
      onClick={handleClick}
      style={{ maxWidth: "320px" }}
      text={copied ? "Copied!" : "Copy full key"}
    />
  );
};

export default CopyPublicKeyBtn;
