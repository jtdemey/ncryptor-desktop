import { PublicKey } from "./../Main/NcryptorApp";
import {
  List,
  ListItem,
  TextContainer,
  UserIdLabel,
  KeyThumbprint,
  KeyTypeLabel,
} from "../Keyring/PrivateKeysList";
import KeysListLegend from "../Keyring/KeysListLegend";
import { applyEllipsis, displayKeyName } from "../../utils/StringFormatters";

type ContactsListProps = {
  contacts: Array<PublicKey>;
  selectKey: Function;
};

const getDisplayFingerprint = (fingerprint: string): string =>
  fingerprint.substring(fingerprint.length - 8, fingerprint.length);

const ContactsList = ({ contacts, selectKey }: ContactsListProps) => {
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
            transition={{
              duration: Math.min(0.25 + 0.1 * i, 0.8),
              ease: "easeOut",
            }}
          >
            <TextContainer>
              <UserIdLabel>
                {applyEllipsis(displayKeyName(contact), 36)}
              </UserIdLabel>
              <KeyThumbprint>
                {getDisplayFingerprint(contact.fingerprint)}
              </KeyThumbprint>
              <KeyTypeLabel>{contact.keyType.toUpperCase()}</KeyTypeLabel>
            </TextContainer>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ContactsList;
