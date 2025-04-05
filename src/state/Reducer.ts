import { PrivateKey, PublicKey } from "../components/Main/NcryptorApp";
import { AppViews } from "../data/AppViews";
import { ActionNames } from "./Actions";

export type AppAction = {
  type: string;
  payload: any;
};

type AppState = {
  currentUser: string;
  isKeyPrivate: boolean;
  errorText: string;
  privateKeys: PrivateKey[];
  publicKeys: PublicKey[];
  selectedKey: string;
  view: AppViews;
};

export const initialState: AppState = {
  currentUser: "",
  errorText: "",
  isKeyPrivate: false,
  privateKeys: [],
  publicKeys: [],
  selectedKey: "",
  view: AppViews.Encrypt
};

export const reducer = (
  state: AppState,
  { type, payload }: AppAction
): AppState => {
  switch (type) {
    case ActionNames.SelectKey:
      return {
        ...state,
        isKeyPrivate: payload.isKeyPrivate,
        selectedKey: payload.fingerprint
      };
    case ActionNames.SetCurrentUser:
      return { ...state, currentUser: payload };
    case ActionNames.SetErrorText:
      return { ...state, errorText: payload };
    case ActionNames.SetPrivateKeys:
      return { ...state, privateKeys: payload };
    case ActionNames.SetPublicKeys:
      return { ...state, publicKeys: payload };
    case ActionNames.SetView:
      return { ...state, view: payload };
    default:
      console.error(`Unrecognized action type ${type}`);
      return state;
  }
};
