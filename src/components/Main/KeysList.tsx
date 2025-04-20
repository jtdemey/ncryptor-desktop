// @ts-ignore
import { motion } from "framer-motion";
import styled from "styled-components";
import type { PrivateKey, PublicKey } from "./../Main/NcryptorApp";
import KeysListLegend from "./KeysListLegend";
import { applyEllipsis, displayKeyName } from "../../utils/StringFormatters";
import { isSubkey } from "../../utils/KeyListParser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type KeysListProps = {
  fillBackground?: boolean;
  isPrivate?: boolean;
  keys: Array<PrivateKey>;
  selectKey: Function;
};

const ListContainer = styled.article`
  min-width: 780px;
  overflow: scroll;
`;

const List = styled.ul`
  margin: 0.5rem 12px 0.5rem auto;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled(motion.li)`
  margin: 0.12rem 0;
  padding: 0.5rem;
  background: hsl(201, 20%, 20%);
  box-shadow: 4px 4px 0px #111;
  color: #cad2c5;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  opacity: 0;
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: auto 108px 128px 172px;
  text-shadow: -2px 2px 1px #111;
`;

const UserIdLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  text-wrap: nowrap;
  padding: 6px;
  font-family: "Lora", serif;
`;

const KeyFingerprint = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  padding: 6px;
  font-family: "Lato", sans-serif;
`;

const CanEncryptCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const KeyTypeLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  min-width: 180px;
  padding: 6px;
  color: #c2cfd6;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const getDisplayFingerprint = (fingerprint: string): string =>
  fingerprint.substring(fingerprint.length - 8, fingerprint.length);

const KeysList = ({
  fillBackground = false,
  isPrivate = false,
  keys,
  selectKey,
}: KeysListProps) => {
  const canEncrypt = (gpgKey: PrivateKey | PublicKey) =>
    gpgKey.capabilities.includes("e");
  return (
    <ListContainer>
      <KeysListLegend />
      <List>
        {keys.map((gpgKey: PrivateKey | PublicKey, i: number) => (
          <ListItem
            animate={{ opacity: [0, 1], x: [-50, 0] }}
            key={gpgKey.fingerprint}
            onClick={() => selectKey(gpgKey.fingerprint, isPrivate)}
            style={{
              ...(fillBackground && { background: gpgKey.color }),
              ...(!fillBackground && {
                borderLeft: `8px solid ${gpgKey.color}`,
              }),
              marginTop: isSubkey(gpgKey) ? "0px" : "8px",
              paddingLeft: "16px",
            }}
            transition={{
              duration: Math.min(0.25 + 0.1 * i, 0.8),
              ease: "easeOut",
            }}
          >
            <TextContainer>
              <UserIdLabel>
                {applyEllipsis(displayKeyName(gpgKey), 32)}
              </UserIdLabel>
              <KeyFingerprint>
                {getDisplayFingerprint(gpgKey.fingerprint)}
              </KeyFingerprint>
              <CanEncryptCell>
                {canEncrypt(gpgKey) && <FontAwesomeIcon icon={faCheck} />}
              </CanEncryptCell>
              <KeyTypeLabel>{gpgKey.keyType.toUpperCase()}</KeyTypeLabel>
            </TextContainer>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default KeysList;
