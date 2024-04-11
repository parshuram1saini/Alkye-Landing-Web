import React from "react";
import { styled } from "styled-components";
import { Images } from "../../images";
import { sectionIds } from "../../data";
const { tableData } = Images;

function ExpertiseSection() {
  return (
    <div id={sectionIds.expertise} className="primary-bg-color">
      <SubContainer className="flex-row">
        <HeadingText className="font-size-48 white-color font-Oswald">
          We believe in{" "}
          <span className="primary-color">
            diversity & <br /> inclusion
          </span>
        </HeadingText>
        <div className="white-color font-Inter">
          <Paragraph>
            At CaSE we do not just accept difference — we celebrate it, we
            support it, and we thrive on it for the benefit of our employees,
            our services, our industry and our community. We are proud to be an
            equal opportunity employer. Guided by our values and beliefs, we
            foster an inclusive workplace culture where employees thrive because
            of their differences, not in spite of them.
          </Paragraph>
          <Paragraph>
            Our values and beliefs, we foster an inclusive workplace culture
            where employees thrive because of their differences, not in spite of
            them Our Commitment to reinventing the standard. With more than 20
            nationalities represented in our global workforce, we firmly believe
            that our ability to deliver high-quality results is fueled by our
            active efforts to embed diversity and inclusion. We recognise,
            respect, and strive to create an environment where employees can
            excel and feel a true sense of belonging.
          </Paragraph>
          <IncludedText className="white-color">
            Some of our strategic initiatives include:
          </IncludedText>
        </div>
      </SubContainer>
      <img className="width-100" src={tableData} alt="expertise" />
    </div>
  );
}

export default ExpertiseSection;

const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 70px;
`;
const HeadingText = styled.div`
  letter-spacing: -0.3px;
`;

const Paragraph = styled.div`
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.3px;
  padding-top: 15px;
`;

const IncludedText = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-top: 22px;
`;
