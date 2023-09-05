import Logo from '../../../public/svg/icorepaylogo.svg'
import Image from 'next/image'
import styles from './footer.module.css'
import globalStyles from '../../app/styles/global.module.css'
import getMenuData from '../navbar/menuFetch'
import Link from 'next/link'
import { getContactDetails, getPolicyMenu } from './getData'

export default async function Footer() {
    const footerArray = await getMenuData();
    const policyArray = await getPolicyMenu();
    const contactRes = await getContactDetails();

    return (
        <footer>
            <div className={globalStyles.container}>
                <div className={styles.top}>
                    <div>
                        <div>
                            <Image
                                src={Logo}
                                alt="iCore Logo"
                                width={150}
                                height={19}
                                priority
                            />
                        </div>
                        <div className={styles.contactInfo} dangerouslySetInnerHTML={{ __html: contactRes.address || '' }}></div>
                        <div dangerouslySetInnerHTML={{ __html: contactRes.phone || '' }}></div>
                    </div>
                    <div className={styles.menuWrapper}>
                        {footerArray.map((menuItem: any, index: any) => {
                            return (
                                !menuItem.isButton &&
                                <div className={styles.menu} key={index}>
                                    <p><strong>{menuItem.name}</strong></p>
                                    <ul>
                                        {menuItem.submenu.map((subMenuItem: any, subIndex: any) => (
                                            <li key={subIndex}>
                                                <Link href={subMenuItem.url} target={subMenuItem.target}>
                                                    {subMenuItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                        <div className={styles.menu}>
                            <p><strong>Policies</strong></p>
                            <ul>
                                {policyArray.map((policy: any, index: any) => {
                                    return (
                                        <li key={index}>
                                            <Link href={policy.attributes?.url} target={policy.attributes?.target}>
                                                    {policy.attributes?.title}
                                                </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    © 2023 iCore Digital LTD. All rights reserved.<br /><br />
                </div>
            </div>
        </footer>
    )
}