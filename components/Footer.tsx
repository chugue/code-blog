import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.socialLinks}>
          <Link href="#">
            <span className={styles.socialIcon}>
              <Image
                src="/icons/twitter.svg"
                alt="Twitter"
                width={20}
                height={20}
              />
            </span>
          </Link>
          <Link href="#">
            <span className={styles.socialIcon}>
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={20}
                height={20}
              />
            </span>
          </Link>
          <Link href="#">
            <span className={styles.socialIcon}>
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </span>
          </Link>
        </div>

        <div className={styles.copyright}>
          <div className={styles.links}>
            <Link href="/terms">
              <span>Terms of Service</span>
            </Link>
            <Link href="/privacy">
              <span>Privacy Policy</span>
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Code Factory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
