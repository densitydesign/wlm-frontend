import "@fontsource/noto-sans/100.css";
import "@fontsource/noto-sans/200.css";
import "@fontsource/noto-sans/300.css";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/600.css";
import "@fontsource/noto-sans/700.css";
import "@fontsource/noto-sans/800.css";
import "@fontsource/noto-sans/900.css";
import "../styles/globals.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SSRProvider from "react-bootstrap/SSRProvider";

// Matomo
import { init } from "@socialgouv/matomo-next";
const MATOMO_URL = "https://matomo.wikimedia.it/";
const MATOMO_SITE_ID = "16";

import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";
import { Button } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [matomoCookie, setMatomoCookie] = useState(
    getCookieConsentValue("enableVisitorCount")
  );

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, [router.events]);

  useEffect(() => {
    if (matomoCookie === "true") {
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    }
  }, [matomoCookie]);

  useEffect(() => {
    console.log("cookies");
    console.log(getCookieConsentValue("enableVisitorCount"));
  });

  return (
    <SSRProvider>
      <Component {...pageProps} />
      <CookieConsent
        cookieName="enableVisitorCount"
        style={{
          background: "var(--bs-interactive)",
          height: "auto",
          padding: "0.5rem 0.8rem",
          fontSize: "0.9rem",
        }}
        contentStyle={{ margin: 0 }}
        buttonText="OK"
        buttonStyle={{
          backgroundColor: "var(--bs-black)",
          color: "white",
          margin: "0",
          borderRadius: "6px",
          overflow: "hidden",
          padding: "3px 6px",
          fontSize: "0.8rem",
        }}
        onAccept={() => {
          alert("Thanks for enabling cookies");
          setMatomoCookie(getCookieConsentValue("enableVisitorCount"));
        }}
        enableDeclineButton
        declineButtonText="Don't count me"
        declineButtonStyle={{
          backgroundColor: "var(--bs-white)",
          color: "var(--bs-black)",
          margin: "0 0.5rem",
          borderRadius: "6px",
          overflow: "hidden",
          padding: "3px 6px",
          fontSize: "0.8rem",
        }}
        onDecline={() => {
          alert("Cookies are disabled");
          setMatomoCookie(getCookieConsentValue("enableVisitorCount"));
        }}
        expires={7}
        sameSite="strict"
        debug={false}
      >
        We use cookies and Matomo to monitor visits to this website. Read our{" "}
        <a
          style={{ color: "black" }}
          href="https://www.wikimedia.it/cookie-policy/"
        >
          cookie policy
        </a>{" "}
        or{" "}
        <a style={{ color: "black" }} href="https://www.wikimedia.it/privacy/">
          privacy policy
        </a>.
      </CookieConsent>
    </SSRProvider>
  );
}

export default MyApp;
