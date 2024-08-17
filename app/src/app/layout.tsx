"use client";
import { Inter } from 'next/font/google'
import styles from "./layout.module.scss";
import SideNav from '@/components/common/SideNav';
import { Provider } from 'react-redux';
import { store } from './store';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <Provider store={store}>
        <body className={`${inter.className} ${styles.application}`} >
              <SideNav />
                {children}
        </body>
      </Provider>
    </html>
  )
}
