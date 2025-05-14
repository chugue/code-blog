import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "../pages/home/components/Sidebar";
import styles from "./RootLayout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Huly Blog</title>
        <meta
          name="description"
          content="Huly Blog - Latest updates and insights"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={styles.container}>
        <main className={styles.mainContent}>{children}</main>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </>
  );
}
