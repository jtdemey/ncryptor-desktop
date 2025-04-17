import { useState } from "react";
import styled from "styled-components";
import type { PrivateKey, PublicKey, UserId } from "../Main/NcryptorApp";
import BackBtn from "../Main/BackBtn";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import DeleteKeyBtn from "./DeleteKeyBtn";
import KeyDetailsGroup from "./KeyDetailsGroup";
import KeyHeader from "./KeyHeader";
import PublicKeyDetails from "./PublicKeyDetails";
import SectionCard from "../Main/SectionCard";
import { AppViews } from "../../data/AppViews";
import { displayKeyName } from "../../utils/StringFormatters";
import { deletePrivateKey } from "../../services/deletePrivateKey";
import { deletePublicKey } from "../../services/deletePublicKey";
import { PublicKeyAlgorithms } from "../../data/PublicKeyAlgorithms";

type KeyDetailsViewProps = {
  currentKey: PrivateKey;
  isKeyPrivate: boolean;
  refreshKeys: Function;
  setErrorText: Function;
  setView: Function;
};

const CAPABILITIES = {
  a: "authenticate",
  c: "certify",
  e: "encrypt",
  s: "sign",
};

const displayCapabilities = (capabilities: string): string => {
  if (!capabilities) return "";
  let result = "This key can: ";
  Object.keys(CAPABILITIES).forEach(capabilityKey => {
    if (capabilities.indexOf(capabilityKey) > -1) {
      result += `${CAPABILITIES[capabilityKey]}, `;
    }
  });
  return result.substring(0, result.length - 2);
};

const displayDate = (seconds: any): string => {
  if (typeof seconds !== "string") {
    return seconds;
  }

  const date = new Date(0, 0, 0, 0, 0, 0);
  date.setUTCFullYear(1969);
  date.setDate(date.getDate() + 1);
  date.setSeconds(parseInt(seconds));
  const dateStr = date.toDateString();
  return dateStr === "Invalid Date" ? "Never" : dateStr;
};

const Container = styled.section`
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
`;

const DetailsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0px 64px;
  transform: translateY(-1.5rem);
`;

interface UserIdDetailsProps {
  currentKey: PrivateKey | PublicKey;
  userId: UserId;
  i: number;
}

const UserIdDetails = ({ currentKey, userId, i }: UserIdDetailsProps) => (
  <>
    <KeyDetailsGroup
      color={currentKey.color}
      labelText="User ID"
      showCopyBtn={true}
      valueText={displayKeyName(currentKey, i)}
    />
    {userId.email && (
      <KeyDetailsGroup
        color={currentKey.color}
        labelText="Email"
        showCopyBtn={true}
        valueText={userId.email}
      />
    )}
    {userId.comment && (
      <KeyDetailsGroup
        color={currentKey.color}
        labelText="Comment"
        showCopyBtn={true}
        valueText={userId.comment}
      />
    )}
  </>
);

const KeyDetailsView = ({
  currentKey,
  isKeyPrivate,
  refreshKeys,
  setErrorText,
  setView,
}: KeyDetailsViewProps) => {
  const [showingModal, setShowingModal] = useState(false);
  return (
    <Container>
      <ConfirmDeleteModal
        onCancel={() => setShowingModal(false)}
        onConfirm={() => {
          const onComplete = () => {
            setShowingModal(false);
            setView(isKeyPrivate ? AppViews.Keyring : AppViews.Contacts);
            refreshKeys();
          };
          const service = isKeyPrivate ? deletePrivateKey : deletePublicKey;
          service(currentKey.fingerprint)
            .then(() => onComplete())
            .catch(err => setErrorText(err));
        }}
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
          {currentKey.userIds.map((userId, i) => (
            <UserIdDetails currentKey={currentKey} userId={userId} i={i} />
          ))}
        </DetailsContainer>
        {!isKeyPrivate && (
          <PublicKeyDetails
            currentKey={currentKey}
            setErrorText={setErrorText}
          />
        )}
        <DetailsContainer>
          <KeyDetailsGroup
            animationDelay={0.05}
            labelText="Capabilities"
            valueText={displayCapabilities(currentKey.capabilities)}
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
              currentKey.fingerprint.length - 16,
              currentKey.fingerprint.length,
            )}
          />
          <KeyDetailsGroup
            animationDelay={0.3}
            labelText="Created date"
            valueText={displayDate(currentKey.createdDate)}
          />
          <KeyDetailsGroup
            animationDelay={0.4}
            labelText="Expiration date"
            valueText={displayDate(currentKey.expirationDate) ?? "Never"}
          />
          <KeyDetailsGroup
            animationDelay={0.5}
            labelText="Key type"
            valueText={currentKey.keyType}
          />
          <KeyDetailsGroup
            animationDelay={0.5}
            labelText="Algorithm"
            valueText={
              PublicKeyAlgorithms[currentKey.publicKeyAlgorithm] ?? "Unknown"
            }
          />
        </DetailsContainer>
        <DeleteKeyBtn showModal={() => setShowingModal(true)} />
      </SectionCard>
    </Container>
  );
};

export default KeyDetailsView;
