import React from "react";
import { PublicKey } from "./../Main/NcryptorApp";
import {
  List,
  ListItem,
  TextContainer,
  UserIdLabel,
  KeyThumbprint,
  KeyTypeLabel
} from "../Keyring/PrivateKeysList";
import KeysListLegend from "../Keyring/KeysListLegend";

type ContactsListProps = {
  contacts: Array<PublicKey>;
  selectKey: Function;
};

const getDisplayUserId = (userId: string): string =>
  userId.length > 9 ? `${userId.substring(0, 9)}...` : userId;

const getDisplayFingerprint = (fingerprint: string): string =>
  fingerprint.substring(fingerprint.length - 8, fingerprint.length);

const ContactsList = ({
  contacts,
  selectKey
}: ContactsListProps): JSX.Element => {
  return (
    <>
      <KeysListLegend />
      <List>
        {contacts.map((contact: PublicKey, i: number) => (
          <ListItem
            animate={{ opacity: [0, 1], x: [-50, 0] }}
            key={contact.fingerprint}
            onClick={() => selectKey(contact.fingerprint, false)}
            style={{ borderLeft: `0.5rem solid ${contact.color}` }}
            transition={{ duration: 0.25 + 0.1 * i, ease: "easeOut" }}
          >
            <TextContainer>
              <UserIdLabel>{getDisplayUserId(contact.userId)}</UserIdLabel>
              <KeyThumbprint>
                {getDisplayFingerprint(contact.fingerprint)}
              </KeyThumbprint>
              <KeyTypeLabel>
                {contact.keyType.toUpperCase()}
              </KeyTypeLabel>
            </TextContainer>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ContactsList;
