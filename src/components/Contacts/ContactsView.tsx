import React from "react";
import styled from "styled-components";
import { PublicKey } from "../Main/NcryptorApp";
import SectionCard from "../Main/SectionCard";
import NoKeysHeader from "../Keyring/NoKeysHeader";
import ContactsList from "./ContactsList";
import RefreshKeysBtn from "../Keyring/RefreshKeysBtn";
import AddContactBtn from "./AddContactBtn";
import LoadingIndicator from "../Main/LoadingIndicator";

type ContactsViewProps = {
  publicKeys: PublicKey[];
  refreshContacts: Function;
  selectKey: Function;
  setView: Function;
};

const BtnBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const renderContent = (
  loading: boolean,
  publicKeys: PublicKey[],
  selectKey: Function
) => {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (publicKeys.length < 1) {
    return <NoKeysHeader isPrivate={false} />;
  }
  return <ContactsList contacts={publicKeys} selectKey={selectKey} />;
};

const ContactsView = ({
  publicKeys,
  refreshContacts,
  selectKey,
  setView
}: ContactsViewProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const refreshHandler = () => {
    setLoading(true);
    refreshContacts(() => setLoading(false));
  };
  return (
    <section>
      <SectionCard>
        <BtnBar>
          <AddContactBtn setView={setView} text="New" />
          <RefreshKeysBtn refreshKeys={refreshHandler} />
        </BtnBar>
        {renderContent(loading, publicKeys, selectKey)}
      </SectionCard>
    </section>
  );
};

export default ContactsView;
