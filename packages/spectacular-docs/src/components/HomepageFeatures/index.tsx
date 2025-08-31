import VectorjuiceFastImageUrl from '@site/static/img/vectorjuice-fast.jpg';
import VectorjuiceFlexibleImageUrl from '@site/static/img/vectorjuice-flexible.jpg';
import VectorjuiceSpecializedImageUrl from '@site/static/img/vectorjuice-specialized.png';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  readonly title: string;
  readonly imageUrl: string;
  readonly description: ReactNode;
};

const FeatureList: readonly FeatureItem[] = [
  {
    title: 'Flexible when you need it',
    imageUrl: VectorjuiceFlexibleImageUrl,
    description: (
      <>
        Spectacular's test harnesses run your Angular feature in an environment
        as reasonably close to a real Angular application as possible. You can
        easily add custom Angular module imports and providers to replace
        dependencies when needed.
      </>
    ),
  },
  {
    title: 'Specialized test harnesses',
    imageUrl: VectorjuiceSpecializedImageUrl,
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
    imageUrl: VectorjuiceFastImageUrl,
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

function Feature({ title, imageUrl, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureImage} src={imageUrl} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
