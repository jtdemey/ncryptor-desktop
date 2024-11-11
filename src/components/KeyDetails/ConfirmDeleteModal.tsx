import React from "react";
import Modal from "../Main/Modal";

type ConfirmDeleteModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
  fingerprint: string;
  isKeyPrivate: boolean;
  isVisible: boolean;
};

const ConfirmDeleteModal = ({
  onCancel,
  onConfirm,
  fingerprint,
  isKeyPrivate,
  isVisible
}: ConfirmDeleteModalProps) => (
  <Modal onCancel={onCancel} onConfirm={onConfirm} isVisible={isVisible}>
    <span>
      Confirm your intent to PERMANENTLY DELETE the {isKeyPrivate ? "private" : "public"} key{" "}
      {fingerprint.substring(fingerprint.length - 8, fingerprint.length)}:
    </span>
  </Modal>
);

export default ConfirmDeleteModal;
