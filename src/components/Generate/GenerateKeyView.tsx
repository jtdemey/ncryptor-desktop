import React from "react";
import SectionCard from "../Main/SectionCard";
import GenerateKeyForm from "./GenerateKeyForm";

type GenerateKeyViewProps = {
  refreshKeys: Function;
  setErrorText: Function;
  setView: Function;
};

const GenerateKeyView = ({
  refreshKeys,
  setErrorText,
  setView
}: GenerateKeyViewProps): JSX.Element => (
  <SectionCard>
    <GenerateKeyForm
      refreshKeys={refreshKeys}
      setErrorText={setErrorText}
      setView={setView}
    />
  </SectionCard>
);

export default GenerateKeyView;
