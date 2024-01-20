import React from "react";
import Dropdown from "../Form/Dropdown";
import { PublicKey } from "../Main/NcryptorApp";

type RecipientSelectionProps = {
  publicKeys: PublicKey[];
  recipient: string;
  setRecipient: Function;
};

const RecipientSelection = ({
  recipient,
  publicKeys,
  setRecipient
}: RecipientSelectionProps): JSX.Element => {
  const displayNames: [string, string][] = publicKeys.map((key: PublicKey) => [
    key.fingerprint.substring(
      key.fingerprint.length - 8,
      key.fingerprint.length
    ),
    key.userIds[0].name
  ]);
  const [dropdownSelections, setDropdownSelections] = React.useState(displayNames);
  React.useEffect(() => setDropdownSelections(displayNames), [publicKeys]);
  return (
    <Dropdown
      selections={dropdownSelections}
      label=""
      setValue={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setRecipient(e.toString())
      }
      subLabel=""
      selectedValue={recipient}
    />
  );
};

export default RecipientSelection;
