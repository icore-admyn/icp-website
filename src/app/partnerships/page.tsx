import styles from '../page.module.css'
import globalStyles from '../styles/global.module.css'
import classNames from 'classnames';
import text from '../homepage.json'
import Image from 'next/image';
import CTA from '../../components/cta/cta'
import FAQs from '../../components/faqs'

export default function AboutUs() {
  return (
    <>
      <header>
        <section>
          <div className={globalStyles.container}>
          </div>
        </section>
      </header>
      <main>
        <section>
        </section>
        <CTA />
        <FAQs />
      </main>
    </>
  )
}
