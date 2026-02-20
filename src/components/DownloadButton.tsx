import { downloadHref, minimumOS, releaseLabel } from "@/lib/swifotine";

type DownloadButtonProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function DownloadButton({
  className,
  tone = "dark",
}: DownloadButtonProps) {
  return (
    <a
      aria-label={`Download Swifotine for ${minimumOS}`}
      className={["sw-download-btn", className].filter(Boolean).join(" ")}
      data-tone={tone}
      href={downloadHref}
      rel="noopener noreferrer"
    >
      <span>Download for {minimumOS}</span>
      <small>{releaseLabel}</small>
    </a>
  );
}
