import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Main/Button";

type DeleteKeyBtnProps = {
  showModal: Function;
};

const DeleteKeyBtn = ({ showModal }: DeleteKeyBtnProps) => (
  <Button
    backgroundColor="hsl(354, 93%, 22%)"
    borderColor="hsl(354, 93%, 22%)"
    icon={faTrash}
    onClick={() => showModal()}
    style={{ maxWidth: "320px" }}
    text="Delete key"
  />
);

export default DeleteKeyBtn;
