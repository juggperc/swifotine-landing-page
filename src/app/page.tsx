"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DownloadButton } from "@/components/DownloadButton";
import { acknowledgements, minimumOS, screenshots } from "@/lib/swifotine";
import styles from "./page.module.css";

type ThemeMode = "dark" | "light";

const conciseFeatures = [
  {
    title: "Fast Discovery",
    detail:
      "Bounded global search with ranking that prioritizes real quality signals, not noise.",
  },
  {
    title: "Reliable Downloads",
    detail:
      "Transfer persistence and source failover keep long sessions from breaking mid-queue.",
  },
  {
    title: "Native Playback",
    detail:
      "Library, playlists, queue, and mini-player controls in one focused macOS workflow.",
  },
];

export default function HomePage() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme = window.localStorage.getItem("swifotine-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    window.localStorage.setItem("swifotine-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <main className={`${styles.page} ${theme === "dark" ? styles.dark : styles.light}`}>
      <div className={styles.skyGlow} />
      <div className={styles.sun} />
      <div className={styles.mountains} />
      <div className={styles.ground} />

      <header className={styles.header}>
        <a className={styles.brand} href="#top">
          <Image
            alt="Swifotine app icon"
            className={styles.brandIcon}
            height={48}
            priority
            src="/brand/swifotine-app-icon.png"
            width={48}
          />
          <div>
            <strong>Swifotine</strong>
            <span>Native macOS Soulseek client</span>
          </div>
        </a>

        <nav aria-label="Main" className={styles.nav}>
          <a href="https://github.com/juggperc/swifotine" rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href="https://github.com/juggperc/swifotine/releases/tag/arm" rel="noreferrer" target="_blank">
            Release Notes
          </a>
          <button
            aria-label={`Switch to ${nextTheme} mode`}
            className={styles.themeToggle}
            onClick={() => setTheme(nextTheme)}
            type="button"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </nav>
      </header>

      <section className={styles.hero} id="top">
        <p className={styles.eyebrow}>Swifotine for macOS</p>
        <h1>Any song in the world, for free</h1>
        <p className={styles.heroCopy}>
          Search, download, and play from one native app. No tab maze, no web wrappers, just a clean desktop flow.
        </p>

        <div className={styles.heroActions}>
          <DownloadButton className={styles.heroCta} tone={theme === "dark" ? "dark" : "light"} />
          <p>{minimumOS}</p>
        </div>
      </section>

      <section className={styles.featureGrid}>
        {conciseFeatures.map((feature, index) => (
          <article className={styles.featureCard} key={feature.title} style={{ animationDelay: `${index * 110}ms` }}>
            <h2>{feature.title}</h2>
            <p>{feature.detail}</p>
          </article>
        ))}
      </section>

      <section className={styles.showcase}>
        <figure className={styles.primaryShot}>
          <Image alt={screenshots[1].alt} fill priority sizes="(max-width: 980px) 100vw, 74vw" src={screenshots[1].src} />
          <figcaption>{screenshots[1].caption}</figcaption>
        </figure>

        <div className={styles.thumbRow}>
          <figure className={styles.thumbShot}>
            <Image alt={screenshots[0].alt} fill sizes="(max-width: 980px) 100vw, 37vw" src={screenshots[0].src} />
          </figure>
          <figure className={styles.thumbShot}>
            <Image alt={screenshots[2].alt} fill sizes="(max-width: 980px) 100vw, 37vw" src={screenshots[2].src} />
          </figure>
        </div>
      </section>

      <section className={styles.acknowledgements}>
        <h2>Acknowledgements</h2>
        <p>Built with original open-source work and platform frameworks:</p>
        <div className={styles.ackItems}>
          {acknowledgements.map((item) => (
            <a className={styles.ackChip} href={item.link} key={item.title} rel="noreferrer" target="_blank">
              <strong>{item.title}</strong>
              <span>{item.license}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
