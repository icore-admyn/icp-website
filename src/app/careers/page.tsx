import styles from './careers.module.css'
import globalStyles from '../styles/global.module.css'
import classNames from 'classnames';
import CTA from '../../components/cta/cta'
import FAQs from '../../components/faqs'
import dotenv from 'dotenv';
import Link from 'next/link';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

async function getData() {
  const res = await fetch(`${url}/api/careers?populate=deep`, { cache: cache })
  return res.json()
}

export default async function AboutUs() {
  const response = await getData()
  const data = response.data;
  console.log('data', response)

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
              <h1>Careers</h1>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section className={styles.careers}>
          <div className={globalStyles.container}>
            <div className={classNames(
              globalStyles.marginTop60,
              styles.jobWrapper
            )}>
              {data.map((job: any) => {
                return (
                  <div key={job.id} className={styles.job}>
                    <div className={styles.jobText}>
                      <p className={styles.whiteText}><strong>{job.attributes.title}</strong></p>
                      <p>{job.attributes.location}</p>
                    </div>
                    <button className={globalStyles.secondaryButton}><Link href='/contact-us'>Apply</Link></button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <CTA />
        <FAQs />
      </main>
    </>
  )
}
