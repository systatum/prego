import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import "@/styles.css";
import StyledComponentRegistry from "@/lib/styled-component-registry";
import { Navbar } from "@/fragments/root/navbar";

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
      className={`${fontSans.variable} ${nunito.variable} ${lato.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <StyledComponentRegistry>
          <Navbar />
          {children}
        </StyledComponentRegistry>
      </body>
    </html>
  );
}
