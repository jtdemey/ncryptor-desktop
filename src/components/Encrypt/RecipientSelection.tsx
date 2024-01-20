import { PublicKey } from "../Main/NcryptorApp";
import UserDropdownSelection from "./UserDropdownSelection";

type RecipientSelectionProps = {
  publicKeys: PublicKey[];
  recipient: string;
  setRecipient: Function;
};

const RecipientSelection = ({
  publicKeys,
  recipient,
  setRecipient,
}: RecipientSelectionProps): JSX.Element => {
  return (
    <UserDropdownSelection
      currentSelection={recipient}
      keys={publicKeys}
      setSelection={setRecipient}
    />
  );
};

export default RecipientSelection;
