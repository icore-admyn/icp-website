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
        <div>
            <header>
                <section className={styles.heroSection}>
                    <div className={classNames(
                        globalStyles.container,
                        globalStyles.alignCenter,
                        styles.container
                    )}>
                        <h1>{text.title}</h1>
                    </div>

                </section>
            </header>
            <main>
                <article>
                    <section className={styles.section}>
                        <div className={classNames(
                            globalStyles.container,
                            styles.container
                        )}>
                            <div dangerouslySetInnerHTML={{ __html: text.body || null }}></div>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    )
}