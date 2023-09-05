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
    <>
      {children}
    </>
  )
}
