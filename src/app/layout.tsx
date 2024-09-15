"use client";
import { Inter } from 'next/font/google'
import styles from "./layout.module.scss";
import { Provider } from 'react-redux';
import { store } from './store';
import AuthWrapper from "@/components/common/AuthWrapper";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
                        stacked={true}
                        autoClose={500}
                        hideProgressBar={false}
                        closeOnClick={true}
                        pauseOnHover={false}
                        draggable={false}
                        position={"top-right"}
                      />
                  </AuthWrapper>
            </body>
      </Provider>
    </html>
  )
}
