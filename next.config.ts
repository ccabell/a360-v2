import type { NextConfig } from "next";

const embedOrigins = process.env.EMBED_ALLOWED_ORIGINS ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Only embed routes get permissive frame-ancestors
        source: "/embed/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${embedOrigins}`,
          },
        ],
      },
      {
        // All other routes: deny framing entirely
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
