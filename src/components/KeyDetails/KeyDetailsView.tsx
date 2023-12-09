import React from "react";
import styled from "styled-components";
import BackBtn from "../Main/BackBtn";
import SectionCard from "../Main/SectionCard";
import KeyDetailsGroup from "./KeyDetailsGroup";
import KeyHeader from "./KeyHeader";
import DeleteKeyBtn from "./DeleteKeyBtn";
import { AppViews } from "../../data/AppViews";
import { PrivateKey } from "../Main/NcryptorApp";
import ConfirmModal from "./ConfirmModal";
import { executeFetch } from "../../client/ApiClient";
import { handleGpgError } from "../../client/ErrorHandlers";

type KeyDetailsViewProps = {
  currentKey: PrivateKey;
  isKeyPrivate: boolean;
  refreshKeys: Function;
  setErrorText: Function;
  setView: Function;
};

const Container = styled.section`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
`;

const DetailsContainer = styled.section`
  transform: translateY(-1.5rem);
`;

const KeyDetailsView = ({
  currentKey,
  isKeyPrivate,
  refreshKeys,
  setErrorText,
  setView
}: KeyDetailsViewProps): JSX.Element => {
  const [showingModal, setShowingModal] = React.useState(false);
  return (
    <Container>
      <ConfirmModal
        cancelFunction={() => setShowingModal(false)}
        confirmFunction={() =>
          executeFetch(
            isKeyPrivate ? "deleteprivatekeys" : "deletepublickeys",
            {
              fingerprint: currentKey.fingerprint
            }
          )
            .then((response: Response) => response.json())
            .then((response: any) => {
              setShowingModal(false);
              if (handleGpgError(response, setErrorText)) {
                setView(isKeyPrivate ? AppViews.Keyring : AppViews.Contacts);
                refreshKeys();
              }
            })
        }
        fingerprint={currentKey.fingerprint}
        isKeyPrivate={isKeyPrivate}
        isVisible={showingModal}
      />
      <SectionCard>
        <BackBtn
          clickFunc={() =>
            setView(isKeyPrivate ? AppViews.Keyring : AppViews.Contacts)
          }
        />
        <KeyHeader
          color={currentKey.color}
          fingerprint={currentKey.fingerprint}
          isKeyPrivate={isKeyPrivate}
        />
        <DetailsContainer>
          <KeyDetailsGroup
            color={currentKey.color}
            labelText="User ID"
            showCopyBtn={true}
            valueText={currentKey.userId}
          />
          <KeyDetailsGroup
            animationDelay={0.1}
            color={currentKey.color}
            labelText="Fingerprint"
            showCopyBtn={true}
            valueText={currentKey.fingerprint}
          />
          <KeyDetailsGroup
            animationDelay={0.2}
            color={currentKey.color}
            labelText="Abridged fingerprint"
            showCopyBtn={true}
            valueText={currentKey.fingerprint.substring(
              currentKey.fingerprint.length - 8,
              currentKey.fingerprint.length
            )}
          />
          <KeyDetailsGroup
            animationDelay={0.3}
            labelText="Created Date"
            valueText={currentKey.createdDate}
          />
          <KeyDetailsGroup
            animationDelay={0.4}
            labelText="Expiration Date"
            valueText={currentKey.expirationDate ?? "Never"}
          />
          <KeyDetailsGroup
            animationDelay={0.5}
            labelText="Key Type"
            valueText={currentKey.keyType}
          />
          <DeleteKeyBtn showModal={() => setShowingModal(true)} />
        </DetailsContainer>
      </SectionCard>
    </Container>
  );
};

export default KeyDetailsView;
