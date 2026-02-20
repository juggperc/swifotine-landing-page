"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AussieFlagRig } from "@/components/AussieFlagRig";
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

function getBooleanStorageValue(key: string, fallback = false) {
  if (typeof window === "undefined") {
    return fallback;
  }

  return window.localStorage.getItem(key) === "true";
}

export default function HomePage() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const savedTheme = window.localStorage.getItem("swifotine-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [highContrast, setHighContrast] = useState<boolean>(() =>
    getBooleanStorageValue("swifotine-high-contrast"),
  );
  const [readableMode, setReadableMode] = useState<boolean>(() =>
    getBooleanStorageValue("swifotine-readable-mode"),
  );
  const [reduceMotion, setReduceMotion] = useState<boolean>(() =>
    getBooleanStorageValue("swifotine-reduce-motion"),
  );

  useEffect(() => {
    window.localStorage.setItem("swifotine-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("swifotine-high-contrast", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    window.localStorage.setItem("swifotine-readable-mode", String(readableMode));
  }, [readableMode]);

  useEffect(() => {
    window.localStorage.setItem("swifotine-reduce-motion", String(reduceMotion));
  }, [reduceMotion]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  const pageClassName = [
    styles.page,
    theme === "dark" ? styles.dark : styles.light,
    highContrast ? styles.highContrast : "",
    readableMode ? styles.readable : "",
    reduceMotion ? styles.reduceMotion : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={pageClassName}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>
      <AussieFlagRig reduceMotion={reduceMotion} />

      <div className={styles.skyGlow} />
      <div className={styles.shaderVeil} />
      <div className={styles.sun} />
      <div className={styles.mountains} />
      <div className={styles.ground} />

      <header className={`${styles.header} ${styles.liquidGlass}`}>
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

        <div className={styles.headerControls}>
          <a
            className={styles.navLink}
            href="https://github.com/juggperc/swifotine"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className={styles.navLink}
            href="https://github.com/juggperc/swifotine/releases/tag/arm"
            rel="noreferrer"
            target="_blank"
          >
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

          <details className={styles.accessMenu}>
            <summary className={styles.accessSummary}>
              Accessibility
            </summary>
            <div className={`${styles.accessPanel} ${styles.liquidGlass}`}>
              <button
                aria-pressed={highContrast}
                className={styles.accessOption}
                onClick={() => setHighContrast((current) => !current)}
                type="button"
              >
                High contrast
              </button>
              <button
                aria-pressed={readableMode}
                className={styles.accessOption}
                onClick={() => setReadableMode((current) => !current)}
                type="button"
              >
                Readable text
              </button>
              <button
                aria-pressed={reduceMotion}
                className={styles.accessOption}
                onClick={() => setReduceMotion((current) => !current)}
                type="button"
              >
                Reduce motion
              </button>
            </div>
          </details>
        </div>
      </header>

      <section className={styles.hero} id="main-content">
        <p className={styles.eyebrow}>Swifotine for macOS</p>
        <h1 id="top">Any song in the world, for free</h1>
        <p className={styles.heroCopy}>
          Search, download, and play from one native app. No tab maze, no web
          wrappers, just a clean desktop flow.
        </p>

        <div className={styles.heroActions}>
          <DownloadButton
            className={styles.heroCta}
            tone={theme === "dark" ? "dark" : "light"}
          />
          <p>{minimumOS}</p>

          <details className={`${styles.installHelp} ${styles.liquidGlass}`}>
            <summary className={styles.installSummary}>
              First-time install help (unsigned app)
            </summary>
            <div className={styles.installPanel}>
              <p>
                If macOS blocks launch, run these commands in Terminal after
                downloading
                <code> Swifotine.app.zip</code>. Put
                <code> Swifotine.app</code> in
                <code> /Applications</code> first:
              </p>
              <div aria-hidden="true" className={styles.installFlow}>
                <span className={styles.flowStep}>1. Unzip</span>
                <span className={styles.flowStep}>2. Move to /Applications</span>
                <span className={styles.flowStep}>3. Unlock</span>
                <span className={styles.flowStep}>4. Launch</span>
              </div>
              <div className={styles.terminalFrame}>
                <div className={styles.terminalBar}>
                  <span />
                  <span />
                  <span />
                  <p>swifotine-install</p>
                </div>
                <code className={styles.commandLines}>
                  <span>cd ~/Downloads</span>
                  <span>unzip -o Swifotine.app.zip</span>
                  <span>mv -f &quot;Swifotine.app&quot; /Applications/ \\</span>
                  <span>|| sudo mv -f &quot;Swifotine.app&quot; /Applications/</span>
                  <span>cd /Applications</span>
                  <span>chmod +x &quot;Swifotine.app/Contents/MacOS/Swifotine&quot;</span>
                  <span>xattr -dr com.apple.quarantine &quot;Swifotine.app&quot;</span>
                  <span className={styles.commandFinal}>open &quot;Swifotine.app&quot;</span>
                </code>
              </div>
              <p className={styles.installNote}>
                If it is still blocked: open
                <strong> System Settings → Privacy & Security</strong> and click
                <strong> Open Anyway</strong> for Swifotine, then launch again.
              </p>
            </div>
          </details>
        </div>
      </section>

      <section className={styles.featureGrid}>
        {conciseFeatures.map((feature, index) => (
          <article
            className={`${styles.featureCard} ${styles.liquidGlass}`}
            key={feature.title}
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <h2>{feature.title}</h2>
            <p>{feature.detail}</p>
          </article>
        ))}
      </section>

      <section className={styles.showcase}>
        <figure className={`${styles.primaryShot} ${styles.liquidGlass}`}>
          <Image
            alt={screenshots[1].alt}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 74vw"
            src={screenshots[1].src}
          />
          <figcaption>{screenshots[1].caption}</figcaption>
        </figure>

        <div className={styles.thumbRow}>
          <figure className={`${styles.thumbShot} ${styles.liquidGlass}`}>
            <Image
              alt={screenshots[0].alt}
              fill
              sizes="(max-width: 980px) 100vw, 37vw"
              src={screenshots[0].src}
            />
          </figure>
          <figure className={`${styles.thumbShot} ${styles.liquidGlass}`}>
            <Image
              alt={screenshots[2].alt}
              fill
              sizes="(max-width: 980px) 100vw, 37vw"
              src={screenshots[2].src}
            />
          </figure>
        </div>
      </section>

      <section className={styles.acknowledgements}>
        <h2>Acknowledgements</h2>
        <p>Built with original open-source work and platform frameworks:</p>
        <div className={styles.ackItems}>
          {acknowledgements.map((item) => (
            <a
              className={`${styles.ackChip} ${styles.liquidGlass}`}
              href={item.link}
              key={item.title}
              rel="noreferrer"
              target="_blank"
            >
              <strong>{item.title}</strong>
              <span>{item.license}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
