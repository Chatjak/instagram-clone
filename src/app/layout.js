import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Instagram clone",
  description: "This is instagram clone by Chatjak.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white min-h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
