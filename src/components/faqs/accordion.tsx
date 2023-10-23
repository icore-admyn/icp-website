'use client'
import globalStyles from '../../app/styles/global.module.css'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Arrow from '../../../public/images/arrow.svg'
import ReactPlayer from 'react-player';

export default function AccordionItem({ heading, title, content, url }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const isVideo = url !== null
    console.log(isVideo)

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={!isOpen ? globalStyles.accordionItem : globalStyles.accordionItemOpen}>
            <button className={globalStyles.accordionButton} onClick={toggleAccordion}>
                {heading === 'h2' ? <h2>{title}</h2> : <h3>{title}</h3>}
                <Image className={isOpen ? globalStyles.accordionArrowUp : globalStyles.accordionArrowDown} alt="" src={Arrow} />
            </button>
            <div className={globalStyles.accordionContent}>
                <p>{content}</p>
                {
                isVideo &&
                    <iframe
                        src={url}
                        width='100%'
                        height='300px'
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                }
            </div>
        </div>
    );
};
