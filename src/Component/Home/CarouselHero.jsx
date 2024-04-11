import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { carouselImages } from "../../images";

function CarouselHero() {
  const images = carouselImages;

  const ref = useRef(null);
  const carouselTimerRef = useRef(Date.now());

  const [itemIndex, setItemIndex] = useState(0);
  const [mobileItemIndex, setMobileItemIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  const previewmode =
    window.innerWidth > 991
      ? "desktop"
      : window.innerWidth > 551
      ? "mobile"
      : "tablet";

  const previousHandler = useCallback(() => {
    setTransitionEnabled(true);
    carouselTimerRef.current = Date.now();

    const imageIndex = previewmode === "desktop" ? itemIndex : mobileItemIndex;
    const setImageIndex =
      previewmode === "desktop" ? setItemIndex : setMobileItemIndex;

    if (imageIndex === 0) {
      setTimeout(() => {
        setImageIndex(images.length - 1);
      }, 5);
    } else {
      setTimeout(() => {
        setImageIndex(imageIndex - 1);
      }, 5);
    }
    setTimeout(() => setTransitionEnabled(false), 500);
  }, [images.length, itemIndex, mobileItemIndex, previewmode]);

  const nextHandler = useCallback(async () => {
    setTransitionEnabled(true);
    carouselTimerRef.current = Date.now();

    const imageIndex = previewmode === "desktop" ? itemIndex : mobileItemIndex;
    const setImageIndex =
      previewmode === "desktop" ? setItemIndex : setMobileItemIndex;

    if (imageIndex >= images.length - 1) {
      setTimeout(() => {
        setImageIndex(0);
      }, 5);
    } else {
      setTimeout(() => {
        setImageIndex(imageIndex + 1);
      }, 5);
    }
    setTimeout(() => setTransitionEnabled(false), 500);
  }, [images.length, itemIndex, mobileItemIndex, previewmode]);

  const containerWidthWebsite = ref?.current?.offsetWidth || window.innerWidth;
  const leftOffset = `${itemIndex * -containerWidthWebsite}px`;

  const mobileLeftOffset = `${mobileItemIndex * -containerWidthWebsite}px`;

  useEffect(() => {
    const updateSlide = () => {
      // if (carouselTimerRef.current > Date.now() - 4500) return
      // nextHandler()
    };

    const int = setInterval(updateSlide, 50);

    return () => clearInterval(int);
  }, [nextHandler]);

  return (
    <Container id="carousel-hero" ref={ref}>
      <Wrapper>
        <ViewPort>
            <HeadlineWrapper className="flex-column">
                <small>Home / Why work with us</small>
                <H2>Headline #1</H2>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
            </HeadlineWrapper>
          {images.length > 1 && (
            <ArrowButtonWrapper>
              <TraverseBackButton
                onClick={(e) => {
                  e.stopPropagation();
                  previousHandler();
                }}
              >
                <BackIndicator />
              </TraverseBackButton>
              <TraverseForwardButton
                onClick={(e) => {
                  e.stopPropagation();
                  nextHandler();
                }}
              >
                <ForwardIndicator />
              </TraverseForwardButton>
            </ArrowButtonWrapper>
          )}
          <ImageRowContainer
            leftOffset={
              previewmode === "desktop" ? leftOffset : mobileLeftOffset
            }
            transitionEnabled={transitionEnabled}
          >
            <PreRenderImageRow imageNum={images.length}>
              {images?.map((item, index) => {
                return <HeroSlider key={index} index={index} item={item} />;
              })}
            </PreRenderImageRow>
          </ImageRowContainer>
        </ViewPort>
      </Wrapper>
    </Container>
  );
}

export default CarouselHero;

const HeroSlider = memo(({ item, index }) => {
  return (
    <ImageContainer>
      <CardImg src={item.src} alt={`carousel-hero-element image-${index}`} />
    </ImageContainer>
  );
});

const Container = styled.div`
  width: 100%;
  font-family: ${(props) => props.font};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  ${(props) =>
    props.originalWidth > 991 && props.previewmode === "tablet"
      ? `
      width: 991px;
    `
      : ""}
  ${(props) =>
    props.originalWidth > 550 && props.previewmode === "mobile"
      ? `
      width: 550px;
    `
      : ""}
`;

const ViewPort = styled.div`
  width: 100%;
  overflow: hidden;
  ${(props) =>
    props.containerWidth <= 550 &&
    css`
      height: ${(props.containerWidth * 5) / 3}px;
    `}
  ${(props) =>
    props.containerWidth <= 991 &&
    props.containerWidth > 550 &&
    css`
      height: ${(props.containerWidth * 4) / 3}px;
    `}
    height: 100%;
`;

const HeadlineWrapper = styled.div`
 position :absolute;
 bottom: 10%;
 left: 10%;
 color: #FFFFFF;
 z-index: 9;
 cursor:pointer;
`

const H2 = styled.h2`
margin-top:0px;
margin-bottom: 10px;
`

const ImageRowContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  left: ${(props) => (props.leftOffset ? props.leftOffset : "initial")};
  transition: ${(props) =>
    props.transitionEnabled ? "left 0.5s linear" : "none"};
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: inherit;
  background-color: rgba(243.5, 245.3, 245.3);
  overflow: hidden;
`;
const CardImg = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 100% 50%;
  margin: 0;
`;
const BackIndicator = styled(IoIosArrowDropleft)`
  position: absolute;
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
  position: absolute;
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
  bottom: 5%;
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

const PreRenderImageRow = styled.div`
  position: absolute;
  display: flex;
  background-color: var(--background-grey);
  width: ${(props) => `${props.imageNum * 100}%`};
  height: 100%;
`;
