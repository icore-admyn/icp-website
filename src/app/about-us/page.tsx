import styles from './about.module.css'
import globalStyles from '../styles/global.module.css'
import classNames from 'classnames';
import Image from 'next/image';
import CTA from '../../components/cta/cta'
import FAQs from '../../components/faqs'
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL;
const cache: any = process.env.CACHE;

async function getData() {
  const res = await fetch(`${url}/api/about-us?populate=deep`, { cache: cache });
  return res.json();
}

export default async function AboutUs() {
  const response = await getData();
  const data = response.data;
  const attributes = data.attributes;
  const hero = attributes.hero;
  const cards = attributes.cards;

  return (
    <>
      <header>
        <section>
          <div className={globalStyles.container}>
            <div className={styles.heroWrapper}>
              <h1>{hero.title}<span className={globalStyles.blueText}>{hero.titleBlue}</span></h1>
              <div
                dangerouslySetInnerHTML={{ __html: hero.description }}
                className={classNames(
                  globalStyles.centerPage,
                )}>
              </div>
              <div className={classNames(globalStyles.buttonWrapper, globalStyles.alignCenter)}>
                {hero.buttons.length > 0 && hero.buttons.map((button: any) => {
                  return (
                    <button
                      key={button.id}
                      className={
                        classNames(
                          globalStyles.button,
                          button.isPrimary ? null : globalStyles.secondaryButton,
                          globalStyles.marginTop40
                        )
                      }
                    >
                      <a href={button.link}>{button.text}</a>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section>
          <div className={classNames(
            globalStyles.container,
            styles.cardContainer
          )}>
            {cards.map((card: any, index: number) => {
              const isEvenIndex = index % 2 === 0;
              const cardClassNames = classNames(
                globalStyles.card,
                !isEvenIndex ? styles.cardLeft : styles.cardRight,
                styles.card
              );

              return (
                <div
                  key={card.id}
                  className={cardClassNames}
                >
                  <h2>{card.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: card.description }}></div>
                </div>
              );
            })}
          </div>
        </section>
        <CTA />
        <FAQs />
      </main>
    </>
  )
}
