import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import TextAreaInput from "../Encrypt/TextAreaInput";
import SectionCard from "../Main/SectionCard";
import { PrivateKey } from "../Main/NcryptorApp";
import SelectionLabel from "../Encrypt/SelectionLabel";
import SenderSelection from "../Encrypt/SenderSelection";

type DecryptViewProps = {
  currentUser: string;
  privateKeys: PrivateKey[];
  setCurrentUser: Function;
};

const InputRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const DecryptView = ({
  currentUser,
  privateKeys,
  setCurrentUser
}: DecryptViewProps): JSX.Element => {
  const recipientFingerprint = privateKeys.filter(
    (key: PrivateKey) => key.userId === currentUser
  )[0]?.fingerprint;
  return (
    <SectionCard>
      <InputRow
        animate={{ x: [-50, 0] }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <SelectionLabel text="To: " />
        <SenderSelection
          currentUser={currentUser}
          privateKeys={privateKeys}
          setCurrentUser={setCurrentUser}
        />
      </InputRow>
      <TextAreaInput
        currentUser={recipientFingerprint || "unknown"}
        encryptMode={false}
      />
    </SectionCard>
  );
};

export default DecryptView;
