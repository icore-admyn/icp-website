import 'prismjs/themes/prism.css';
import styles from './page.module.css'
import { use } from 'react'
import classNames from 'classnames';
import globalStyles from '../../styles/global.module.css'
import getResource from './render';
import Link from 'next/link';

export default function ResourceRoute({ params }: any) {
    const resource = use(getResource(params.slug))
    if (resource.error) {
        const error = resource.error
        return (
            <section>
                <div className={classNames(
                    globalStyles.container,
                    globalStyles.alignCenter
                )}>
                    <h1>{error.status}</h1>
                    <div dangerouslySetInnerHTML={{ __html: error.message }}></div>
                </div>
            </section>
        )
    }

    const text = resource.data.attributes
    return (
        <div className={styles.documentaion}>
            <aside className={styles.subMenuWrapper}>
                <p><strong>Contents Table:</strong></p>
                <ul className={styles.subMenu}>
                    {text.sections.map((section: any) => {
                        return (
                            <li key={section.id}><Link href={'#' + section.title}>{section.title}</Link></li>
                        )
                    })}
                </ul>
            </aside>
            <div className={styles.documentaionContent}>
                <header>
                    <section className={styles.heroSection}>
                        <div className={classNames(
                            globalStyles.container,
                            styles.container
                        )}>
                            <h1>{text.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: text.description }}></div>
                        </div>

                    </section>
                </header>
                <main>
                    <article>
                        {text.sections.map((section: any) => {
                            return (
                                <section key={section.id} className={styles.section} id={section.title}>
                                    <div className={classNames(
                                        globalStyles.container,
                                        styles.container
                                    )}>
                                        <h2 className={styles.title}>{section.title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: section.body }}></div>
                                    </div>
                                </section>
                            )
                        })}
                    </article>
                </main>
            </div>
        </div>
    )
}