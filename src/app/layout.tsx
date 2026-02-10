import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Courtpath | Premier Court E-Filing Provider",
  description: "Your premier court e-filing provider. Simplify your legal document filing process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
