import type { NextConfig } from "next";

function hostnameFromUrl(url?: string) {
  if (!url) return undefined;
  return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

const s3Hostname = hostnameFromUrl(process.env.AWS_S3_DOMAIN);
const storageHostname = hostnameFromUrl(process.env.STORAGE_DOMAIN); // e.g. sin1.contabostorage.com

const nextConfig: NextConfig = {
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      ...(s3Hostname
        ? [{ protocol: "https" as const, hostname: s3Hostname }]
        : []),
      ...(storageHostname
        ? [{ protocol: "https" as const, hostname: storageHostname }]
        : []),
      // Fallback pattern for any *.amazonaws.com bucket URL style
      {
        protocol: "https" as const,
        hostname: "*.amazonaws.com",
      },
      // Contabo object storage (hardcoded fallback in case env var isn't set)
      {
        protocol: "https" as const,
        hostname: "*.contabostorage.com",
      },
    ],
  },
};

export default nextConfig;