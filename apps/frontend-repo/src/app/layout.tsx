"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";

import store from "@/store/store";
import theme from "@/theme/theme";
import AuthGuard from "@/components/molecules/AuthGuard";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>User Page</title>
      </head>
      <body>
        <AuthGuard />
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
