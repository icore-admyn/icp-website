/* eslint-disable react/no-unescaped-entities */
import globalStyles from '../../app/styles/global.module.css'
import classNames from 'classnames';
import AccordionItem from './accordionH3';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.BASE_URL
const cache: any = process.env.CACHE;

async function getData() {
    const res = await fetch(`${url}/api/faqs?populate=deep`, { cache: cache })
    return res.json()
}

export default async function faqs() {
    const response = await getData()
    const data = response.data;
    
    return (
        <section>
            <div className={globalStyles.container}>
                <div className={classNames(
                    globalStyles.width400,
                    globalStyles.alignCenter,
                    globalStyles.centerPage
                )}>
                    <h2>FAQ's</h2>
                </div>
                <div className={classNames(globalStyles.accordion,
                    globalStyles.marginTop60
                )}>
                    {data.map((item: { attributes: any; id: any; }) :any => {
                        const accordionData = item.attributes;
                        return (
                            <AccordionItem key={item.id} title={accordionData.question} content={accordionData.response} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}