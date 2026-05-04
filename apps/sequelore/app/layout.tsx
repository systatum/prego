import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import VideoDialog from "@/components/ui/VideoDialog";
import "@/styles.css";
import { TinaUrlFixer } from "@/helpers/tina-url-fixer";
import StyledComponentRegistry from "@/lib/styled-component-registry";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sequelore",
  description:
    "Sequelore is the modern database platform for building, scaling, and shipping products with confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <StyledComponentRegistry>
          <TinaUrlFixer />
          <VideoDialogProvider>
            {children}
            <VideoDialog />
          </VideoDialogProvider>
        </StyledComponentRegistry>
      </body>
    </html>
  );
}
