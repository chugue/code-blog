import React, { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "../pages/home/components/Sidebar";
import styles from "./RootLayout.module.css";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const router = useRouter();
  const isSearchPage = router.pathname === "/search";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <main
          className={`${styles.mainContent} ${
            isSearchPage || isMobile ? styles.fullWidth : ""
          }`}
        >
          {children}
        </main>
        {!isSearchPage && !isMobile && (
          <div className={styles.sidebarContainer}>
            <Sidebar />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
