// @ts-ignore
import { motion } from "framer-motion";
import styled from "styled-components";
import { PrivateKey } from "./../Main/NcryptorApp";
import KeysList from "../Main/KeysList";

type PrivateKeysListProps = {
  privateKeys: Array<PrivateKey>;
  selectKey: Function;
};

export const List = styled.ul`
  margin: 0.5rem auto;
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled(motion.li)`
  margin: 0.12rem 0;
  padding: 0.5rem;
  background: hsl(201, 20%, 20%);
  box-shadow: 4px 4px 0px #111;
  color: #cad2c5;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  opacity: 0;
`;

export const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  text-shadow: -2px 2px 1px #111;
`;

export const UserIdLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 6px;
  font-family: "Lora", serif;
`;

export const KeyThumbprint = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 6px;
  font-family: "Lato", sans-serif;
`;

export const KeyTypeLabel = styled.div`
  margin: 0.25rem 0 0.25rem 1rem;
  padding: 6px;
  color: #c2cfd6;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const PrivateKeysList = ({ privateKeys, selectKey }: PrivateKeysListProps) => (
  <KeysList fillBackground isPrivate keys={privateKeys} selectKey={selectKey} />
);

export default PrivateKeysList;
