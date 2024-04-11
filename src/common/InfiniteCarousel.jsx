import { v4 as uuid } from 'uuid'
import { useRef, useEffect, useCallback, useMemo } from 'react'
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg'
import styled, { css } from 'styled-components'
import SectionToEdit from './SectionToEditContainer'
import { templateFiveIcons } from 'components/public/website/templates/Linen/assets'
import RefreshIconLoader from './RefreshIconLoader'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import { templateEightIcons } from 'components/public/website/templates/Moonlight/assets'
import useAnimation from 'hooks/useAnimation'
const { carousel_arrowLeft, carousel_arrowRight } = templateFiveIcons
const { forwardIcon, backwardIcon } = templateEightIcons

export default function InfiniteCarousel({
  images: imgs,
  containerWidth,
  colorObj,
  arrowsColor = colorObj.navTextColor,
  fontFamily,
  templateId,
  isloading,
  showPreview,
  previewmode,
  handleShowAboutTagline,
  handleHighlightEditSection,
  ...props
}) {
  const { aboutTagline, tagline, context } = props
  const ref = useRef()
  const index = useRef(0)
  const currTransl = useRef([])
  const translationComplete = useRef(true)
  const carouselTimerRef = useRef(Date.now())

  // const [taglineRef, inView, active] = useFadeInAnimation()
  const [taglineRef, inView] = useAnimation(0)

  const images = useMemo(
    () =>
      (imgs.length === 2 ? [{ ...imgs[0] }, { ...imgs[1] }, ...imgs] : imgs).map((obj) => {
        obj._key = uuid()

        return obj
      }),
    [imgs],
  )

  const amount = images.length ?? 0

  const transitionCompleted = function () {
    translationComplete.current = true
  }

  const handlePrev = useCallback(
    (event) => {
      if (event?.stopPropagation) event.stopPropagation()

      if (!ref.current || amount < 2) return

      if (translationComplete.current !== true) return

      carouselTimerRef.current = Date.now()

      translationComplete.current = false

      index.current--
      if (index.current === -1) {
        index.current = amount - 1
      }

      const outerIndex = index.current % amount

      for (let i = 0; i < amount; i++) {
        const slide = document.getElementsByClassName('slide')[i]
        slide.style.opacity = '1'
        slide.style.transform = 'translateX(' + (currTransl.current[i] + containerWidth) + 'px)'
        currTransl.current[i] = currTransl.current[i] + containerWidth
      }

      const outerSlide = document.getElementsByClassName('slide')[outerIndex]
      if (!outerSlide) return
      outerSlide.style.transform =
        'translateX(' + (currTransl.current[outerIndex] - containerWidth * amount) + 'px)'
      outerSlide.style.opacity = '0'
      currTransl.current[outerIndex] = currTransl.current[outerIndex] - containerWidth * amount
    },
    [amount, containerWidth],
  )

  const handleNext = useCallback(
    (event) => {
      if (event?.stopPropagation) event.stopPropagation()

      if (!ref.current || amount < 2) return

      if (translationComplete.current !== true) return

      carouselTimerRef.current = Date.now()

      translationComplete.current = false

      const outerIndex = index.current % amount

      index.current++

      for (let i = 0; i < amount; i++) {
        const slide = document.getElementsByClassName('slide')[i]
        slide.style.opacity = '1'
        slide.style.transform = 'translateX(' + (currTransl.current[i] - containerWidth) + 'px)'
        currTransl.current[i] = currTransl.current[i] - containerWidth
      }

      const outerSlide = document.getElementsByClassName('slide')[outerIndex]
      if (!outerSlide) return
      outerSlide.style.transform =
        'translateX(' + (currTransl.current[outerIndex] + containerWidth * amount) + 'px)'
      outerSlide.style.opacity = '0'
      currTransl.current[outerIndex] = currTransl.current[outerIndex] + containerWidth * amount
    },
    [amount, containerWidth],
  )

  useEffect(() => {
    const carousel = ref.current?.querySelector('#carousel')

    if (!carousel) return

    // calculate the width of the carousel
    carousel.style.width = amount * containerWidth + 'px'
    // prevent multiple click when transition
    currTransl.current = []

    for (let i = 0; i < amount; i++) {
      currTransl.current[i] = -containerWidth
      ref.current
        .getElementsByClassName('slide')
        [i].addEventListener('transitionend', transitionCompleted, true)
      ref.current
        .getElementsByClassName('slide')
        [i].addEventListener('webkitTransitionEnd', transitionCompleted, true)
      ref.current
        .getElementsByClassName('slide')
        [i].addEventListener('oTransitionEnd', transitionCompleted, true)
      ref.current
        .getElementsByClassName('slide')
        [i].addEventListener('MSTransitionEnd', transitionCompleted, true)
    }
    // add the last item to the start so that translateX(-moveOffset) works (In case the first click is the previous button)
    if (amount > 1) carousel.insertBefore(carousel.children[amount - 1], carousel.children[0])
  }, [amount, containerWidth])

  useEffect(() => {
    const updateSlide = () => {
      if (carouselTimerRef.current > Date.now() - 4500) return

      handleNext()
    }

    const int = setInterval(updateSlide, 50)

    return () => clearInterval(int)
  }, [handleNext])

  if (!containerWidth) return null

  const previewMode =
  window.innerWidth > 991
    ? "desktop"
    : window.innerWidth > 551
    ? "mobile"
    : "tablet";

  return (
    <ContainerWrapper templateId={templateId}>
      <Container id="carousel-container" ref={ref} templateId={templateId}>
        <ImageRowContainer id="carousel" className="animate">
          {images.map((img) => {
            return (
              <ImageContainer className="slide animate" width={containerWidth} key={img._key}>
                <CardImg src={img.src ?? img.image} alt="carousel-img" previewmode={previewmode} />
              </ImageContainer>
            )
          })}
        </ImageRowContainer>

        {amount > 1 && (
          <>
            <TraverseBackButton templateId={templateId} onClick={handlePrev}>
              {templateId === 4 ? (
                <Img src={carousel_arrowLeft} alt="back_arrow" $transformLft />
              ) : templateId === 5 ? (
                <BackIndicatorWrapper color={arrowsColor} templateId={templateId} />
              ) : templateId === 6 || templateId === 7 || templateId === 10 ? (
                <Img templateId={templateId} src={backwardIcon} alt="backwardIcon" />
              ) : (
                <BackIndicator color={arrowsColor} templateId={templateId} />
              )}
            </TraverseBackButton>
            <TraverseForwardButton templateId={templateId} onClick={handleNext}>
              {templateId === 4 ? (
                <Img src={carousel_arrowRight} alt="back_arrow" />
              ) : templateId === 5 ? (
                <ForwardIndicatorWrapper color={arrowsColor} templateId={templateId} />
              ) : templateId === 6 || templateId === 7 || templateId === 10 ? (
                <Img templateId={templateId} src={forwardIcon} alt="forwardIcon" />
              ) : (
                <ForwardIndicator color={arrowsColor} templateId={templateId} />
              )}
            </TraverseForwardButton>
          </>
        )}
      </Container>

      {templateId === 4 && (
        <Div
          previewmode={previewmode}
          showPreview={showPreview}
          templateId={templateId}
          containerWidth={containerWidth}
        >
          <SectionToEdit
            sectionTitle={'About'}
            editRightPosition="2.2rem"
            showPreview={showPreview}
            elementId={'edit-welcome-tagline'}
            openSection={3}
            handleHighlightEditSection={handleHighlightEditSection}
          >
            <AboutHeader
              ref={taglineRef}
              inView={inView}
              className={inView && 'fade-in'}
              previewmode={previewmode}
              showPreview={showPreview}
              font={fontFamily?.secondary}
              templateId={templateId}
            >
              {aboutTagline}
              {!showPreview && (
                <RefreshIconLoader
                  isloading={isloading}
                  check={-1}
                  handleShowHideLoader={() => handleShowAboutTagline(-1)}
                  color={colorObj.text}
                />
              )}
            </AboutHeader>
          </SectionToEdit>
        </Div>
      )}
      {templateId === 6 && (
        <Div
          previewmode={previewmode}
          showPreview={showPreview}
          templateId={templateId}
          containerWidth={containerWidth}
        >
          <SectionToEdit
            sectionTitle={'About'}
            showPreview={showPreview}
            elementId={'edit-tagline'}
            openSection={3}
            containerStyles={`padding: 5px 12px;`}
            handleHighlightEditSection={handleHighlightEditSection}
          >
            <AboutHeader
              ref={taglineRef}
              inView={inView}
              className={inView && 'fade-in'}
              previewmode={previewmode}
              showPreview={showPreview}
              font={fontFamily?.secondary}
              templateId={templateId}
            >
              {tagline}
            </AboutHeader>
          </SectionToEdit>
        </Div>
      )}
      {(templateId === 7 || templateId === 10) && (
        <Div
          previewmode={previewmode}
          showPreview={showPreview}
          templateId={templateId}
          containerWidth={containerWidth}
        >
          <SectionToEdit
            sectionTitle={'About'}
            showPreview={showPreview}
            elementId={'edit-tagline'}
            openSection={3}
            handleHighlightEditSection={handleHighlightEditSection}
            containerStyles={templateId === 10 && `width: 90%;`}
          >
            {templateId === 7 && (
              <Text
                font={fontFamily?.secondary}
                ref={taglineRef}
                inView={inView}
                className={inView && 'fade-in'}
                previewmode={previewmode}
              >
                {context.photographer.companyName}
              </Text>
            )}
            <AboutHeader
              previewmode={previewmode}
              showPreview={showPreview}
              font={templateId === 10 ? fontFamily?.primary : fontFamily?.secondary}
              templateId={templateId}
              ref={taglineRef}
              inView={inView}
              className={inView && 'fade-in'}
            >
              {tagline}
            </AboutHeader>
          </SectionToEdit>
        </Div>
      )}
    </ContainerWrapper>
  )
}
const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${
    '' /* ${(props) =>
    props.templateId === 6 &&
    css`
      display: flex;
      justify-content: center;
    `} */
  }
`
const Container = styled.div`
  width: 100%;
  ${'' /* position: relative; */}
  position: absolute;
  height: 100%;
  ${
    '' /* ${(props) =>
    props.templateId === 6 &&
    css`
      position: absolute;
    `} */
  }
`

const ImageRowContainer = styled.ul`
  position: relative;
  padding: 0;
  margin: 0;
  transition-duration: 0.5s;
  transition-property: transform;
  display: inline-block;
  height: 100%;
`
const ImageContainer = styled.li`
  list-style: none;
  min-width: ${(props) => props.width}px;
  max-width: ${(props) => props.width}px;
  position: relative;
  float: left;
  transform: translateX(0px);
  transition-duration: 0.5s;
  transition-property: transform;
  text-align: center;
  height: 100%;
`

const CardImg = styled.img`
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  ${(props) =>
    props.previewmode === 'mobile' &&
    css`
      width: 550px;
      height: 110vh;
    `}
  ${(props) =>
    props.previewmode === 'tablet' &&
    css`
      width: 991px;
    `}
  @media(max-width: 768px) {
    height: 75vh;
    width: 550px;
  }
`

const TraverseBackButton = styled.button`
  background: 0 0;
  border: 0;
  justify-self: center;
  outline: 0;
  padding: 16px 8px;
  position: absolute;
  width: ${({ templateId }) => (templateId === 4 ? 100 : 80)}px;
  height: 100vh;
  @media (max-width: 768px) {
    height: 75vh;
  }
  left: 0;
  top: 0;
`

const TraverseForwardButton = styled.button`
  background: 0 0;
  border: 0;
  justify-self: center;
  outline: 0;
  padding: 16px 8px;
  position: absolute;
  width: ${({ templateId }) => (templateId === 4 ? 100 : 80)}px;
  height: 100vh;
  @media (max-width: 768px) {
    height: 75vh;
  }
  top: 0;
  right: 0;
`

const BackIndicator = styled(CgArrowLeft)`
  position: absolute;
  box-sizing: content-box;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: 1.5em;
  top: 45%;
  border-radius: 999em;
  border: 4px solid transparent;
  z-index: 1;
  ${(props) =>
    props.templateId === 10 &&
    css`
      z-index: 2;
    `}
  transform: translateX(0%);
  transition: transform 0.7s;

  :hover {
    transform: translateX(-30%);
  }
`

const ForwardIndicator = styled(CgArrowRight)`
  position: absolute;
  box-sizing: content-box;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: 1.5em;
  top: 45%;
  border-radius: 999em;
  border: 4px solid transparent;
  z-index: 1;
  ${(props) =>
    props.templateId === 10 &&
    css`
      z-index: 2;
    `}

  transform: translateX(0%);
  transition: transform 0.7s;

  :hover {
    transform: translateX(30%);
  }
`

const BackIndicatorWrapper = styled(TfiArrowCircleLeft)`
  position: absolute;
  box-sizing: content-box;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: 50px;
  top: 45%;
  border-radius: 999em;
  border: 4px solid transparent;
  z-index: 1;
  ${(props) =>
    props.templateId === 10 &&
    css`
      z-index: 2;
    `}
  transform: translateX(0%);
  transition: transform 0.7s;

  :hover {
    transform: translateX(-30%);
  }
`

const ForwardIndicatorWrapper = styled(TfiArrowCircleRight)`
  position: absolute;
  box-sizing: content-box;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: 50px;
  top: 45%;
  border-radius: 999em;
  border: 4px solid transparent;
  z-index: 1;
  ${(props) =>
    props.templateId === 10 &&
    css`
      z-index: 2;
    `}
  transform: translateX(0%);
  transition: transform 0.7s;

  :hover {
    transform: translateX(30%);
  }
`

const AboutHeader = styled.div`
  font-size: 40px;
  font-family: ${({ font }) => font};
  line-height: 70px;
  letter-spacing: 1px;
  font-weight: 400;
  color: #ffffff;
  ${(props) =>
    (props.templateId === 6 || props.templateId === 10) &&
    css`
      font-size: 50px;
      margin: 0 auto;
      display: block;
      padding: 60px 0;
      text-transform: uppercase;
      font-weight: 300;
      line-height: 70px;
      ${(props) =>
        props.templateId === 10 &&
        css`
          text-transform: capitalize;
          font-weight: 400;
          padding: 20px 0;
        `}
      ${(props) =>
        props.previewmode === 'desktop' &&
        css`
          width: 52%;
        `}
      ${(props) =>
        !props.showPreview &&
        props.previewmode === 'desktop' &&
        css`
          width: 70%;
        `}
      ${(props) =>
        props.previewmode === 'tablet' &&
        css`
          font-size: 44px;
        `}

      ${(props) =>
        props.previewmode === 'mobile' &&
        css`
          font-size: 24px;
          line-height: 55px;
          width: 85%;
          ${(props) =>
            props.templateId === 10 &&
            css`
              line-height: 30px;
            `}
        `};
    `};
  opacity: 0;
  ${(props) =>
    props.inView &&
    css`
      opacity: 1;
    `};
  ${(props) =>
    props.templateId === 7 &&
    css`
      font-size: 30px;
      margin: 0 auto;
      display: block;
      padding: 0 0 60px;
      font-weight: 300;
      line-height: 60px;
      ${(props) =>
        props.previewmode === 'desktop' &&
        css`
          width: 70%;
        `}

      ${(props) =>
        props.previewmode === 'tablet' &&
        css`
          font-size: 28px;
        `}

      ${(props) =>
        props.previewmode === 'mobile' &&
        css`
          font-size: 24px;
          width: 100%;
          margin: 0;
          line-height: 32px;
        `};
    `};
`
const Img = styled.img`
  position: absolute;
  box-sizing: content-box;
  cursor: pointer;
  color: ${(props) => props.color};
  font-size: 1.5em;
  top: 45%;
  border-radius: 999em;
  border: 4px solid transparent;
  z-index: 1;
  ${(props) =>
    props.templateId === 10 &&
    css`
      z-index: 2;
    `}
  transform: translateX(0%);
  transition: transform 0.7s;

  :hover {
    transform: ${({ $transformLft }) => ($transformLft ? 'translateX(-30%)' : 'translateX(30%)')};
  }
  ${(props) =>
    (props.templateId === 6 || props.templateId === 7 || props.templateId === 10) &&
    css`
      width: 18px;
    `}
`
const Div = styled.div`
  position: absolute;
  z-index: 1;
  ${(props) =>
    props.templateId === 4 &&
    css`
      box-sizing: content-box;
      width: 70%;
      margin-left: 70px;
      bottom: 6%;
    `};
  ${(props) =>
    props.templateId === 6 &&
    css`
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    `};
  ${(props) =>
    (props.templateId === 7 || props.templateId === 10) &&
    css`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      bottom: 6%;
      ${(props) =>
        props.templateId === 10 &&
        css`
          bottom: 40%;
          ${(props) =>
            !props.showPreview &&
            props.containerWidth < 1068 &&
            props.previewmode === 'desktop' &&
            css`
              bottom: 20%;
            `}
        `}
      ${(props) =>
        props.previewmode === 'mobile' &&
        css`
          bottom: 10%;
          padding: 0 50px;
          ${(props) =>
            props.templateId === 10 &&
            css`
              bottom: 30%;
            `}
        `}
    `};
`
const Text = styled.div`
  font-size: 50px;
  text-transform: uppercase;
  font-family: ${(props) => props.font};
  line-height: 70px;
  letter-spacing: 1px;
  font-weight: 300;
  color: #ffffff;
  opacity: 0;
  ${(props) =>
    props.inView &&
    css`
      opacity: 1;
    `};
  ${(props) =>
    props.previewmode === 'mobile' &&
    css`
      font-size: 35px;
      line-height: 40px;
    `}
`
