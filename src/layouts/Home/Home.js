import profileImgPlaceholder from 'assets/profile.jpg';

import aiArt from 'assets/ai-art.jpg';
import render1 from 'assets/renderEEG.jpeg';
import render2 from 'assets/renderNew.jpeg';

import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['HCI', 'VR/AR/XR', 'Generative AI', 'Cognition', 'Neuroscience'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Researcher"
        description="Portfolio of Rayna Ney - Human Compter Interaction Researcher."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="EEG-based Evaluation of Motor Skill Acquisition in Virtual and Physical Environments "
        description="Exploring how we perceive our own heart rate during digital experiences, like in virtual reality, and how these perceptions can be influenced or even mistaken. The findings could potentially shape more immersive digital experiences and therapies that respond to our bodily reactions."
        buttonText="View project"
        buttonLink=""
        placeholder={render1}
        srcSet={[render1, render1]}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Cardiac Interoception in Virtual Reality"
        description="Exploring how we perceive our own heart rate during digital experiences, like in virtual reality, and how these perceptions can be influenced or even mistaken. The findings could potentially shape more immersive digital experiences and therapies that respond to our bodily reactions."
        buttonText="View website"
        buttonLink=""
        placeholder={render2}
        srcSet={[render2, render2]}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Visual Artifact Generation Systems and Computational Creativity"
        description="Literature review on how AI models, from expert systems to deep learning, are changing the way we create digital visual art. It considers how we evaluate the 'creativity' of these AI systems, taking into account different aspects of what makes something truly creative."
        buttonText="View project"
        buttonLink=""
        placeholder={aiArt}
        srcSet={[aiArt, aiArt]}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
