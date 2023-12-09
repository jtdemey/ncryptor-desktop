import React from "react";
import styled from "styled-components";
import DecryptView from "../Decrypt/DecryptView";
import EncryptView from "../Encrypt/EncryptView";
import SettingsView from "../Settings/SettingsView";
import KeyringView from "../Keyring/KeyringView";
import GenerateKeyView from "../Generate/GenerateKeyView";
import ContactsView from "../Contacts/ContactsView";
import KeyDetailsView from "../KeyDetails/KeyDetailsView";
import AddContactView from "../AddContact/AddContactView";
import InfoView from "../Info/InfoView";
import { AppViews } from "../../data/AppViews";
import { PrivateKey, PublicKey } from "./NcryptorApp";

type ViewRouterProps = {
  currentUser: string;
  isKeyPrivate: boolean;
  privateKeys: PrivateKey[];
  publicKeys: PublicKey[];
  refreshContacts: Function;
  refreshKeys: Function;
  selectKey: Function;
  selectedKey: string;
  setCurrentUser: Function;
  setErrorText: Function;
  setView: Function;
  view: AppViews;
  viewRef: React.RefObject<HTMLDivElement>;
};

const View = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-color: #777 #444;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    display: none;
    background: #777;
  }

  ::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const getView = ({
  currentUser,
  isKeyPrivate,
  privateKeys,
  publicKeys,
  refreshContacts,
  refreshKeys,
  selectKey,
  selectedKey,
  setCurrentUser,
  setErrorText,
  setView,
  view
}: any) => {
  switch (view) {
    case AppViews.Encrypt:
      return (
        <EncryptView
          currentUser={currentUser}
          privateKeys={privateKeys}
          publicKeys={publicKeys}
          setCurrentUser={setCurrentUser}
        />
      );
    case AppViews.Decrypt:
      return (
        <DecryptView
          currentUser={currentUser}
          privateKeys={privateKeys}
          setCurrentUser={setCurrentUser}
        />
      );
    case AppViews.Keyring:
      return (
        <KeyringView
          privateKeys={privateKeys}
          refreshKeys={refreshKeys}
          selectKey={selectKey}
          setView={setView}
        />
      );
    case AppViews.GenerateKey:
      return (
        <GenerateKeyView
          refreshKeys={() => {
            refreshKeys();
            refreshContacts();
          }}
          setErrorText={setErrorText}
          setView={setView}
        />
      );
    case AppViews.KeyDetails:
      const currentKey = isKeyPrivate
        ? privateKeys.filter(
            (k: PrivateKey) => k.fingerprint === selectedKey
          )[0]
        : publicKeys.filter((k: PublicKey) => k.fingerprint === selectedKey)[0];
      return (
        <KeyDetailsView
          currentKey={currentKey}
          isKeyPrivate={isKeyPrivate}
          refreshKeys={isKeyPrivate ? refreshKeys : refreshContacts}
          setErrorText={setErrorText}
          setView={setView}
        />
      );
    case AppViews.Contacts:
      return (
        <ContactsView
          publicKeys={publicKeys}
          refreshContacts={refreshContacts}
          selectKey={selectKey}
          setView={setView}
        />
      );
    case AppViews.CreateContact:
      return (
        <AddContactView
          refreshContacts={refreshContacts}
          setErrorText={setErrorText}
          setView={setView}
        />
      );
    case AppViews.Settings:
      return <SettingsView />;
    case AppViews.Info:
      return <InfoView />;
    default:
      return null;
  }
};

const ViewRouter = ({
  currentUser,
  isKeyPrivate,
  privateKeys,
  publicKeys,
  refreshContacts,
  refreshKeys,
  selectKey,
  selectedKey,
  setCurrentUser,
  setErrorText,
  setView,
  view,
  viewRef
}: ViewRouterProps): JSX.Element => {
  return (
    <View ref={viewRef}>
      {getView({
        currentUser,
        isKeyPrivate,
        privateKeys,
        publicKeys,
        refreshContacts,
        refreshKeys,
        selectKey,
        selectedKey,
        setCurrentUser,
        setErrorText,
        setView,
        view
      })}
    </View>
  );
};

export default ViewRouter;
