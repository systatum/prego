"use client";

import React, { useState, useContext } from "react";

export type Theme = {
  color?: string;
  darkMode?: string;
};

export type GlobalSettings = {
  theme?: Theme;
};

interface LayoutState {
  globalSettings?: GlobalSettings;
  setGlobalSettings: React.Dispatch<
    React.SetStateAction<GlobalSettings | undefined>
  >;

  pageData: unknown;
  setPageData: React.Dispatch<React.SetStateAction<unknown>>;

  theme?: Theme;
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    return {
      theme: {
        color: "blue",
      },
      globalSettings: undefined,
      pageData: undefined,
      setGlobalSettings: () => {},
      setPageData: () => {},
    } as LayoutState;
  }

  return context;
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings?: GlobalSettings;
  pageData?: unknown;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}) => {
  const [globalSettings, setGlobalSettings] = useState<
    GlobalSettings | undefined
  >(initialGlobalSettings);

  const [pageData, setPageData] = useState<unknown>(initialPageData);

  const theme = globalSettings?.theme;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
