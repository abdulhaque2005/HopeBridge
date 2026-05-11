import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/lib/language-provider";
import { AiAssistant } from "@/components/ai-assistant";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const metadata: Metadata = {
  title: {
    default: "HopeBridge Foundation | Empowering Communities & Disaster Relief",
    template: "%s | HopeBridge Foundation"
  },
  description: "A modern, transparent NGO platform. Donate to urgent disaster relief, child education, and women empowerment. 100% transparent and verified.",
  keywords: ["NGO", "Charity", "Donate", "Disaster Relief", "Education", "India NGO", "Tax Exempt Donation", "80G", "Volunteer"],
  authors: [{ name: "HopeBridge Team" }],
  creator: "HopeBridge Foundation",
  metadataBase: new URL("https://hopebridge-jet.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hopebridge-jet.vercel.app",
    title: "HopeBridge Foundation | Change a Life Today",
    description: "Join us in our mission to fight poverty, hunger, and educational inequality. Real-time impact, 100% transparency.",
    siteName: "HopeBridge",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "HopeBridge Foundation Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HopeBridge Foundation | Empowering Communities",
    description: "Real-time impact, 100% transparency. Donate to urgent humanitarian causes.",
    images: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScroll>
              <Navbar />
              <main className="min-h-screen pt-16 flex flex-col">
                {children}
              </main>
              <Footer />
              <AiAssistant />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
