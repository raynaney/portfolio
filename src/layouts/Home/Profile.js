import profileKatakana from 'assets/katakana-profile.svg?url';
import profileImgLarge from 'assets/profile.jpeg';
import profileImgPlaceholder from 'assets/profile.jpeg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';
import { useEffect, useRef } from 'react';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Rayna. Right now I live in Amsterdam working as a researcher in{' '}
      <Link href="https://www.mlnlab.nl/team">
        The Motor Learning and Neurorehabilitation Lab
      </Link>
      . My research includes topics on virtual reality, EEG, and motor cognition. I have
      completed projects on the societal impact of artificial intelligence models during
      my time as a masters student as well. Having an interdisciplinary background allows
      me to bring a wealth of knowledge from many different areas to problem solving.
      Combined with a technical background, I can quickly protoype real-world solutions.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      In my spare time I like to create ceramics, go bike riding, and make websites. I’m
      always down for hearing about new projects, so feel free to drop me a line.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;
  const aframeSceneRef = useRef();

  // This useEffect hook ensures that A-Frame gets cleaned up properly
  useEffect(() => {
    const aframeEl = aframeSceneRef.current;

    return () => {
      // if (aframeEl && aframeEl.parentNode) {
      //   aframeEl.parentNode.removeChild(aframeEl);
      // }
    };
  }, []);

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="malito:raynaney@gmail.com"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg, profileImgLarge]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing in front of the Torii on Miyajima, an island off the coast of Hiroshima in Japan"
                />
                {/* <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg> */}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
