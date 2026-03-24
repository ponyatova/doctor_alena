import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { getDoctorById } from "@/lib/db";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const defaultJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Врач гастроэнтеролог, диетолог, нутрициолог в Самаре",
  description: "Диагностика и лечение гастроэнтерологических заболеваний",
  url: process.env.NEXT_PUBLIC_APP_URL,
  medicalSpecialty: "Gastroenterology",
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),

    title: {
      default: "Врач гастроэнтеролог — лечение и диагностика",
      template: "%s | Врач гастроэнтеролог",
    },

    description:
      "Диагностика и лечение гастроэнтерологических заболеваний: боли в животе, расстройства пищеварения, нарушения аппетита.",

    openGraph: {
      type: "website",
      url: baseUrl,
      siteName: "Врач гастроэнтеролог",
      title: "Врач гастроэнтеролог — лечение и диагностика",
      description: "Диагностика и лечение гастроэнтерологических заболеваний.",
      images: [
        {
          url: `${baseUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
          alt: "Врач гастроэнтеролог",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Врач гастроэнтеролог — лечение и диагностика",
      description:
        "Диагностика и лечение гастроэнтерологических заболеваний: боли в животе, расстройства пищеварения, нарушения аппетита.",
      images: [`${baseUrl}/android-chrome-512x512.png`],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const doctor = await getDoctorById(1).catch(() => null);

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(defaultJsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${inter.className} h-full antialiased font-sans`}
      >
        <div className="fixed inset-0 z-[-1] bg-white/85" />

        <div className="relative z-0 min-h-screen">
          <ErrorBoundary>
            <Header doctor={doctor} />
            {children} <Footer doctor={doctor} />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
