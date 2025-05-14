import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "../pages/home/components/Sidebar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
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
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
