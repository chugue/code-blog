import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { Search, Sun, Moon } from "@deemlol/next-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo.png";

  const searchButton = (
    <Link href="/search" style={{ marginRight: "10px" }}>
      <Search />
    </Link>
  );

  const themeToggleButton = (
    <button onClick={toggleTheme} className={styles.themeButton}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link href="/">
            <Image src={logoSrc} alt="Logo" width={100} height={50} />
          </Link>
        </div>

        <button className={styles.menuButton}>
          <Image src="/icons/star.svg" alt="Star" width={24} height={24} />
        </button>

        <div className={styles.navLinks}>
          <Link href="/recommend">
            <span className={styles.navLink}>추천 컨텐츠</span>
          </Link>
        </div>

        <div className={styles.navActions}>
          {searchButton}
          {themeToggleButton}
        </div>
      </div>
    </nav>
  );
}
