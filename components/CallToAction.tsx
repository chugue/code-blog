import Link from "next/link";
import Image from "next/image";
import styles from "../styles/CallToAction.module.css";

export default function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>커뮤니티에서 함께해요!</h2>
        <p className={styles.ctaDescription}>
          자신의 생각을 공유하고 다른 개발자들과 소통하며, <br /> 다 같이
          성장하는 가치를 함께 누려요!
        </p>
        <div className={styles.ctaButtons}>
          <Link href="https://open.kakao.com/o/gg2S2GBc">
            <button className={styles.primaryButton}>오픈 채팅 참여</button>
          </Link>
          <Link href="https://discord.gg/8dSQg3sd">
            <button className={styles.secondaryButton}>디스코드 채널</button>
          </Link>
        </div>
      </div>
      <div className={styles.ctaImage}>
        <Image
          src="/images/cta-background.png"
          alt="Join Huly"
          width={300}
          height={300}
          className={styles.ctaImage}
        />
      </div>
    </section>
  );
}
