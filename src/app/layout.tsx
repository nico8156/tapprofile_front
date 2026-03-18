import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TapProfile",
  description: "TapProfile MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
