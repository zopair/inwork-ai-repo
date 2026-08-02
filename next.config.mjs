/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // تحويل المشروع بالكامل إلى HTML/CSS/JS ثابت
  images: {
    unoptimized: true, // مطلوب لـ GitHub Pages
  },
};
export default nextConfig;
