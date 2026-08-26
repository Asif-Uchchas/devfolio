import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "400", "700", "900"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


// Change this data with your own 🤭
export const metadata: Metadata = {
  title: {
    default: 'Asif Uddin Ahmed ✷ Software Engineer',
    template: '%s - Asif Uddin Ahmed',
  },
  description:
    'Portfolio of Asif Uddin Ahmed — Software Engineer at Trust Bank PLC. Building secure banking solutions with ASP.NET Core, Angular, Next.js, and SQL Server.',
  icons: {
    icon: './favicon.ico',
  },
  applicationName: 'Asif Uddin Ahmed — Portfolio',
  authors: [
    {
      name: 'Asif Uddin Ahmed',
      url: 'https://www.linkedin.com/in/asif-uddin-ahmed/',
    },
  ],
  generator: 'Next.js',
  referrer: 'origin',
  themeColor: '#0a0015',
  colorScheme: 'dark',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Asif Uddin Ahmed',
  publisher: 'Asif Uddin Ahmed',
};
