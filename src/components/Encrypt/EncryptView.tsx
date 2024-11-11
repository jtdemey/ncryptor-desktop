import React from "react";
// @ts-ignore TS7016
import { motion } from "framer-motion";
import styled from "styled-components";
import TextAreaInput from "./TextAreaInput";
import SectionCard from "../Main/SectionCard";
import { PrivateKey, PublicKey } from "../Main/NcryptorApp";
import RecipientSelection from "./RecipientSelection";
import SenderSelection from "./SenderSelection";
import SelectionLabel from "./SelectionLabel";
import { displayKeyName } from "../../utils/StringFormatters";

type EncryptViewProps = {
  currentUser: string;
  privateKeys: PrivateKey[];
  publicKeys: PublicKey[];
  setCurrentUser: Function;
};

const InputRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const EncryptView = ({
  currentUser,
  privateKeys,
  publicKeys,
  setCurrentUser,
}: EncryptViewProps): JSX.Element => {
  const [recipient, setRecipient] = React.useState(
    publicKeys.length ? publicKeys[0].userIds[0]?.name ?? "" : "",
  );
  React.useEffect(
    () => setRecipient(publicKeys.length ? displayKeyName(publicKeys[0]) : ""),
    [publicKeys, setRecipient],
  );

  const senderFingerprint = privateKeys.filter(
    (key: PrivateKey) => displayKeyName(key) === currentUser,
  )[0]?.fingerprint;
  const recipientFingerprint = publicKeys.filter(
    (key: PublicKey) => displayKeyName(key) === recipient,
  )[0]?.fingerprint;

  return (
    <SectionCard>
      <InputRow
        animate={{ x: [-50, 0] }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <SelectionLabel text="From: " />
        <SenderSelection
          currentUser={currentUser}
          privateKeys={privateKeys}
          setCurrentUser={setCurrentUser}
        />
      </InputRow>
      <InputRow
        animate={{ x: [-40, 0] }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <SelectionLabel text="To: " />
        <RecipientSelection
          publicKeys={publicKeys}
          recipient={recipient}
          setRecipient={setRecipient}
        />
      </InputRow>
      <TextAreaInput
        currentUser={senderFingerprint || "unknown"}
        encryptMode={true}
        recipient={recipientFingerprint || "unknown"}
      />
    </SectionCard>
  );
};

export default EncryptView;
