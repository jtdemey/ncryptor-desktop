import React from "react";
import styled from "styled-components";
import { AppViews } from "../../data/AppViews";
import {
  selectKey,
  setCurrentUser,
  setErrorText,
  setPrivateKeys,
  setPublicKeys,
  setView,
} from "../../state/Actions";
import { initialState, reducer } from "../../state/Reducer";
import ErrorNotification from "../Error/ErrorNotification";
import Header from "../Header/Header";
import NavBar from "../Nav/NavBar";
import InfoBtn from "../Nav/InfoBtn";
import ViewRouter from "./ViewRouter";
import useCommandResult from "../../hooks/useCommandResult";
import {
  GetPrivateKeysResponse,
  getPrivateKeys,
} from "../../services/getPrivateKeys";
import {
  GetPublicKeysResponse,
  getPublicKeys,
} from "../../services/getPublicKeys";
import { displayKeyName } from "../../utils/StringFormatters";

/*
{"Ash Gray":"cad2c5","Dark Sea Green":"84a98c","Hookers Green":"52796f","Dark Slate Gray":"354f52","Charcoal":"2f3e46"}
*/

export type UserId = {
  comment?: string;
  email?: string;
  name: string;
};

export type PrivateKey = {
  bitLength: number;
  capabilities: string;
  color: string;
  createdDate: string;
  expirationDate?: string;
  fingerprint: string;
  isDisabled: boolean;
  keyType: string;
  parentKeyFingerprint?: string;
  publicKeyAlgorithm: string;
  userIds: UserId[];
  validity: string;
};

export type PublicKey = PrivateKey & {
  revocationFile: string | undefined;
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 3.5rem 1fr 106px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at 65% 35%,
    rgba(73, 107, 111, 1) 0%,
    rgba(53, 79, 82, 1) 45%,
    rgba(47, 62, 70, 1) 100%
  );
`;

const NcryptorApp = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatchSetError = (message: string) => dispatch(setErrorText(message));
  const dispatchSetView = (view: AppViews) => dispatch(setView(view));

  const [_, refreshPrivateKeys] = useCommandResult(
    getPrivateKeys,
    (e?) => dispatchSetError(e !== undefined ? e.toString() : "Unknown error"),
    (result: GetPrivateKeysResponse) => {
      dispatch(setPrivateKeys(result.keys));
      dispatch(setCurrentUser(displayKeyName(result.keys[0])));
    },
  );
  const [__, refreshPublicKeys] = useCommandResult(
    getPublicKeys,
    (e?) => dispatchSetError(e !== undefined ? e.toString() : "Unknown error"),
    (result: GetPublicKeysResponse) => {
      dispatch(setPublicKeys(result.keys));
    },
  );

  const viewRef = React.useRef<HTMLDivElement>(null);
  const setViewAndResetScroll = (view: AppViews) => {
    viewRef?.current?.scrollTo({ top: 0 });
    dispatchSetView(view);
  };

  return (
    <Container>
      <Header />
      <InfoBtn setView={setViewAndResetScroll} />
      <ErrorNotification
        setErrorText={dispatchSetError}
        text={state.errorText}
      />
      <ViewRouter
        currentUser={state.currentUser}
        isKeyPrivate={state.isKeyPrivate}
        privateKeys={state.privateKeys}
        publicKeys={state.publicKeys}
        refreshContacts={refreshPublicKeys}
        refreshKeys={refreshPrivateKeys}
        selectKey={(fingerprint: string, isPrivate: boolean) => {
          dispatch(selectKey(fingerprint, isPrivate));
          setViewAndResetScroll(AppViews.KeyDetails);
        }}
        selectedKey={state.selectedKey}
        setCurrentUser={(userId: string) => dispatch(setCurrentUser(userId))}
        setErrorText={dispatchSetError}
        setView={setViewAndResetScroll}
        view={state.view}
        viewRef={viewRef}
      />
      <NavBar view={state.view} setView={setViewAndResetScroll} />
    </Container>
  );
};

export default NcryptorApp;
