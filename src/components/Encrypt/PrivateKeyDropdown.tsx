import React from "react";
import styled from 'styled-components';
import Dropdown from "../Form/Dropdown";
import { PrivateKey } from "../Main/NcryptorApp";

type PrivateKeyDropdownProps = {
	currentUser: string;
	privateKeys: PrivateKey[];
	setCurrentUser: Function;
};

const Container = styled.div`
	margin: 1rem auto 0 0;
`;

const PrivateKeyDropdown = ({ currentUser, privateKeys, setCurrentUser }: PrivateKeyDropdownProps): JSX.Element => {
	const userIds: [string, string][] = privateKeys.map((key: PrivateKey) => [key.fingerprint, key.userId]);
  const [dropdownSelections, setDropdownSelections] = React.useState(userIds);
	React.useEffect(() => setDropdownSelections(userIds), [privateKeys]);
	return (
		<Container>
			<Dropdown
				selections={dropdownSelections}
				label=""
				setValue={(e: React.ChangeEvent<HTMLSelectElement>) => {
					setCurrentUser(e.toString());
				}}
				subLabel=""
				selectedValue={currentUser}
			/>
		</Container>
	);
};

export default PrivateKeyDropdown;