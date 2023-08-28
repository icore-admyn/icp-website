import styles from './contact.module.css'
import globalStyles from '../styles/global.module.css'
import classNames from 'classnames';
import FAQs from '../../components/faqs/faqs'
import Link from 'next/link';
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
            <form className={classNames(globalStyles.card, styles.form)}>
              <div className={styles.formWrapper}>
                <div className={globalStyles.inputWrapper}>
                  <label htmlFor="first-name">First Name:<span className={globalStyles.redText}>*</span></label>
                  <input id='first-name' type='text' required></input>
                </div>
                <div className={globalStyles.inputWrapper}>
                  <label htmlFor="last-name">Last Name:<span className={globalStyles.redText}>*</span></label>
                  <input id='last-name' type='text' required></input>
                </div>
                <div className={globalStyles.inputWrapper}>
                  <label htmlFor="name">Email:<span className={globalStyles.redText}>*</span></label>
                  <input id='email' type='email' required></input>
                </div>
                <div className={globalStyles.inputWrapper}>
                  <label htmlFor="name">Phone:</label>
                  <input id='phone' type='phone'></input>
                </div>
                <div className={globalStyles.inputWrapper}>
                  <label htmlFor="company">Company:<span className={globalStyles.redText}>*</span></label>
                  <input id='company' type='text' required></input>
                </div>
                <div className={globalStyles.inputWrapper}>
                  <label htmlFor="role">Role:<span className={globalStyles.redText}>*</span></label>
                  <input id='role' type='text' required></input>
                </div>
                <div className={classNames(
                  globalStyles.inputWrapper,
                  globalStyles.areaWrapper
                )}>
                  <label htmlFor="message">Message:<span className={globalStyles.redText}>*</span></label>
                  <textarea id='message' required></textarea>
                </div>
                <button className={globalStyles.formButton} type='submit'>Send Message</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
