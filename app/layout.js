import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SaveTube - Unduh Video YouTube & Shorts dengan Mudah",
  description:
    "SaveTube is a simple YouTube downloader apps, yet powerful enough to meet all your video downloading needs. It allows you to effortlessly download both regular YouTube videos and YouTube Shorts with just a few clicks. Designed with a user-friendly interface, SaveTube ensures a smooth and hassle-free experience. Whether you want to watch your favorite videos offline or save them for later, SaveTube makes it quick and easy. Enjoy high-quality downloads and access your content anytime, anywhere. Perfect for those seeking a reliable and efficient tool for downloading YouTube content.",
  keywords: [
    "youtube",
    "downloader",
    "app",
    "video",
    "savetubes",
    "simple downloader app",
  ],
  author: "ISB",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SaveTube - Unduh Video YouTube & Shorts dengan Mudah",
    description:
      "SaveTube is a simple YouTube downloader apps, yet powerful enough to meet all your video downloading needs. It allows you to effortlessly download both regular YouTube videos and YouTube Shorts with just a few clicks. Designed with a user-friendly interface, SaveTube ensures a smooth and hassle-free experience. Whether you want to watch your favorite videos offline or save them for later, SaveTube makes it quick and easy. Enjoy high-quality downloads and access your content anytime, anywhere. Perfect for those seeking a reliable and efficient tool for downloading YouTube content.",
    type: "website",
    url: "https://savetubes.vercel.app/", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
