import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { ReduxProvider } from "@/store/providers/Provider";
import "../styles/globals.css";

const avenirBold = localFont({
  src: "../assets/Fonts/Avenir/AvenirLTStd-Black.otf",
  weight: "900",
  style: "bold",
  variable: "--AvenirBold",
});

const avenirBoldItalic = localFont({
  src: "../assets/Fonts/Avenir/AvenirLTStd-BlackOblique.otf",
  weight: "900",
  style: "italic",
  variable: "--AvenirBoldItalic",
});

const avenirRegular = localFont({
  src: "../assets/Fonts/Avenir/AvenirLTStd-Medium.otf",
  weight: "400",
  style: "normal",
  variable: "--AvenirRegular",
});

const avenirRegularItalic = localFont({
  src: "../assets/Fonts/Avenir/AvenirLTStd-MediumOblique.otf",
  weight: "400",
  style: "italic",
  variable: "--AvenirRegularItalic",
});

const avenirLight = localFont({
  src: "../assets/Fonts/Avenir/AvenirLTStd-Light.otf",
  weight: "300",
  style: "normal",
  variable: "--AvenirLight",
});

const avenirLightItalic = localFont({
  src: "../assets/Fonts/Avenir/AvenirLTStd-LightOblique.otf",
  weight: "300",
  style: "italic",
  variable: "--AvenirLightItalic",
});

export const metadata: Metadata = {
  title: "Lens Forecast Dashboard",
  description: "Lens Forecast Dashboard - BoP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${[
          avenirBold.variable,
          avenirBoldItalic.variable,
          avenirRegular.variable,
          avenirRegularItalic.variable,
          avenirLight.variable,
          avenirLightItalic.variable,
        ].join(" ")} antialiased`}
      >
        <ReduxProvider>
          <Navbar />
          <div className="w-full h-[56px] md:h-[72px] mb-0.5"></div>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
