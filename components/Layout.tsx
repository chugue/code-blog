import Head from "next/head"
import Navbar from "./Navbar"
import Footer from "./Footer"
import styles from "../styles/Layout.module.css"
import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Huly Blog</title>
        <meta name="description" content="Huly Blog - Latest updates and insights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  )
}
