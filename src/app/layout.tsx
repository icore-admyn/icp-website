import './styles/styles.css'
import type { Metadata } from 'next'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
