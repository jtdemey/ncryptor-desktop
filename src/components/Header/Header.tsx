import React from "react";
import styled from 'styled-components';

const Banner = styled.div`
	width: 100%;
`;

const Text = styled.h1`
	height: 2rem;
	margin: 0.75rem;
	padding-left: 1.25rem;
	color: #CAD2C5;
	font-family: 'Lato', sans-serif;
	font-size: 1.25rem;
	letter-spacing: 0.5rem;
`;

const Header = (): JSX.Element => (
	<Banner>
		<Text>NCRYPTOR</Text>
	</Banner>
);

export default Header;