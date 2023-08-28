import styles from './page.module.css'
import getMenuData from '@/components/navbar/menuFetch'
import Link from 'next/link';
import classNames from 'classnames';

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode,
  params: any,
}) {
  console.log('params', params)
  const menuArray = await getMenuData()
  const resources = menuArray.find((item: any) => item.name === 'Resources');
  const slug = params.slug;
  return (
    <div className={styles.documentaionWrapper}>
      <aside className={styles.documentaionMenuWrapper}>
        <ul className={styles.documentaionMenu}>
          {resources.submenu.map((item: any) => {
            return (
              <li key={item.order}>
                <Link className={(`/resources/${slug}`===item.url) ? styles.active : ""} href={item.url}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </aside>
      {children}
    </div>
  )
}
