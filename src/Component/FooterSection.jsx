import React from "react";
import { styled } from "styled-components";
import { Images } from "../images";
import { sectionIds } from "../data";
const { arrow, footer, map } = Images;

function FooterSection() {
  return (
    <>
      <Container id={sectionIds.career}>
        <SubContainer className="font-Inter flex-row justify-center">
          <HeadingText>
            As a <span className="primary-color"> global business , </span>
            we encourage you to contact us no matter where you are located in
            the world.
          </HeadingText>
        </SubContainer>
        <SmallText> Browse our job opportunities across the globe.</SmallText>
        <Roles className="flex-row justify-center">
          <div className="primary-color">OPEN ROLES</div>
          <ImageWrapper>
            <ImgSrc src={arrow} alt="arrow" />
          </ImageWrapper>
        </Roles>
      <img className="width-100 height-100 object-fit-cover" src={map} alt="map" />
      </Container>
      <img className="width-100 height-100 object-fit-cover" src={footer} alt="footer" />
    </>
  );
}

export default FooterSection;

const Container = styled.div`
  padding: 100px;
  position: relative;
  background: white;
  width: 80%;
`;

const SubContainer = styled.div`
  width: 100%;
`;
const HeadingText = styled.div`
  padding-left: 0px;
  width: 80%;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
`;

const SmallText = styled.div`
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Roles = styled.div`
  align-items: center;
  margin-bottom: 50px;
`;

const ImageWrapper = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  margin-left: 12px;
`;

const ImgSrc = styled.img`
  padding: 8px;
  width: 12px;
`;
