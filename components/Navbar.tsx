import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { Search } from "@deemlol/next-icons";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={100} height={50} />
          </Link>
        </div>

        <button className={styles.menuButton}>
          <Image src="/icons/star.svg" alt="Star" width={24} height={24} />
        </button>

        <div className={styles.navLinks}>
          <Link href="/home">
            <span className={styles.navLink}>피드</span>
          </Link>
        </div>

        <div className={styles.navActions}>
          <Link href="/search">
            <Search />
          </Link>
        </div>
      </div>
    </nav>
  );
}
