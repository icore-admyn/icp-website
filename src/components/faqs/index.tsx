/* eslint-disable react/no-unescaped-entities */
import globalStyles from '../../app/styles/global.module.css'
import classNames from 'classnames';
import AccordionItem from './accordion';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

async function getData() {
    const res = await fetch(`${url}/api/faqs?populate=deep`, { cache: cache })
    return res.json()
}

export default async function faqs({ heading }: any) {
    const headingType = heading || 'h3'
    const response = await getData()
    const data = response.data;

    return (
        <section className={classNames(
            headingType === 'h2' && globalStyles.paddingTop40
        )}>
            <div className={globalStyles.container}>
                {headingType === 'h3' &&
                    <div className={classNames(
                        globalStyles.width400,
                        globalStyles.alignCenter,
                        globalStyles.centerPage
                    )}>
                        <h2>FAQ's</h2>
                    </div>
                }
                <div className={classNames(globalStyles.accordion,
                    headingType === 'h3' && globalStyles.marginTop60
                )}>
                    {data.map((item: { attributes: any; id: any; }): any => {
                        const accordionData = item.attributes;
                        return (
                            <AccordionItem
                                key={item.id}
                                heading={headingType}
                                title={accordionData.question}
                                content={accordionData.response}
                                url={accordionData.video}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}