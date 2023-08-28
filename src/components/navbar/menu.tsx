'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './navbar.module.css';
import classNames from 'classnames';

export default function Menu({ children }: any) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (menuWrapperRef.current && !menuWrapperRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isMenuOpen]);

    return (
        <>
            <div ref={menuWrapperRef} className={classNames(styles.menuWrapper, isMenuOpen && styles.open)}>{children}</div>
            <button className={styles.menuButton} id='menu-button' onClick={toggleMenu}>
                <div className={classNames(styles.menuButtonLine)}></div>
                <div className={classNames(styles.menuButtonLine)}></div>
                <div className={classNames(styles.menuButtonLine)}></div>
            </button>
        </>
    );
}
