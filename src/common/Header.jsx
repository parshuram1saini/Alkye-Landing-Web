import React, { useState } from "react";
import styled, { css } from "styled-components";
import { IoIosMenu } from "react-icons/io";
import { colorObj, defaultNavLinks, fontFamily, sectionIds } from "../data";
import { Images } from "../images";

const { websiteLogo } = Images;

export default function WebsiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (value) => {
    setTimeout(() => {
      const element = document.querySelector(`#${value}`);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const previewMode =
    window.innerWidth > 991
      ? "desktop"
      : window.innerWidth > 551
      ? "mobile"
      : "tablet";

  return (
    <>
      <MenuContainer
        id={sectionIds.navbar}
        previewMode={previewMode}
        containerWidth={window.innerWidth}
        font={fontFamily.secondary}
      >
        {previewMode === "desktop" ? (
          <Menu previewMode={previewMode} bordercolor={colorObj.text}>
            <Navbar
              id="navbar-1"
              previewMode={previewMode}
              // bordercolor={colorObj.text}
              background={colorObj.accent3}
            >
              {defaultNavLinks.slice(0, 4).map((item, index) => {
                return (
                  <NavItem
                    key={index}
                    color={colorObj.text}
                    onClick={() => scrollToSection(item.url)}
                    previewmode={previewMode}
                  >
                    {item.text}
                  </NavItem>
                );
              })}
            </Navbar>
            <LogoWrapper>
              <LogoImage src={websiteLogo} alt="navbar-logo" />
            </LogoWrapper>

            <Navbar
              id="navbar-2"
              previewMode={previewMode}
              // bordercolor={colorObj.text}
              background={colorObj.accent3}
              style={{ justifyContent: "flex-end" }}
            >
              <NavBarWrapper>
                {defaultNavLinks.slice(4).map((item, index) => {
                  return (
                    <NavItem
                      key={index}
                      color={colorObj.text}
                      onClick={() => scrollToSection(item.url)}
                      previewmode={previewMode}
                    >
                      {item.text}
                    </NavItem>
                  );
                })}
              </NavBarWrapper>
            </Navbar>
          </Menu>
        ) : (
          <Menu previewMode={previewMode}>
            <LogoWrapper>
              <img src={websiteLogo} alt="navbar-logo" />
            </LogoWrapper>
            <BurgerMenu
              menuOpen={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              containerWidth={window.innerWidth}
              background={colorObj.background}
            >
              <BurgerIcon color={colorObj.text} />
            </BurgerMenu>
          </Menu>
        )}
      </MenuContainer>
      {(previewMode === "tablet" || previewMode === "mobile") && (
        <Navbar
          menuOpen={menuOpen}
          background={colorObj.background}
          containerWidth={window.innerWidth}
          previewMode={previewMode}
        >
          {defaultNavLinks.map((item, index) => {
            return (
              <NavItem
                key={index}
                color={colorObj.text}
                previewmode={previewMode}
                containerWidth={window.innerWidth}
                onClick={() => scrollToSection(item.url)}
              >
                {item.text}
              </NavItem>
            );
          })}
        </Navbar>
      )}
    </>
  );
}

const MenuContainer = styled.div`
  left: 0px;
  top: 0px;
  right: 0px;
  display: flex;
  background-color: transparent;
  font-family: ${(props) => props.font};
  height: 150px;
  font-size: 14px;
  z-index: 999;
  position: fixed;
  background: transparent;
  ${(props) =>
    props.containerWidth <= 550 &&
    css`
      padding: 0 1vw;
      height: 150px;
    `}
`;

const Menu = styled.div`
  padding: 0 3%;
  width: 100%;
  display: flex;
  margin: 0 auto;
  align-items: center;
  border: 1px hsla(0, 0%, 100%, 0.07);
  border-bottom: 1px solid ${(props) => props.bordercolor};
  border-radius: 3px;
  ${(props) =>
    props.previewMode === "desktop" || props.containerWidth > 991
      ? css`
          @media (min-width: 1440px) {
            position: relative;
            overflow: visible;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-flex: 0;
            flex: 0 auto;
          }
          @media (max-width: 991px) {
            justify-content: space-between;
            padding: 0;
          }
        `
      : css`
          height: auto;
          justify-content: space-between;
          ${(props) =>
            props.previewMode === "mobile" &&
            css`
              padding: 0;
            `}
        `}
`;

const NavBarWrapper = styled.div`
  display: flex;
`;

const Navbar = styled.nav`
  ${(props) =>
    props.previewMode === "desktop"
      ? css`
          display: flex;
          width: 100%;
          margin: 0 auto 25px auto;
          align-items: center;
          justify-content: space-around;
          transition: all 0.3s ease-in-out;
        `
      : css`
          display: block;
          overflow: hidden;
          height: ${(props) => (props.menuOpen ? "300px" : "0")};
          top: ${(props) => (props.containerWidth <= 550 ? "160px" : "230px")};
          width: 100%;
          position: absolute;
          flex-direction: column;
          transition: height 0.4s ease-in-out;
          transition-delay: 0.1s;
          border-bottom: none;
          z-index: 3;
          justify-content: center;
          align-items: center;
          align-self: auto;
          flex: 1;
          margin-top: 0;
          border-bottom-width: 0;
          background-color: ${(props) => props.background};
        `}
`;

const NavItem = styled.a`
  display: flex;
  margin: 0 auto;
  padding: 20px 10px 10px 10px;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${(props) => props.fontSize}px;
    `}
  transition: color 0.2s, transform 0.2s, -webkit-transform 0.2s;
  color: ${(props) => props.color};
  letter-spacing: 3px;
  text-transform: uppercase;
  border: 1px solid transparent;
  ${(props) =>
    props.containerWidth <= 991 &&
    css`
      padding: 15px 0;
    `}
  ${(props) =>
    (props.previewmode === "tablet" || props.previewmode === "mobile") &&
    css`
      font-size: 12px;
    `}
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 5rem;
`;

const BurgerMenu = styled.div`
  margin: 0;
  padding: 26px 0;
  justify-content: center;
  align-items: center;
  padding: 18px;
  font-size: 24px;
  cursor: pointer;
  background-color: ${(props) =>
    props.menuOpen ? props.background : "transparent"};
  ${(props) =>
    props.containerWidth <= 991 &&
    css`
      margin: 0 0 20px 0;
    `}
`;

const BurgerIcon = styled(IoIosMenu)`
  color: ${(props) => props.color};
`;
