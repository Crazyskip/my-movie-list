import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/navbar";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
