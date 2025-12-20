import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Chatbot } from "@/components/chatbot"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Saree Sansar - The Women's World | Premium Indian Ethnic Wear in Bilaspur",
  description:
    "Discover exquisite bridal sarees, silk sarees, and ethnic wear at Saree Sansar in Bilaspur. Specializing in wedding collections, Kosa silk, and traditional Indian attire since 2000. Pan India Delivery | Virtual Try-On Available.",
  keywords: "saree, bridal saree, silk saree, ethnic wear, Bilaspur, wedding saree, Kosa silk, Indian wear, Saree Sansar, Chhattisgarh",
  authors: [{ name: "Saree Sansar" }],
  creator: "Saree Sansar",
  publisher: "Saree Sansar",
  openGraph: {
    title: "Saree Sansar - The Women's World",
    description: "Premium Indian Ethnic Wear since 2000. Bridal Sarees, Kosa Silk, Designer Collections. Pan India Delivery.",
    url: "https://sareesansar.com",
    siteName: "Saree Sansar",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Saree Sansar Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saree Sansar - The Women's World",
    description: "Premium Indian Ethnic Wear since 2000. Bridal Sarees, Kosa Silk, Designer Collections.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
