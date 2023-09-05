'use client'
import Link from "next/link"
import styles from './cookies.module.css'
import globalStyles from '../../app/styles/global.module.css'
import Image from "next/image"
import cookieSVG from "../../../public/svg/cookie.svg"
import classNames from 'classnames';
import { useState, useEffect } from "react"

export default function Cookies() {
    const [tag, setTag] = useState(false);
    const [modal, setModal] = useState(false);
    const [popUp, setPopUp] = useState(true);
    const [cookieData, setCookieData] = useState({
        strictlyNecessary: true,
        marketing: true,
        personalization: true,
        analytics: true,
    });

    const handleChange = (event: any) => {
        const { name, checked } = event.target;
        if (checked) {
            setCookieData((prevData) => ({ ...prevData, [name]: true }));
        } else {
            setCookieData((prevData) => ({ ...prevData, [name]: false }))
        }
    };

    const handleModalOpen = () => {
        setPopUp(false);
        setTag(false);
        setModal(true);
    }

    const handleModalClose = () => {
        setPopUp(false);
        setTag(true);
        setModal(false)
    }

    const handleCookies = () => {
        localStorage.setItem('acceptCookies', 'true');
        setCookieData({
            strictlyNecessary: true,
            marketing: true,
            personalization: true,
            analytics: true,
        })
        handleModalClose();
    }

    const handleCookiesForm = (event: any) => {
        event.preventDefault();
        handleCookies();
    }

    const handleModalCloseForm = (event: any) => {
        event.preventDefault();
        handleModalClose();
    }

    useEffect(() => {
        const hasAcceptedCookies = localStorage.getItem('acceptCookies');
        if (hasAcceptedCookies) {
            handleCookies();
        }
    }, []);

    return (
        <>
            {popUp && <div className={styles.popUp}>
                <button className={styles.close} onClick={handleModalClose}>
                    <div className={styles.closeLine1}></div>
                    <div className={styles.closeLine2}></div>
                </button>
                <div className={styles.popUpTop}>
                    <h2 className={styles.popUpTitle}>Cookie Settings</h2>
                    <p>By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage and assist in our marketing efforts. <Link href='/policies/cookies' target="_">More info</Link></p>
                </div>
                <div className={styles.popUpBottom}>
                    <button className={styles.button} onClick={handleCookies}>Accept All Cookies</button>
                    <button className={styles.clearButton} onClick={handleModalOpen}>Cookies Settings</button>
                </div>
            </div>}
            {tag && <button className={styles.tag} onClick={handleModalOpen}>
                <Image className={styles.cookieSVG} width="15" height="15" src={cookieSVG} alt="" />
                <span>Cookies Preferences</span>
            </button>}
            {modal && <div className={styles.modalWrapper}>
                <form className={styles.modal}>
                    <button className={styles.close} onClick={(event: any) => { handleModalCloseForm(event) }}>
                        <div className={styles.closeLine1}></div>
                        <div className={styles.closeLine2}></div>
                    </button>
                    <div className={styles.modalTop}>
                        <h2 className={styles.modalTitle}>Cookie Settings</h2>
                        <p>By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage and assist in our marketing efforts. <Link href='/policies/cookies' target="_">More info</Link></p>
                        <div className={globalStyles.checkboxWrapper}>
                            <input
                                className={globalStyles.checkbox}
                                type="checkbox"
                                id='strictly-necessary'
                                name='strictlyNecessary'
                                checked={cookieData.strictlyNecessary}
                                readOnly
                            ></input>
                            <label
                                className={globalStyles.checkboxText}
                                htmlFor='strictly-necessary'
                            >
                                <p><strong>Strictly Necessary (Always Active)</strong></p>
                                <p>Cookies required to enable basic website functionality.</p>
                            </label>
                        </div>
                        <div className={globalStyles.checkboxWrapper}>
                            <input
                                className={globalStyles.checkbox}
                                type="checkbox"
                                id='marketing'
                                name='marketing'
                                checked={cookieData.marketing}
                                onChange={handleChange}
                            ></input>
                            <label
                                className={globalStyles.checkboxText}
                                htmlFor='marketing'>
                                <p><strong>Marketing</strong></p>
                                <p>Cookies used to deliver advertising that is more relevant to you and your interests.</p>
                            </label>
                        </div>
                        <div className={globalStyles.checkboxWrapper}>
                            <input
                                className={globalStyles.checkbox}
                                type="checkbox"
                                id='personalization'
                                name='personalization'
                                checked={cookieData.personalization}
                                onChange={handleChange}
                            ></input>
                            <label
                                className={globalStyles.checkboxText}
                                htmlFor='personalization'>
                                <p><strong>Personalization</strong></p>
                                <p>Cookies allowing the website to remember choices you make (such as your user name, language, or the region you are in).</p>
                            </label>
                        </div>
                        <div className={globalStyles.checkboxWrapper}>
                            <input
                                className={globalStyles.checkbox}
                                type="checkbox"
                                id='analytics'
                                name='analytics'
                                checked={cookieData.analytics}
                                onChange={handleChange}
                            ></input>
                            <label
                                className={globalStyles.checkboxText}
                                htmlFor='analytics'>
                                <p><strong>Analytics</strong></p>
                                <p>Cookies helping understand how this website performs, how visitors interact with the site, and whether there may be technical issues.</p>
                            </label>
                        </div>
                    </div>
                    <div className={styles.modalBottom}>
                        <button className={styles.button} onClick={(event: any) => { handleCookiesForm(event) }}>Accept All Cookies</button>
                        <button className={styles.clearButton} onClick={(event: any) => { handleModalCloseForm(event) }}>Save Settings</button>
                    </div>
                </form>
            </div>}
        </>
    )
}
