import React, { useCallback, useEffect, useState } from "react";
import { GalleryImages } from "../images";
import { styled } from "styled-components";
import { sectionIds } from "../data";

function GallerySection() {
  const [bulkImages, setBulkImage] = useState([]);

  const getImageDimensions = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        const ratio = {
          dimensions: {
            width: image.naturalWidth,
            height: image.naturalHeight,
          },
        };
        resolve(ratio);
      };

      image.onerror = (error) => {
        reject(error);
      };

      image.src = imageUrl;
    });
  };

  const bulkPhotoToShow = useCallback(async () => {
    let usableImageDataArray = await Promise.all(
      GalleryImages.map(async (imgSrc, index) => {
        if (imgSrc.src) {
          const dimensions = await getImageDimensions(imgSrc.src);
          return {
            ...dimensions,
            src: imgSrc.src,
          };
        }
        return null;
      })
    );
    usableImageDataArray = usableImageDataArray.filter((item) => Boolean(item));
    setBulkImage(usableImageDataArray || []);
  }, []);

  function reorderImagesByAspectRatio(imageList, portraitNumber) {
    // Calculate aspect ratio (height/width) for each image
    imageList.forEach((image) => {
      image.aspect_ratio = image.dimensions.height / image.dimensions.width;
    });

    const sortedByAspectRatio = [...imageList].sort(
      (a, b) => b.aspect_ratio - a.aspect_ratio
    );

    const topIdentifiers = sortedByAspectRatio
      .slice(0, portraitNumber)
      .map((image) => image.src);

    const reorderedImages = sortedByAspectRatio.filter((image) =>
      topIdentifiers?.includes(image.src)
    );

    imageList.forEach((image) => {
      if (!topIdentifiers?.includes(image.src)) {
        reorderedImages.push(image);
      }
    });

    return reorderedImages;
  }

  useEffect(() => {
    bulkPhotoToShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SubContainer id={sectionIds.people} >
      <FiveImageGallery>
        <Col3>
          <ImgWrap8>
            <img
              className="width-100 height-100 object-fit-cover"
              src={reorderImagesByAspectRatio(bulkImages, 3)[1]?.src}
              alt="img-1"
            />
          </ImgWrap8>
        </Col3>
        <Col4>
          <ImgWrap6>
            <img
              src={reorderImagesByAspectRatio(bulkImages, 3)[2]?.src}
              alt="img-2"
            />
          </ImgWrap6>
          <HeaderSection>
            <div style={{ padding: "20px 50px" }} className="flex-column">
              <HeadingText
                style={{ fontSize: "30px" }}
                className="font-size-24 black-color font-Oswald"
              >
                We celebrate
                <span className="primary-color"> success</span>
              </HeadingText>
              <Paragraph className="black-color font-Inter">
                At CaSE we understand that every achievement, big or small, is a
                result of the hard work and dedication of our team members. We
                take pride in celebrating these moments because they underscore
                the commitment and effort put into each project.
              </Paragraph>
              <Paragraph className="black-color font-Inter">
                Some of our favourite events on the calendar include our coveted
                Melbourne Cup event and our always amazing Christmas Party.
                In-between, our team celebrate together during team cycling
                events, regular team dinners and social morning teas to
                celebrate milestones and special days. Taking the time to
                celebrate wins is our way of showing gratitude and ensuring
                everyone knows their efforts make a difference.
              </Paragraph>
            </div>
          </HeaderSection>
          <ImgWrap6>
            <img
              src={reorderImagesByAspectRatio(bulkImages, 3)[3]?.src}
              alt="img-3"
            />
          </ImgWrap6>
        </Col4>
        <Col7>
          <ImgWrap7>
            <img
              src={reorderImagesByAspectRatio(bulkImages, 3)[0]?.src}
              alt="img-4"
            />
          </ImgWrap7>
          {/* <ImgWrap7>
            <img
              src={reorderImagesByAspectRatio(bulkImages, 3)[0]?.src}
              alt="img-5"
            />
          </ImgWrap7> */}
        </Col7>
      </FiveImageGallery>
      <GridContainer1 className="flex-row">
        <div style={{ padding: "20px 50px" }} className="flex-column">
          <HeadingText
            style={{ fontSize: "30px" }}
            className="font-size-24 black-color font-Oswald"
          >
            Employee
            <span className="primary-color"> Appreciation Program</span>
          </HeadingText>
          <Paragraph className="black-color font-Inter">
            Our Employee Appreciation Program is tailored to honor the ongoing
            commitment and efforts of our long-serving team members. Our 5 Year
            Club and 10 Year Club are special milestones within this program,
            celebrating employees who have dedicated half a decade or a full
            decade to our company mission. Each year, members of these clubs are
            invited to annual events held at select, memorable locations,
            reflecting our gratitude and recognition of their unwavering
            dedication. It's our way of saying thank you and ensuring that every
            significant chapter in our collective journey is celebrated with the
            grandeur it deserves
          </Paragraph>
        </div>
        <img
          src={reorderImagesByAspectRatio(bulkImages, 3)[5]?.src}
          alt="img-5"
        />
      </GridContainer1>
      <GridContainer2 className="flex-row">
        <img
          src={reorderImagesByAspectRatio(bulkImages, 3)[6]?.src}
          alt="img-5"
        />
        <img
          src={reorderImagesByAspectRatio(bulkImages, 3)[7]?.src}
          alt="img-5"
        />
      </GridContainer2>
    </SubContainer>
  );
}

export default GallerySection;

const SubContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 50px;
`;

const FiveImageGallery = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Col3 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25vw;
`;
const Col4 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
`;

const Col7 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25vw;
  height: 75.5vw;
`;
const HeaderSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  height: 12vw;
`;

const ImgWrap1 = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 900px;
  height: 600px;
`;
const ImgWrap6 = styled(ImgWrap1)`
  width: 49vw;
  height: 32.25vw;
`;

const ImgWrap7 = styled(ImgWrap1)`
  width: 25vw;
  height: 61vw;
`;

const ImgWrap8 = styled(ImgWrap1)`
  width: 25vw;
  height: 73.5vw;
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

const GridContainer1 = styled.div`
  display: grid;
  grid-column-gap: 10px;
  margin-bottom: 10px;
  grid-template-columns: auto auto;
`;
const GridContainer2 = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: auto auto;
`;
