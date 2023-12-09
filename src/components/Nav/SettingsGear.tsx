import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { AppViews } from "../../data/AppViews";

type SettingsGearProps = {
  setView: Function;
};

const Container = styled.div`
  position: absolute;
  top: 0.65rem;
  right: 1rem;
  font-size: 1.25rem;
`;

const SettingsGear = ({ setView }: SettingsGearProps): JSX.Element => (
  <Container onClick={() => setView(AppViews.Settings)}>
    <FontAwesomeIcon
      icon={faCog}
      color="#84A98C"
      size="lg"
      title="Settings"
      width="32px"
    />
  </Container>
);

export default SettingsGear;
