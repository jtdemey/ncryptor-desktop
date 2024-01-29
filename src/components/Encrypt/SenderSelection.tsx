import { PrivateKey } from "../Main/NcryptorApp";
import UserDropdownSelection from "./UserDropdownSelection";

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
  return (
    <UserDropdownSelection
      currentSelection={currentUser}
      keys={privateKeys.filter((key: PrivateKey) => key.capabilities.includes("e"))}
      setSelection={setCurrentUser}
    />
  );
};

export default SenderSelection;
