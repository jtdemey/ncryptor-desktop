import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AppViews } from "../../data/AppViews";
import Button from "../Main/Button";

type AddContactBtnProps = {
  setView: Function;
};

const AddContactBtn = ({ setView }: AddContactBtnProps) => (
  <Button
    icon={faPlus}
    onClick={() => setView(AppViews.CreateContact)}
    text="New"
  />
);

export default AddContactBtn;
