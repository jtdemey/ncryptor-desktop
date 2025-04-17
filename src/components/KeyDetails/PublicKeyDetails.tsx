import styled from "styled-components";
import type { PrivateKey } from "../Main/NcryptorApp";
import useCommandResult from "../../hooks/useCommandResult";
import { printPublicKey } from "../../services/printPublicKey";
import CopyPublicKeyBtn from "./CopyPublicKeyBtn";
import ViewPublicKeyBtn from "./ViewPublicKeyBtn";

type PublicKeyDetailsProps = {
  currentKey: PrivateKey;
  setErrorText: Function;
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(212px, 1fr));
  gap: 16px;
  margin: -24px 0px 32px;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.25rem;
`;

const PublicKeyDetails = ({
  currentKey,
  setErrorText,
}: PublicKeyDetailsProps) => {
  const currentUser = currentKey.userIds[0];
  const [publicKey, _] = useCommandResult(
    () => printPublicKey(currentUser?.email ?? currentUser?.name ?? ""),
    (e?) => setErrorText(e !== undefined ? e.toString() : "Unknown error"),
  );
  return (
    <Container>
      <CopyPublicKeyBtn keyText={publicKey} />
      <ViewPublicKeyBtn keyText={publicKey} />
    </Container>
  );
};

export default PublicKeyDetails;
