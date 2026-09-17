import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Rungs",
    template: "%s | Rungs",
  },
  description:
    "A client-management tool for independent strength coaches who have too many clients for spreadsheets and DMs, and too few clients to justify $70-130/month platforms built for gyms.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased `}
    >
      <body className="flex flex-col font-sans min-h-screen bg-paper text-ink">
        <div>
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
