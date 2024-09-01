"use client";
import { Inter } from 'next/font/google'
import styles from "./layout.module.scss";
import { Provider } from 'react-redux';
import { store } from './store';
import AuthWrapper from "@/components/common/AuthWrapper";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

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
                      <ToastContainer
                        autoClose={500}
                        hideProgressBar={false}
                        closeOnClick={false}
                        pauseOnHover={false}
                        draggable={false}
                      />
                  </AuthWrapper>
            </body>
      </Provider>
    </html>
  )
}
