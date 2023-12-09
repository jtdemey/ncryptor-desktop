import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type ConfirmModalProps = {
  cancelFunction: Function;
  confirmFunction: Function;
  fingerprint: string;
  isKeyPrivate: boolean;
  isVisible: boolean;
};

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  text-align: center;
  z-index: 99;
`;

const Modal = styled.article`
  width: 80vw;
  height: 60vh;
  margin: auto;
  padding: 0.5rem;
  background: hsl(201, 21%, 10%);
  box-shadow: -5px 5px 0.5rem rgba(0, 0, 0, 0.65);
  color: #cad2c5;
  font-family: "Lato", sans-serif;
  font-size: 1.1rem;
`;

const Prompt = styled.div`
  margin-top: 50%;
`;

const BtnArea = styled.div`
  margin-top: 2rem;
`;

const Btn = styled.span`
  margin: 1rem 1.5rem;
  padding: 0.25rem 0.75rem;
  background: blue;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.65);
  cursor: pointer;
  font-size: 1.5rem;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const ConfirmModal = ({
  cancelFunction,
  confirmFunction,
  fingerprint,
  isKeyPrivate,
  isVisible
}: ConfirmModalProps): JSX.Element => (
  <Container
    animate={{ opacity: isVisible ? 1 : 0 }}
    transition={{ duration: 0.15, ease: "easeIn" }}
    style={{ display: isVisible ? "flex" : "none" }}
  >
    <Modal>
      <Prompt>
        <span>
          Confirm your intent to PERMANENTLY DELETE the {isKeyPrivate ? "private" : "public"} key{" "}
          {fingerprint.substring(fingerprint.length - 8, fingerprint.length)}:
        </span>
      </Prompt>
      <br />
      <BtnArea>
        <Btn
          onClick={() => confirmFunction()}
          style={{ background: "hsl(165, 19%, 30%)" }}
        >
          Confirm
        </Btn>
        <Btn
          onClick={() => cancelFunction()}
          style={{ background: "hsl(201, 21%, 20%)" }}
        >
          Cancel
        </Btn>
      </BtnArea>
    </Modal>
  </Container>
);

export default ConfirmModal;
