import React from "react";
import Dropdown from "../Form/Dropdown";
import { PrivateKey, PublicKey } from "../Main/NcryptorApp";
import { displayKeyName } from "../../utils/StringFormatters";

type UserDropdownSelectionProps = {
  currentSelection: string;
  keys: PrivateKey[] | PublicKey[];
  setSelection: Function;
};

const UserDropdownSelection = ({
  currentSelection,
  keys,
  setSelection,
}: UserDropdownSelectionProps) => {
  const displayNames: string[][] = keys.map(
    (key: PrivateKey | PublicKey) => [
      key.fingerprint.substring(
        key.fingerprint.length - 8,
        key.fingerprint.length,
      ),
      displayKeyName(key),
    ],
  );
  const [dropdownSelections, setDropdownSelections] =
    React.useState(displayNames);
  React.useEffect(() => setDropdownSelections(displayNames), [keys]);
  return (
    <Dropdown
      selections={dropdownSelections}
      label=""
      setValue={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setSelection(e.toString())
      }
      subLabel=""
      selectedValue={currentSelection}
    />
  );
};

export default UserDropdownSelection;
