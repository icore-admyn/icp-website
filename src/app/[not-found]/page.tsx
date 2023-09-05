import classNames from 'classnames';
import globalStyles from '../styles/global.module.css'

export default function notFound() {
    return (
        <section>
            <div className={classNames(
                globalStyles.container,
                globalStyles.alignCenter
            )}>
                <h1>404</h1>
                <p>Not Found</p>
            </div>
        </section>
    )
}