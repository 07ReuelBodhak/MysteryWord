import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GuessArena",
  description: "Guess the hidden word before time runs out.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#0A0A0A] text-white flex flex-col overflow-x-hidden font-sans antialiased selection:bg-neutral-800 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
