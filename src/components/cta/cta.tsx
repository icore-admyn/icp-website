import Image from 'next/image'
import styles from './cta.module.css'
import classNames from 'classnames';
import globalStyles from '../../app/styles/global.module.css'
import Link from 'next/link';
import getCTA from './ctaData';

export default async function CTA() {
    const ctaData = await getCTA();
    const title = ctaData.title;
    const titleBlue = ctaData.titleBlue;
    const description = ctaData.description;
    const cards = ctaData.ctas;

    return (
        <section className={styles.section}>
            <div className={globalStyles.container}>
                <div className={classNames(
                    globalStyles.width400,
                    globalStyles.alignCenter,
                    globalStyles.centerPage
                )}>
                    <h2>{title}<span className={globalStyles.blueText}>{titleBlue}</span></h2>
                    <div dangerouslySetInnerHTML={{ __html: description || '' }}></div>
                </div>
                <div className={classNames(
                    globalStyles.marginTop60,
                    styles.grid
                )} >
                    {cards.map((card: any) => {
                        return (
                            <div key={card.id} className={classNames(
                                globalStyles.card,
                                styles.card
                            )}>
                                <h3>{card.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: card.description || '' }}></div>
                                {card.url && <button className={classNames(
                                    globalStyles.button,
                                    !card.isPrimary && globalStyles.secondaryButton,
                                    globalStyles.marginTop20,
                                    globalStyles.marginBottom20
                                )}>
                                    <Link href={card.url}>
                                        {card.buttonText}
                                    </Link>
                                </button>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section >
    )
}
