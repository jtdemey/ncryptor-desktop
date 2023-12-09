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
  const userIds: [string, string][] = publicKeys.map((key: PublicKey) => [
    key.fingerprint.substring(
      key.fingerprint.length - 8,
      key.fingerprint.length
    ),
    key.userId
  ]);
  const [dropdownSelections, setDropdownSelections] = React.useState(userIds);
  React.useEffect(() => setDropdownSelections(userIds), [publicKeys]);
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
