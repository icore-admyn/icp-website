'use client'
import globalStyles from '../../app/styles/global.module.css'
import { useState } from 'react';
import Image from 'next/image';
import Arrow from '../../../public/images/arrow.svg'

export default function AccordionItem ({ title, content }: any) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={!isOpen ? globalStyles.accordionItem : globalStyles.accordionItemOpen}>
            <button className={globalStyles.accordionButton} onClick={toggleAccordion}>
                <h2>{title}</h2>
                <Image className={isOpen ? globalStyles.accordionArrowUp :  globalStyles.accordionArrowDown} alt="" src={Arrow} />
            </button>
            <div className={globalStyles.accordionContent}>
                <p>{content}</p>
            </div>
        </div>
    );
};
