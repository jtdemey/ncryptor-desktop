import React from "react";
import styled from "styled-components";
import { AppViews } from "../../data/AppViews";
import {
  selectKey,
  setCurrentUser,
  setErrorText,
  setPrivateKeys,
  setPublicKeys,
  setView
} from "../../state/Actions";
import { initialState, reducer } from "../../state/Reducer";
import {
  KeysResponse,
  parsePrivateKeysResponse,
  parsePublicKeysResponse
} from "../../utils/ResponseParsers";
import ErrorNotification from "../Error/ErrorNotification";
import Header from "../Header/Header";
import NavBar from "../Nav/NavBar";
import InfoBtn from "../Nav/InfoBtn";
import ViewRouter from "./ViewRouter";
import { executeFetch } from "../../client/ApiClient";

/*
{"Ash Gray":"cad2c5","Dark Sea Green":"84a98c","Hookers Green":"52796f","Dark Slate Gray":"354f52","Charcoal":"2f3e46"}
*/

export type PrivateKey = {
  color: string;
  createdDate: string;
  expirationDate?: string;
  fingerprint: string;
  keyType: string;
  userId: string;
};

export type PublicKey = {
  color: string;
  createdDate: string;
  expirationDate?: string;
  fingerprint: string;
  keyType: string;
  revocationFile: string | undefined;
  userId: string;
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

const NcryptorApp = (): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatchSetError = (message: string) => dispatch(setErrorText(message));
  const dispatchSetView = (view: AppViews) => dispatch(setView(view));
  const refreshPrivateKeys = (cb?: Function): void => {
    executeFetch("getprivatekeys")
      .then((response: Response) => response.json())
      .then((result: KeysResponse) => {
        const parsedKeys = parsePrivateKeysResponse(
          result,
          dispatchSetError
        ).keys;
        dispatch(setPrivateKeys(parsedKeys));
        dispatch(setCurrentUser(parsedKeys[0].userId));
        cb && cb();
      });
  };
  React.useEffect(() => refreshPrivateKeys(), []);
  const refreshContacts = (cb?: Function): void => {
    executeFetch("getpublickeys")
      .then((response: Response) => response.json())
      .then((result: KeysResponse) => {
        dispatch(
          setPublicKeys(parsePublicKeysResponse(result, dispatchSetError).keys)
        );
        cb && cb();
      });
  };
  React.useEffect(() => refreshContacts(), []);
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
        refreshContacts={refreshContacts}
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
