import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  /* GitHub Pages serves from /imane-portfolio/ in production */
  basePath:    isProd ? "/imane-portfolio" : "",
  assetPrefix: isProd ? "/imane-portfolio/" : "",
  images: { unoptimized: true },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
