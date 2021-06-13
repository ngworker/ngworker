import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

const features = [
  {
    title: 'Flexible when you need it',
    imageUrl: 'img/vectorjuice-flexible.jpg',
    description: (
      <>
        Spectacular's test harnesses runs your Angular feature in an environment
        as as reasonably close to a real Angular application as possible. You
        can easily add custom Angular module imports and providers to replace
        dependencies when needed.
      </>
    ),
  },
  {
    title: 'Specialized test harnesses',
    imageUrl: 'img/vectorjuice-specialized.png',
    description: (
      <>
        Spectacular reduces boilerplate by taking care of setup and
        configuration of the Angular testing module. Every test harness focuses
        on testing a specific part of Angular applications and libraries.
      </>
    ),
  },
  {
    title: 'Faster than end-to-end tests',
    imageUrl: 'img/vectorjuice-fast.jpg',
    description: (
      <>
        Test parts of your Angular project without spinning up an entire
        application. Spectacular uses Angular's testbed under the hood which is
        continuously getting faster as new versions are released. Compiled
        classes are cached by Angular between test cases.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={'Spectacular by ngworkers'}
      description="Spectacular Angular integration testing. Flexible when you need it. Specialized test harnesses. Faster than end-to-end tests."
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/')}
            >
              Get started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
