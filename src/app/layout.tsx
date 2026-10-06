import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KVR ELEGANCE | Premium Sarees & Dresses for Every Occasion",
  description:
    "Discover timeless Indian ethnic wear. Explore luxury Kanjivaram silk sarees, kurtis, designer churidars, and festive collections at KVR Elegance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1C1C1C]">
        {children}
      </body>
    </html>
  );
}
