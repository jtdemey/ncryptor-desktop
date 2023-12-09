import React from "react";
import styled from "styled-components";
import NavBtn, { NavBtnProps } from "./NavBtn";
import {
  faEnvelope,
  faEnvelopeOpen,
  faKey,
  faUserFriends,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { AppViews } from "../../data/AppViews";

type NavBarProps = {
  view: AppViews;
	setView: Function 
};

const genNavBtnProps = (
  id: number,
  svgSrc: IconDefinition,
  text: string,
  color: string
): NavBtnProps => ({
	clickFunc: () => false,
  color,
  currentView: undefined,
  id,
  svgSrc,
  text,
});

const navBtns: NavBtnProps[] = [
  genNavBtnProps(AppViews.Encrypt, faEnvelope, "Encrypt", "#B64402"),
  genNavBtnProps(AppViews.Decrypt, faEnvelopeOpen, "Decrypt", "#564787"),
  genNavBtnProps(AppViews.Keyring, faKey, "Keyring", "#4C1E4F"),
  genNavBtnProps(AppViews.Contacts, faUserFriends, "Contacts", "#32021F"),
];

const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
  overflow: hidden;
`;

const Bar = styled.div`
	position: relative;
	width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 0;
	z-index: 2;

	@media (min-width: 700px) {
		width: 50%;
	}
`;

const NavBar = ({ view, setView }: NavBarProps): JSX.Element => (
  <Container>
    <Bar>
      {navBtns.map((btn) => (
        <NavBtn
          key={btn.id}
          id={btn.id}
					clickFunc={() => setView(btn.id)}
          color={btn.color}
          currentView={view}
          svgSrc={btn.svgSrc}
          text={btn.text}
        />
      ))}
    </Bar>
  </Container>
);

export default NavBar;
