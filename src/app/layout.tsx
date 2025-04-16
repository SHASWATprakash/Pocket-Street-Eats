import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/cart-context";
import { WalletProvider } from "@/lib/wallet/wallet-context";
import { Helmet } from "react-helmet";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pocket Street Eats",
  description: "Your go-to app for discovering local eats!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pocket Street Eats</title>
        <meta
          name="description"
          content="Your go-to app for discovering local eats!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        />
        <meta
          http-equiv="Strict-Transport-Security"
          content="max-age=31536000; includeSubDomains"
        />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta http-equiv="X-Frame-Options" content="DENY" />
        <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
      </Helmet>
      <body className={`${nunito.variable} ${geistMono.variable}`}>
        <WalletProvider>
          <CartProvider>
            <div className="app-container">{children}</div>
          </CartProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
