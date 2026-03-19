import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] }); // Geist is a font family from Google Fonts

export const metadata: Metadata = {
  title: "Air Vimanam — Experience our culture in the sky",
  description:
    "Book flights with Air Vimanam. Authentic Indian hospitality at 35,000 feet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="geist.className">{children}</body>
    </html>
  );
}
