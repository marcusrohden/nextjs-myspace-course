import type { Metadata } from "next";

import "./globals.css";

import NavMenu from "./NavMenu";
import AuthProvider from "./AuthProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <NavMenu />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
