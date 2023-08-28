/* eslint-disable react/no-unescaped-entities */
import styles from './faqs.module.css'
import globalStyles from '../styles/global.module.css'
import classNames from 'classnames';
import CTA from '../../components/cta/cta'
import AccordionItem from '../../components/faqs/accordionH2'
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

async function getData() {
  const res = await fetch(`${url}/api/faqs?populate=deep`, { cache: cache })
  return res.json()
}

export default async function AboutUs() {
  const response = await getData()
  const data = response.data;

  return (
    <>
      <header>
        <section className={styles.section}>
          <div className={globalStyles.container}>
            <div className={classNames(
              globalStyles.width400,
              globalStyles.alignCenter,
              globalStyles.centerPage
            )}>
              <h1>FAQ's</h1>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section className={styles.faqs}>
          <div className={globalStyles.container}>
            <div className={classNames(
              globalStyles.accordion,
              globalStyles.marginTop60
            )}>
              {data.map((item: { attributes: any; id: any; }): any => {
                const accordionData = item.attributes;
                return (
                  <div key={item.id} className={styles.accordion}>
                    <AccordionItem title={accordionData.question} content={accordionData.response} />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <CTA />
      </main>
    </>
  )
}
