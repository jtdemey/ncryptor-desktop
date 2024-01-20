import React from "react";
import Dropdown from "../Form/Dropdown";
import { PrivateKey } from "../Main/NcryptorApp";

type SenderSelectionProps = {
  currentUser: string;
  privateKeys: PrivateKey[];
  setCurrentUser: Function;
};

const SenderSelection = ({
  currentUser,
  privateKeys,
  setCurrentUser,
}: SenderSelectionProps): JSX.Element => {
  const displayNames: [string, string][] = privateKeys.map((key: PrivateKey) => [
    key.fingerprint.substring(
      key.fingerprint.length - 8,
      key.fingerprint.length,
    ),
    key.userIds[0].name,
  ]);
  const [dropdownSelections, setDropdownSelections] = React.useState(displayNames);
  React.useEffect(() => setDropdownSelections(displayNames), [privateKeys]);
  return (
    <Dropdown
      selections={dropdownSelections}
      label=""
      setValue={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setCurrentUser(e.toString())
      }
      subLabel=""
      selectedValue={currentUser}
    />
  );
};

export default SenderSelection;
