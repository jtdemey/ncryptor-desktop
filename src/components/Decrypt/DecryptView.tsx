// @ts-ignore TS7016
import { motion } from "framer-motion";
import TextAreaInput from "../Encrypt/TextAreaInput";
import SectionCard from "../Main/SectionCard";
import { PrivateKey } from "../Main/NcryptorApp";
import { displayKeyName } from "../../utils/StringFormatters";

type DecryptViewProps = {
  currentUser: string;
  privateKeys: PrivateKey[];
};

const DecryptView = ({
  currentUser,
  privateKeys,
}: DecryptViewProps): JSX.Element => {
  const recipientFingerprint = privateKeys.filter(
    (key: PrivateKey) => displayKeyName(key) === currentUser
  )[0]?.fingerprint;
  return (
    <SectionCard>
      <TextAreaInput
        currentUser={recipientFingerprint || "unknown"}
        encryptMode={false}
      />
    </SectionCard>
  );
};

export default DecryptView;
