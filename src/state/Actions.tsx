import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";
import { AppViews } from "../data/AppViews";
import { AppAction } from "./Reducer";

export const ActionNames = {
  SelectKey: "selectKey",
  SetCurrentUser: "setCurrentUser",
  SetErrorText: "setErrorText",
  SetPrivateKeys: "setPrivateKeys",
  SetPublicKeys: "setPublicKeys",
  SetView: "setView"
};

export const selectKey = (
  fingerprint: string,
  isPrivate: boolean
): AppAction => ({
  type: ActionNames.SelectKey,
  payload: {
    fingerprint,
    isKeyPrivate: isPrivate
  }
});

export const setCurrentUser = (userId: string): AppAction => ({
  type: ActionNames.SetCurrentUser,
  payload: userId
});

export const setErrorText = (text: string): AppAction => ({
  type: ActionNames.SetErrorText,
  payload: text 
});

export const setPrivateKeys = (keys: PrivateKey[]): AppAction => ({
  type: ActionNames.SetPrivateKeys,
  payload: keys
});

export const setPublicKeys = (keys: PublicKey[]): AppAction => ({
  type: ActionNames.SetPublicKeys,
  payload: keys
});

export const setView = (view: AppViews): AppAction => ({
  type: ActionNames.SetView,
  payload: view
});
