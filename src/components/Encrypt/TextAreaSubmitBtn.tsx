import React from "react";
import styled from "styled-components";

type TextAreaSubmitBtnProps = {
  service: () => Promise<any>;
  label: string;
  setText: Function;
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

const TextAreaSubmitBtn = ({
  label,
  service,
  setText,
}: TextAreaSubmitBtnProps): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const clickFunc = async () =>
    service().then((result: string) => {
      setLoading(false);
      setText(result);
    });
  return (
    <Button onClick={() => clickFunc()}>{loading ? "Loading" : label}</Button>
  );
};

export default TextAreaSubmitBtn;
