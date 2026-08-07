import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/core/context/CartContext";
import { Navbar } from "@/features/navigation/Navbar";
import { Footer } from "@/features/home/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aqua Point | Pure Water Solution & Luxury RO Purifiers",
  description: "Bangladesh's leading water purification provider. 7-stage Woodistic glass RO purifiers, commercial plants, genuine spare parts & 24/7 technician servicing.",
  keywords: ["RO Purifier", "Aqua Point", "Water Filter Bangladesh", "TDS Meter", "RO Servicing Dhaka"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-[#0A0D16] text-[#F8FAFC] antialiased flex flex-col justify-between selection:bg-[#00E5FF] selection:text-[#0A0D16]`}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
