import React from "react";
import { Button } from "../Generate/GenerateKeySubmitBtn";
import { executeFetch } from "../../client/ApiClient";
import { handleGpgError } from "../../client/ErrorHandlers";
import { AppViews } from "../../data/AppViews";

type AddContactSubmitBtnProps = {
  publicKey: string;
  refreshContacts: Function;
  setErrorText: Function;
  setPublicKeyText: Function;
  setView: Function;
};

const AddContactSubmitBtn = ({
  publicKey,
  refreshContacts,
  setErrorText,
  setPublicKeyText,
  setView
}: AddContactSubmitBtnProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const clickFunc = () => {
    setLoading(true);
    executeFetch("importkey", { publicKey })
      .then((response: Response) => response.json())
      .then((result: any) => {
        setLoading(false);
        if (result.status >= 400) {
          setPublicKeyText(result.text);
        }
        if (handleGpgError(result, setErrorText)) {
          setView(AppViews.Contacts);
          refreshContacts();
        }
      });
  };
  return <Button onClick={() => clickFunc()}>{loading ? "..." : "Add"}</Button>;
};

export default AddContactSubmitBtn;
