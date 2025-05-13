import type { Metadata } from "next";
// Correctly import GeistSans and GeistMono as named exports
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono'; // Correct path for GeistMono
import { Frank_Ruhl_Libre } from 'next/font/google'; // Import Frank Ruhl Libre
import "./globals.css";
import Header from "@/components/Header";
// import Footer from "@/components/Footer"; // Removed Footer import

// Remove Aileron localFont configuration
// const aileron = localFont(...);

// When imported as named exports, they are already initialized font objects
// No need to call them as functions. Their default variable names are usually sufficient,
// but if you want to ensure specific variable names like '--font-geist-sans', 
// you can usually pass configuration directly or ensure your Tailwind config uses their default var names.
// For simplicity and common usage with `geist/font`, their default setup is often plug-and-play.

// We'll rely on their default variable setup if specific variable naming isn't strictly required by an override.
// If you need to force `variable: '--font-geist-sans'`, the initialization would be slightly different
// or done via `next/font/google` if that was the original intent for more control.
// For now, let's use the direct named exports which provide default CSS variables.

// Initialize Frank Ruhl Libre
const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['latin'],
  variable: '--font-frank-ruhl-libre',
  weight: ['300', '400', '500', '700', '900'], // Load all available weights
});

export const metadata: Metadata = {
  title: "Leifson Insurance - Protect What Matters Most", // Updated title
  description: "Licensed in all 50 states, Leifson Insurance offers comprehensive coverage with access to over 20 top-rated insurance carriers. Protect your family and future with us.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font variables to the html tag
    // The .variable class is automatically provided by next/font when using named exports this way.
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${frankRuhlLibre.variable}`}>
      <body className="tracking-tight-3 bg-[#f9f9f9] relative flex flex-col min-h-screen">
        <Header />
        <main className="relative z-10 flex-grow">
          {children}
        </main> 
        {/* <Footer /> */}{/* Removed Footer component */}
      </body> 
    </html>
  );
} 