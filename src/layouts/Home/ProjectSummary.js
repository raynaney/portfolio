import projectKatakana from 'assets/katakana-project.svg?url';
import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { deviceModels } from 'components/Model/deviceModels';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useTheme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';
import { useWindowSize } from 'hooks';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { cssProps, media } from 'utils/style';
import styles from './ProjectSummary.module.css';

import profileImgLarge from 'assets/renderNew.jpeg';
import profileImgPlaceholder from 'assets/renderNew.jpeg';
import profileImg from 'assets/profile.jpg';
// import { Scene, Sky } from '@belivvr/aframe-react';

const Model = dynamic(() => import('components/Model').then(mod => mod.Model));

export const ProjectSummary = ({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  custom,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;
  const handleSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;

  const renderKatakana = (device, visible) => (
    <svg
      aria-hidden="true"
      width="750"
      height="137"
      viewBox="0 0 750 137"
      data-visible={visible}
      data-light={theme.themeId === 'light'}
      style={cssProps({ opacity: svgOpacity })}
      className={styles.svg}
      data-device={device}
    >
      <use href={`${projectKatakana}#katakana-project`} />
    </svg>
  );

  const renderDetails = visible => (
    <div className={styles.details}>
      <div aria-hidden className={styles.index}>
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={!visible}
          collapseDelay={1000}
        />
        <span className={styles.indexNumber} data-visible={visible}>
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className={styles.title}
        data-visible={visible}
        id={titleId}
      >
        {title}
      </Heading>
      <Text className={styles.description} data-visible={visible} as="p">
        {description}
      </Text>
      <div className={styles.button} data-visible={visible}>
        <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const renderPreview = visible => (
    <div className={styles.preview}>
      <div className={styles.custom}>
        {/* <Scene>
          <Sky
            rotation="0, -30, 0"
            id="image-360"
            src="https://raw.githubusercontent.com/raynaney/portfolio/master/src/assets/360renderNew.jpeg"
          ></Sky>
        </Scene> */}
        <Image
          reveal
          delay={100}
          placeholder={profileImgPlaceholder}
          srcSet={[profileImg, profileImgLarge]}
          sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
          alt=""
        />
        <svg
          aria-hidden="true"
          width="0"
          height="765"
          viewBox="0 0 135 765"
          className={styles.svg}
          data-visible={visible}
        >
          <use href={`#`} />
        </svg>
      </div>
    </div>
  );

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {visible => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
};
