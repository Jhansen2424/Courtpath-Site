import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courpath",
  description: "Courpath Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
