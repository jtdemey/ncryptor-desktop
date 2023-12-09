import React from "react";
import BackBtn from "../Main/BackBtn";
import AddContactSubmitBtn from "./AddContactSubmitBtn";
import PublicKeyInput from "./PublicKeyInput";
import FileInput from "../Encrypt/FileInput";
import { Container, Header, BtnBar } from "../Generate/GenerateKeyForm";
import { AppViews } from "../../data/AppViews";

type AddContactFormProps = {
  refreshContacts: Function;
  setErrorText: Function;
  setView: Function;
};

const AddContactForm = ({
  refreshContacts,
  setErrorText,
  setView
}: AddContactFormProps): JSX.Element => {
  const [publicKeyText, setPublicKeyText] = React.useState("");
  return (
    <Container>
      <BackBtn clickFunc={() => setView(AppViews.Contacts)} />
      <Header>Add a contact's public key</Header>
      <PublicKeyInput setText={setPublicKeyText} text={publicKeyText} />
      <BtnBar>
        <FileInput setText={setPublicKeyText} />
        <AddContactSubmitBtn
          publicKey={publicKeyText}
          refreshContacts={refreshContacts}
          setErrorText={setErrorText}
          setPublicKeyText={setPublicKeyText}
          setView={setView}
        />
      </BtnBar>
    </Container>
  );
};

export default AddContactForm;
