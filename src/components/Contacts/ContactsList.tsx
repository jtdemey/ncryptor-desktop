import { PublicKey } from "./../Main/NcryptorApp";
import KeysList from "../Main/KeysList";

type ContactsListProps = {
  contacts: Array<PublicKey>;
  selectKey: Function;
};

const ContactsList = ({ contacts, selectKey }: ContactsListProps) => (
  <KeysList keys={contacts} selectKey={selectKey} />
);

export default ContactsList;
