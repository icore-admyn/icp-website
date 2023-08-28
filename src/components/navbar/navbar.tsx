import Logo from '../../../public/svg/icorepaylogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '../../../public/images/arrow.svg';
import styles from './navbar.module.css'
import globalStyles from '../../app/styles/global.module.css';
import classNames from 'classnames';
import getMenuData from './menuFetch';
import { useState } from 'react';
import Menu from './menu';

export default async function Navbar() {
    const navArray = await getMenuData()

    return (
        <nav className={styles.navWrapper}>
            <div className={styles.container}>
                <div className={styles.nav}>
                    <Link className={styles.logoWrapper} href='/'>
                        <Image
                            src={Logo}
                            alt="iCore Logo"
                            width={150}
                            height={19}
                            priority
                        />
                    </Link>
                    <Menu>
                        <ul id='main-menu' className={styles.menu}>
                            {navArray.map((menuItem: any, index: any) => (
                                !menuItem.isButton &&
                                <li key={index}>
                                    <div>{menuItem.name} <Image className={styles.arrow} alt="" src={Arrow} /></div>
                                    <ul>
                                        {menuItem.submenu.map((subMenuItem: any, subIndex: any) => (
                                            <li key={subIndex}>
                                                <Link href={subMenuItem.url} target={subMenuItem.target}>
                                                    {subMenuItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </Menu>
                    <div className={styles.ctaWrapper}>
                        <button className={classNames(globalStyles.button, globalStyles.secondaryButton, styles.secondaryButton)}><Link href="https://dashboard.bux.digital/" target='_'>BUX Dashboard</Link></button>
                        <button className={classNames(globalStyles.button, styles.primaryButton)}><Link href="/request-a-demo">Request a Demo</Link></button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
