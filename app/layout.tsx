import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskLite",
  description: "Simple task tracker",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-slate-50 font-[family-name:var(--font-geist-sans)] text-slate-800 selection:bg-blue-200">
        <header className="border-b border-slate-200 bg-white/90">
          <nav className="mx-auto flex min-h-19 w-[calc(100%-2rem)] max-w-5xl items-center justify-between gap-4 sm:w-[calc(100%-2.5rem)]" aria-label="Main navigation">
            <Link href="/" className="inline-flex items-center gap-3 text-lg font-bold tracking-tight focus-visible:rounded focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700" aria-hidden="true">TL</span>
              TaskLite
            </Link>
            <Link href="/tasks/new" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-300">
              New task
            </Link>
          </nav>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
