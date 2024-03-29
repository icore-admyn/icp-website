import styles from './page.module.css'
import globalStyles from './styles/global.module.css'
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import admynScreenshot from '../../public/images/Admyn-Screenshot.png'
import checkoutScreenshot from '../../public/images/Checkout.png'
import CTA from '../components/cta/cta'
import FAQs from '../components/faqs'
import Head from 'next/head';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE

async function getData() {
  const res = await fetch(`${url}/api/homepage?populate=deep`, { cache: cache })
  return res.json()
}

export default async function Home() {
  const response = await getData()
  const data = response.data;
  const attributes = data.attributes;
  const hero = attributes.hero;
  const desktop = attributes.images?.desktop?.data?.attributes;
  const mobile = attributes.images?.mobile?.data?.attributes;
  const paymentMethods = attributes.paymentMethods?.paymentMethod;
  const section1 = attributes.section1;
  const section2 = attributes.section2;

  console.log(desktop, mobile)

  return (
    <>
    <Head>
      <title>iCore Pay | Instant & Secure Permissionless Payments</title>
    </Head>
      <header>
        <section>
          <div className={globalStyles.container}>
            <div className={styles.heroWrapper}>
              <h1>{hero?.title}<span className={globalStyles.blueText}>{hero?.titleBlue}</span></h1>
              <div dangerouslySetInnerHTML={{ __html: hero?.description || '' }} className={classNames(
                globalStyles.centerPage,
              )}>
              </div>
              <div className={classNames(globalStyles.buttonWrapper, globalStyles.alignCenter)}>
                {hero?.buttons.length > 0 && hero?.buttons.map((button: any) => {
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
                      <Link href={button.url}>{button.text}</Link>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.admynScreenshot}
                  alt={desktop.alternativeText}
                  src={desktop.url}
                  width='1000'
                  height='565'
                />
                <Image
                  className={styles.checkoutScreenshot}
                  alt={mobile.alternativeText}
                  src={mobile.formats.medium.url}
                  width='371'
                  height='750'
                />
              </div>
            </div>

            <div className={styles.logoWrapper}>
              <div className={styles.logoContainer}>
                {paymentMethods.map((payMeth: any) => {
                  const logo = payMeth.logo?.data?.attributes;
                  const width = 100
                  const height = 50

                  return (
                    <div key={payMeth.id} className={styles.pspLogoWrapper}>
                      <Image width={width} height={height} className={styles.pspLogo} alt={payMeth.title + " Logo"} src={logo.url} />
                      {payMeth.comingSoon && <span className={styles.comingSoon}>Coming Soon</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </header>
      <main className={styles.main}>
        {section1 && <section>
          <div className={classNames(
            globalStyles.flexContainer,
            globalStyles.alignTop,
            globalStyles.spaceBetween,
            styles.columnMobile
          )}>
            <div className={classNames(
              globalStyles.width40,
              globalStyles.sticky,
              styles.stickyTop,
              styles.width100Mobile
            )}>
              <h2>{section1?.title}<span className={globalStyles.blueText}>{section1?.titleBlue}</span></h2>
              <div dangerouslySetInnerHTML={{ __html: section1?.description || '' }}></div>
            </div>
            <div className={classNames(
              globalStyles.width40,
              styles.width100Mobile
            )}>
              <div className={globalStyles.cardColumn}>
                {section1?.cards.map((card: any) => {
                  return (
                    <div key={card.id} className={classNames(
                      globalStyles.card,
                    )}>
                      <h3>{card.title}</h3>
                      <div dangerouslySetInnerHTML={{ __html: card.description || '' }}></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>}
        {section2 && <section>
          <div className={classNames(
            globalStyles.container,
            globalStyles.alignTop,
          )}>
            <div className={classNames(
              globalStyles.width800,
              globalStyles.marginBottom80,
              globalStyles.alignCenter,
              globalStyles.centerPage,
              styles.alignLeftMobile
            )}>
              <h2>{section2?.title}<span className={globalStyles.blueText}>{section2?.titleBlue}</span></h2>
              <div dangerouslySetInnerHTML={{ __html: section2?.description || '' }}></div>
            </div>
            <div className={classNames(
              styles.grid,
              globalStyles.marginTop60
            )}>
              {section2?.usps.map((usp: any) => {
                const width = 35;
                const height = 35;
                const icon = usp.icon?.data?.attributes;
                console.log(usp.icon.data)

                return (
                  <div key={usp.id} >
                    {icon && <Image src={icon.url} alt={icon.alternativeText} width={width} height={height}></Image>}
                    <h3>{usp.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: usp.description || '' }}></div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>}
        <CTA />
        <FAQs />
      </main >
    </>
  )
}
