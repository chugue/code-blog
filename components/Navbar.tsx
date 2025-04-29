"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={50} />
          </Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image src="/icons/star.svg" alt="Star" width={24} height={24} />
        </button>

        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}
        >
          <Link href="/home">
            <span className={styles.navLink}>피드</span>
          </Link>
          <Link href="/feed">
            <span className={styles.navLink}>내 글 보기</span>
          </Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/login">
            <button className={styles.starButton}>
              <Image
                src="/icons/login.svg"
                alt="login"
                width={16}
                height={16}
              />
              로그인
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
