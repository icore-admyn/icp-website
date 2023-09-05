import styles from './contact.module.css'
import globalStyles from '../styles/global.module.css'
import classNames from 'classnames';
import FAQs from '../../components/faqs/faqs'
import Link from 'next/link';
import dotenv from 'dotenv';
import Form from '@/components/contactForm/form';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

async function getData() {
  const res = await fetch(`${url}/api/contact-us?populate=deep`, { cache: cache })
  return res.json()
}

export default async function AboutUs() {
  const response = await getData()
  const data = response.data.attributes;

  return (
    <>
      <header>
        <section className={styles.header}>
          <div className={globalStyles.container}>
            <div className={styles.heroWrapper}>
              <h1>{data.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: data.description || '' }}
                className={classNames(
                  globalStyles.centerPage,
                )}>
              </div>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section className={styles.section}>
          <div className={globalStyles.container}>
            <div className={styles.cardWrapper}>
              {data.cards.map((card: any) => {
                return (
                  <div key={card.id} className={classNames(
                    styles.card,
                    globalStyles.alignCenter,
                  )}>
                    <h2>{card.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: card.description || "" }}></div>
                    <Link href='/' className={globalStyles.whiteLink}><strong>{card.email}</strong></Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        <section>
          <div className={classNames(
            globalStyles.flexContainer,
            globalStyles.alignMiddle,
            globalStyles.flexBetween,
            styles.flexMobile
          )}>
            <div className={classNames(
              globalStyles.width40,
              styles.width100Mobile
            )}>
              <h2>{data.formTitle}</h2>
              <div className={styles.contactInfo} dangerouslySetInnerHTML={{ __html: data.formDescription || "" }}></div>
              <div className={styles.contactInfo} dangerouslySetInnerHTML={{ __html: data.address || "" }}></div>
              <div dangerouslySetInnerHTML={{ __html: data.phone || '' }}></div>
            </div>
            <Form />
          </div>
        </section>
        <FAQs />
      </main>
    </>
  )
}
