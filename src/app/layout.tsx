import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login Stack Example",
  description: "NextJS login stack example.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
