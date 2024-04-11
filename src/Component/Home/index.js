import React, { useEffect } from 'react'
import CarouselHero from './CarouselHero'
import styled, { css } from "styled-components";
import WebsiteNavbar from '../../common/Header';
import IntroSection from './IntroSection';
import ExpertiseSection from './ExpertiseSection';
import WebFont from 'webfontloader'
import GallerySection from '../GallerySection';
import AboutSection from '../AboutSection';
import FooterSection from '../FooterSection';

function Home() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Oswald', 'Inter'],
      },
    })
  }, [])

  return (
    <div className='overflow-x-hidden'>
      <Wrapper>
        <ViewPort containerWidth={window.innerWidth}>
          <CarouselHero />
          <WebsiteNavbar />
        </ViewPort>
      </Wrapper>
      <IntroSection/>
      <ExpertiseSection/>
      <GallerySection/>
      <AboutSection/>
      <FooterSection/>
    </div>
  )
}

export default Home


const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;

  ${(props) =>
    props.originalWidth > 991 && props.previewmode === 'tablet'
      ? `
      width: 991px;
    `
      : ''}
  ${(props) =>
    props.originalWidth > 550 && props.previewmode === 'mobile'
      ? `
      width: 550px;
    `
      : ''}
`

const ViewPort = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${(props) => (props.containerWidth * 2) / 3}px;
  ${(props) =>
    (props.previewmode === 'mobile' || props.previewmode === 'tablet') &&
    css`
      ${(props) =>
        props.containerWidth <= 550 &&
        css`
          ${'' /* height: ${(props.containerWidth * 4) / 3}px; */}
          height: 100vh;
        `}
      ${(props) =>
        props.containerWidth <= 991 &&
        props.containerWidth > 550 &&
        css`
          height: ${(props.containerWidth * 4) / 3}px;
        `}
    `}
`