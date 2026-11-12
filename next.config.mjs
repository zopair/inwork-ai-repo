/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  // GitHub Pages serves this project from a repository subpath.
  output: "export",
  ...(isGitHubPages ? { basePath: "/inwork-ai-repo" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
