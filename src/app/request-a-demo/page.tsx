import styles from './contact.module.css'
import globalStyles from '../styles/global.module.css'
import Form from '@/components/contactForm/form';
import dotenv from 'dotenv';
dotenv.config();

export default async function AboutUs() {

  return (
    <>
      <header>
        <section className={styles.header}>
          <div className={globalStyles.container}>
            <div className={styles.heroWrapper}>
              <h1>Request a Demo</h1>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section className={styles.section}>
          <div className={globalStyles.container}>
            <div className={styles.form}>
              <Form />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
