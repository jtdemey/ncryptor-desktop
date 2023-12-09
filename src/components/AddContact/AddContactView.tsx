import React from "react";
import SectionCard from "../Main/SectionCard";
import AddContactForm from "./AddContactForm";

type AddContactViewProps = {
  refreshContacts: Function;
  setErrorText: Function;
  setView: Function;
};

const AddContactView = ({
  refreshContacts,
  setErrorText,
  setView
}: AddContactViewProps): JSX.Element => (
  <SectionCard>
    <AddContactForm
      refreshContacts={refreshContacts}
      setErrorText={setErrorText}
      setView={setView}
    />
  </SectionCard>
);

export default AddContactView;
