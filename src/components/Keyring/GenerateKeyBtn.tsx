import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AppViews } from "../../data/AppViews";
import Button from "../Main/Button";

type GenerateKeyBtnProps = {
  setView: Function;
};

const GenerateKeyBtn = ({ setView }: GenerateKeyBtnProps) => (
  <Button
    icon={faPlus}
    onClick={() => setView(AppViews.GenerateKey)}
    text="Generate"
  />
);

export default GenerateKeyBtn;
