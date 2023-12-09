import React from "react";
import styled from "styled-components";
import { executeFetch } from "../../client/ApiClient";

export type SubmitBtnProps = {
  currentUser: string;
  endpoint: string;
  label: string;
  recipient?: string;
  setText: Function;
  text: string;
};

const Button = styled.div`
  margin: 1rem 0 auto auto;
  padding: 0.5rem 1rem;
  background: #52796f;
  border: 1px solid #52796f;
  box-shadow: -3px 3px 8px #222;
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const SubmitBtn = ({
  currentUser,
  endpoint,
  label,
  recipient,
  setText,
  text
}: SubmitBtnProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const clickFunc = () => {
    setLoading(true);
    executeFetch(endpoint, { recipient, text, userId: currentUser })
      .then((response: Response) => response.json())
      .then(result => {
        setLoading(false);
        setText(result.text);
      });
  };
  return (
    <Button onClick={() => clickFunc()}>{loading ? "Loading" : label}</Button>
  );
};

export default SubmitBtn;
