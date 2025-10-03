import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "400", "700", '900'] });

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
      <body className={`${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}


// Change this data with your own 🤭
export const metadata: Metadata = {
  title: {
    default: 'Asif Uddin Ahmed ✷ Portfolio',
    template: '%s - Asif Uddin Ahmed',
  },
  description:
    'A customizable portfolio template for frontend developers, created by Asif Uddin Ahmed. Showcase your skills, projects, and experience with a clean and modern design.',
  icons: {
    icon: './favicon.ico',
  },
  applicationName: 'Frontend Portfolio Template by Asif Uddin Ahmed',
  authors: [
    {
      name: 'Asif Uddin Ahmed',
      url: 'https://www.linkedin.com/in/asif-uddin-ahmed/',
    },
  ],
  generator: 'Next.js',
  referrer: 'origin',
  themeColor: '#120012',
  colorScheme: 'dark',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Asif Uddin Ahmed',
  publisher: 'Asif Uddin Ahmed',
};
