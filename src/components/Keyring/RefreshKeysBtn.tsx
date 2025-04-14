import { faRedo } from "@fortawesome/free-solid-svg-icons";
import Button from "../Main/Button";

type RefreshKeysBtnProps = {
  refreshKeys: Function;
};

const RefreshKeysBtn = ({ refreshKeys }: RefreshKeysBtnProps) => (
  <Button icon={faRedo} onClick={() => refreshKeys()} text="Refresh" />
);

export default RefreshKeysBtn;
