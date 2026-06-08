import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import StoreProvider from "./providers/StoreProvider";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import "./globals.css";

const fontSans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Velvet Secrets Brand Shop",
  description: "E-commerce platform for luxury lingerie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${fontSans.variable} antialiased`}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
