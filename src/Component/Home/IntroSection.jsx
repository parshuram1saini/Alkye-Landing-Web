import React from "react";
import { styled } from "styled-components";
import { IoIosArrowDropright } from "react-icons/io";
import { introData, introTagline, sectionIds } from "../../data";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./assets/style/introSection.css";
import { Images, IntroIcons } from "../../images";
const { intro } = Images;

function IntroSection() {
  return (
    <div id={sectionIds.projects} className="font-Inter">
      <TaglineWrapper className="flex-row">
        <BorderDiv></BorderDiv>
        {introTagline.map((item, index) => {
          return (
            <ContentWrapper className="flex-column">
              <CounterTag>{`0${index + 1}`}</CounterTag>
              <div className="flex-row justify-between">
                <Paragraph>{item.text}</Paragraph>
                <ForwardIndicator />
              </div>
            </ContentWrapper>
          );
        })}
      </TaglineWrapper>
      <IntroContainer className="">
        <AccordionWrapper>
          <HeadingText className="font-size-48 font-Oswald">
            We
            <span className="primary-color"> stay connected</span>
          </HeadingText>
          {introData.map(({title,description}, index) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <div className="flex-row">
                    <Icons src={IntroIcons[index]} alt="intro1" />
                    <Typography className="intro-title" style={{ marginLeft: "20px",color:"" }}>{title}</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="intro-description">
                    {description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </AccordionWrapper>
        <div className="">
          <img className="width-100 height-100" src={intro} alt="intro" />
        </div>
      </IntroContainer>
    </div>
  );
}

export default IntroSection;

const BorderDiv = styled.div`
  position: absolute;
  background: #f36f2b;
  width: 200px;
  height: 1.5px;
`;

const ForwardIndicator = styled(IoIosArrowDropright)`
  box-sizing: content-box;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.4em;
  border-radius: 999em;
  z-index: 1;
`;

const TaglineWrapper = styled.div`
  background: #112c41;
  display: grid;
  grid-template-columns: auto auto auto;
`;

const ContentWrapper = styled.div`
  padding: 25px 50px;
  border-right: 1px solid #000000;
  &last-child {
    border-right: none;
  }
`;

const CounterTag = styled.div`
  color: #6b6b6b;
`;
const Paragraph = styled.div`
  color: #ffffff;
  font-size: 14px;
`;

const Icons = styled.img`
  width: 1.4em;
`;

const AccordionWrapper = styled.div`
 padding-left: 60px;
`

const IntroContainer = styled.div`
  display: grid;
  grid-template-columns: 50% auto;
`;

const HeadingText = styled.div`
  padding: 25px 40px;
  padding-left:0px;
`;
