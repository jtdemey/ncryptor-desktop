import { useEffect, useState } from "react";
// @ts-ignore TS7016
import { motion } from "framer-motion";
import styled from "styled-components";
import { PrivateKey, PublicKey } from "../Main/NcryptorApp";
import MessageBox from "../Main/MessageBox";
import SectionCard from "../Main/SectionCard";
import SelectionLabel from "./SelectionLabel";
import SenderSelection from "./SenderSelection";
import RecipientSelection from "./RecipientSelection";
import TextAreaInput from "./TextAreaInput";
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
}: EncryptViewProps) => {
  const [recipient, setRecipient] = useState(
    publicKeys.length ? publicKeys[0].userIds[0]?.name ?? "" : "",
  );
  useEffect(
    () => setRecipient(publicKeys.length ? displayKeyName(publicKeys[0]) : ""),
    [publicKeys, setRecipient],
  );

  const senderFingerprint = privateKeys.find(
    (key: PrivateKey) => displayKeyName(key) === currentUser,
  )?.fingerprint;
  const recipientFingerprint = publicKeys.find(
    (key: PublicKey) => displayKeyName(key) === recipient,
  )?.fingerprint;

  return (
    <SectionCard>
			{privateKeys.length < 1 && (
				<MessageBox text="No private keys found. New keys can be generated from the Keyring view." />
			)}
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
