'use client'
import globalStyles from '../../app/styles/global.module.css'
import { useState } from 'react';
import Image from 'next/image';
import Arrow from '../../../public/images/arrow.svg'
import ReactPlayer from 'react-player';

export default function AccordionItem({ heading, title, content, url }: any) {
    const [video, setVideo] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    if (url) {
        setVideo(true)
    }

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={!isOpen ? globalStyles.accordionItem : globalStyles.accordionItemOpen}>
            <button className={globalStyles.accordionButton} onClick={toggleAccordion}>
                {/* {heading === 'h2' ? <h2>{title}</h2> : <h3>{title}</h3>} */}
                <Image className={isOpen ? globalStyles.accordionArrowUp : globalStyles.accordionArrowDown} alt="" src={Arrow} />
            </button>
            <div className={globalStyles.accordionContent}>
                <p>{content}</p>
                {<ReactPlayer
                    // url={'https://vimeo.com/876337989'}
                    controls={true}
                    width="100%"
                    height="100%"
                />}
            </div>
        </div>
    );
};
