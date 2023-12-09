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
  setCurrentUser
}: SenderSelectionProps): JSX.Element => {
  const userIds: [string, string][] = privateKeys.map((key: PrivateKey) => [
    key.fingerprint.substring(
      key.fingerprint.length - 8,
      key.fingerprint.length
    ),
    key.userId
  ]);
  const [dropdownSelections, setDropdownSelections] = React.useState(userIds);
  React.useEffect(() => setDropdownSelections(userIds), [privateKeys]);
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
