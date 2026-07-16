import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ToastProvider } from "@/context/ToastContext";
import { HistoryProvider } from "@/context/HistoryContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HistoDx AI | Lung & Colon Histopathology Classification",
  description:
    "AI-powered histopathological image classification platform for lung and colon cancer diagnosis support, built on a MobileNetV2 deep learning model trained on LC25000.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} bg-app text-ink font-body antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <HistoryProvider>{children}</HistoryProvider>
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
