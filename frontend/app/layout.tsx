import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/app/contexts/AuthContext';

export const metadata: Metadata = {
  title: "Login System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>

    </html>
  );
}
