"use client";
import { Inter } from 'next/font/google'
import styles from "./layout.module.scss";
import { Provider } from 'react-redux';
import { store } from './store';
import AuthWrapper from "@/components/common/AuthWrapper";

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
                  <AuthWrapper>
                      {children}
                  </AuthWrapper>
            </body>
      </Provider>
    </html>
  )
}
