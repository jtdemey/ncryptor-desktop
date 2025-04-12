import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Button, SvgSpan, TextSpan } from "../Keyring/GenerateKeyBtn";

type CopyPublicKeyBtnProps = {
  keyText: string;
};

const CopyPublicKeyBtn = ({ keyText }: CopyPublicKeyBtnProps) => (
  <Button
    onClick={() => navigator.clipboard.writeText(keyText)}
    style={{
      background: "hsl(219, 26%, 52%)",
      border: "1px solid hsl(219, 18%, 22%)",
      maxWidth: "320px",
    }}
  >
    <SvgSpan>
      <FontAwesomeIcon
        icon={faCopy}
        width="16px"
        style={{ transform: "translateY(0.1rem)" }}
      />
    </SvgSpan>
    <TextSpan>Copy full key</TextSpan>
  </Button>
);

export default CopyPublicKeyBtn;
