import Image from 'next/image'
import styles from './cta.module.css'
import classNames from 'classnames';
import globalStyles from '../../app/styles/global.module.css'
import Link from 'next/link';

export default function CTA() {
    return (
        <section className={styles.section}>
            <div className={globalStyles.container}>
                <div className={classNames(
                    globalStyles.width400,
                    globalStyles.alignCenter,
                    globalStyles.centerPage
                )}>
                    <h2>Join The <span className={globalStyles.blueText}>Revolution!</span></h2>
                    <p>Gain access to a trusted network using preparatory technology to grow your business.</p>
                </div>
                <div className={classNames(
                    globalStyles.marginTop60,
                    styles.grid
                )} >
                    <div className={classNames(
                        globalStyles.card,
                        styles.card
                    )}>
                        <h3>PSP</h3>
                        <p>Are you a payment provider who wants to be apart of a new global network?</p>
                        <button className={classNames(
                            globalStyles.button,
                            globalStyles.secondaryButton,
                            globalStyles.marginTop20,
                            globalStyles.marginBottom20
                        )}><Link href="/request-a-demo">Request a Demo</Link></button>
                    </div>
                    <div className={classNames(
                        globalStyles.card,
                        styles.card
                    )}>
                        <h3>Merchant</h3>
                        <p>Are you an operator looking to increase conversion rates and reduce overheads?</p>
                        <button className={classNames(
                            globalStyles.button,
                            globalStyles.marginTop20,
                            globalStyles.marginBottom20
                        )}><Link href="/request-a-demo">Request a Demo</Link></button>
                    </div>
                    <div className={classNames(
                        globalStyles.card,
                        styles.card
                    )}>
                        <h3>Partner</h3>
                        <p>Are you an affiliate that can leverage your network to introduce trusted partners?</p>
                        <button className={classNames(
                            globalStyles.button,
                            globalStyles.secondaryButton,
                            globalStyles.marginTop20,
                            globalStyles.marginBottom20
                        )}><Link href="/request-a-demo">Request a Demo</Link></button>
                    </div>
                </div>
            </div>
        </section >
    )
}
