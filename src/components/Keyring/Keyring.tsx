import React from "react";
import styled from "styled-components";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrivateKey } from "../Main/NcryptorApp";

type KeyringProps = {
  privateKeys: PrivateKey[];
};

const Container = styled.article`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  padding: 0.25rem;
`;

const Ring = styled.div`
  width: 6rem;
  height: 3rem;
  margin-bottom: 2.5rem;
  border: 0.5rem solid #222;
  border-radius: 0 0 6rem 6rem;
  transform: translateY(-1rem);
  z-index: -1;
`;

const KeyContainer = styled.div`
  position: absolute;
`;

const getKeyAngle = (keyIndex: number, keyCount: number, subtractHalfRotation: boolean): string => {
	const angle = 45 / keyCount;
	return `${angle * (keyIndex + 1) - (subtractHalfRotation ? 45 : 0)}deg`;
};

const Keyring = ({ privateKeys }: KeyringProps): JSX.Element => {
  return (
    <Container>
      <Ring />
      {privateKeys.map((privateKey: PrivateKey, i: number) => {
        return (
          <KeyContainer style={{ top: `0rem` }}>
            <FontAwesomeIcon
              icon={faKey}
              color={privateKey.color}
              style={{
                transform: `rotate(${getKeyAngle(i, privateKeys.length, true)})
									translateY(2.5rem)
									rotate(-${getKeyAngle(i, privateKeys.length, false)})`,
              }}
              width="3.5rem"
            />
          </KeyContainer>
        );
      })}
    </Container>
  );
};

export default Keyring;
