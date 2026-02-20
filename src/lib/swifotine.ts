export type Highlight = {
  title: string;
  detail: string;
};

export type Acknowledgement = {
  title: string;
  detail: string;
  license: string;
  linkLabel: string;
  link: string;
};

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export const downloadHref =
  "https://github.com/juggperc/swifotine/releases/download/arm/Swifotine.app.zip";
export const minimumOS = "macOS Tahoe and above";
export const releaseLabel = "Swifotine.app.zip · arm release";

export const highlights: Highlight[] = [
  {
    title: "Bounded Search",
    detail:
      "Global queries auto-finish after inactivity, hard timeout, or result cap so sessions stay responsive.",
  },
  {
    title: "Ranked Discovery",
    detail:
      "Results are scored by query fit, peer quality, queue depth, free slots, and bitrate signals.",
  },
  {
    title: "Smart Download Failover",
    detail:
      "Swifotine can queue matching peers for the same file to improve transfer starts when a source stalls.",
  },
  {
    title: "Recovered Transfer State",
    detail:
      "Download transfer state persists across relaunches for reliable long-running collections.",
  },
  {
    title: "Native Library + Queue",
    detail:
      "Organize tracks in table or grid mode, then use Play Next and queue controls from native context menus.",
  },
  {
    title: "Mini Player Workflow",
    detail:
      "Compact playback window with artwork, timeline scrubbing, and keyboard shortcuts for fast control.",
  },
  {
    title: "Playlist Cover Influence",
    detail:
      "Generate procedural playlist covers and influence artwork style with your own text prompts.",
  },
  {
    title: "Acknowledgements In-App",
    detail:
      "Bundled licensing notes and acknowledgements are directly accessible from the Help menu.",
  },
];

export const acknowledgements: Acknowledgement[] = [
  {
    title: "Nicotine+",
    detail: "Core Soulseek networking and transfer engine.",
    license: "GPL-3.0-or-later",
    linkLabel: "GitHub",
    link: "https://github.com/nicotine-plus/nicotine-plus",
  },
  {
    title: "Python",
    detail: "Runtime for the helper process that bridges Swifotine to Nicotine+ services.",
    license: "PSF License",
    linkLabel: "python.org",
    link: "https://www.python.org/",
  },
  {
    title: "Apple Frameworks",
    detail: "SwiftUI, SwiftData, AppKit, and AVFoundation power the native macOS experience.",
    license: "Apple SDK Terms",
    linkLabel: "Developer Docs",
    link: "https://developer.apple.com/documentation/",
  },
];

export const screenshots: Screenshot[] = [
  {
    src: "/screenshots/swifotine-shot-1.jpg",
    alt: "Swifotine playlist view with generated artwork and queue controls",
    caption: "Playlists with generated covers and quick queue actions.",
  },
  {
    src: "/screenshots/swifotine-shot-2.jpg",
    alt: "Swifotine library grid view with album art and playback panel",
    caption: "Grid library management with now-playing context.",
  },
  {
    src: "/screenshots/swifotine-shot-3.jpg",
    alt: "Swifotine home screen with sidebar navigation and acknowledgements entry",
    caption: "Focused home screen and one-click acknowledgements.",
  },
];
