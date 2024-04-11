import React from "react";
import { styled } from "styled-components";
import { Images } from "../images";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { sectionIds } from "../data";
const { aboutMe, aboutQuotes, forwardArrow } = Images;

function AboutSection() {
  return (
    <Container id={sectionIds.about} className="primary-bg-color">
      <div>
        <img src={aboutMe} alt="about-me" />
      </div>
      <div>
        <img src={aboutQuotes} alt="aboutQuotes" />
        <Para className="white-color font-Inter">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sodales
          turpis et lacinia fermentum. Curabitur vestibulum at arcu sed blandit.
          In consequat euismod purus nec imperdiet.
        </Para>
        <div className="white-color font-Inter font-size-13">Title</div>
        <div className="white-color font-Inter font-size-13">Name</div>
        <ReadyWrapper className="flex-row">
          <img
            className="cursor-pointer"
            style={{ width: "20px", marginRight: "12px" }}
            src={forwardArrow}
            alt="forwardArrow"
          />
          <p className="white-color font-Inter font-size-13">Read my story</p>
        </ReadyWrapper>
      </div>
      <ArrowButtonWrapper>
        <TraverseBackButton
        >
          <BackIndicator />
        </TraverseBackButton>
        <TraverseForwardButton
        >
          <ForwardIndicator />
        </TraverseForwardButton>
      </ArrowButtonWrapper>
    </Container>
  );
}

export default AboutSection;

const Container = styled.div`
  display: grid;
  grid-template-columns: 42% auto;
  padding: 110px;
  position:relative;
`;

const Para = styled.p`
  width: 70%;
  font-size: 13px;
  margin-bottom: 18px;
`;

const ReadyWrapper = styled.p`
  margin-top: 18px;
`;

const BackIndicator = styled(IoIosArrowDropleft)`
  box-sizing: content-box;
  cursor: pointer;
  color: #f36f2b;
  font-size: 1.8em;
  top: 50%;
  border-radius: 999em;
  border: 4px solid transparent;
  z-index: 1;
`;

const ForwardIndicator = styled(IoIosArrowDropright)`
  box-sizing: content-box;
  cursor: pointer;
  color: #f36f2b;
  font-size: 1.8em;
  top: 50%;
  border-radius: 999em;
  border: 4px solid transparent;
  z-index: 1;
`;

const TraverseBackButton = styled.button`
  background: 0 0;
  border: 0;
  justify-self: center;
  outline: 0;
  z-index: 2;
  width: 50px;
`;

const ArrowButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 15%;
  right: 5%;
`;

const TraverseForwardButton = styled.button`
  background: 0 0;
  border: 0;
  justify-self: center;
  outline: 0;
  z-index: 2;
  width: 50px;
`;
