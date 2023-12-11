import React from "react";
import styled from 'styled-components';
import { getGpgVersion } from "../../services/getGpgVersion";

const Banner = styled.div`
	width: 100%;
	font-family: 'Lato', sans-serif;
	font-size: 1.25rem;
	color: #CAD2C5;
`;

const Title = styled.h1`
	height: 1rem;
	margin: 0.75rem;
	padding-left: 1.25rem;
	letter-spacing: 0.5rem;
`;

const Header = (): JSX.Element => {
  const [headerText, setHeaderText] = React.useState<string>("");
  React.useEffect(() => {
    let ignore = false;
    getGpgVersion().then((version: string) => {
      if (!ignore) {
        setHeaderText(`using gpg v${version}`);
      }
    }).catch(() => {
      setHeaderText("gpg error!");
    });
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <Banner>
      <Title>NCRYPTOR</Title>
      <h4>{headerText}</h4>
    </Banner>
  );
};

export default Header;
