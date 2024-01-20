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
      keys={privateKeys}
      setSelection={setCurrentUser}
    />
  );
};

export default SenderSelection;
