import React from "react";
import styled from "styled-components";
import LoadingIndicator from "../Main/LoadingIndicator";
import { PrivateKey } from "../Main/NcryptorApp";
import SectionCard from "../Main/SectionCard";
import GenerateKeyBtn from "./GenerateKeyBtn";
import NoKeysHeader from "./NoKeysHeader";
import PrivateKeysList from "./PrivateKeysList";
import RefreshKeysBtn from "./RefreshKeysBtn";

type KeyringViewProps = {
  privateKeys: PrivateKey[];
  refreshKeys: Function;
  selectKey: Function;
  setView: Function;
};

const BtnBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const renderContent = (
  loading: boolean,
  privateKeys: PrivateKey[],
  selectKey: Function
) => {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (privateKeys.length < 1) {
    return <NoKeysHeader isPrivate={true} />;
  }
  return <PrivateKeysList privateKeys={privateKeys} selectKey={selectKey} />;
};

const KeyringView = ({
  privateKeys,
  refreshKeys,
  selectKey,
  setView
}: KeyringViewProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const refreshHandler = () => {
    setLoading(true);
    refreshKeys(() => setLoading(false));
  };
  return (
    <section>
      <SectionCard>
        <BtnBar>
          <GenerateKeyBtn setView={setView} />
          <RefreshKeysBtn refreshKeys={refreshHandler} />
        </BtnBar>
        {renderContent(loading, privateKeys, selectKey)}
      </SectionCard>
    </section>
  );
};

export default KeyringView;
