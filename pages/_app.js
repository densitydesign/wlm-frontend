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

import { useEffect } from "react";
import { useRouter } from "next/router";

import SSRProvider from "react-bootstrap/SSRProvider";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	useEffect(() => {
		typeof document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
	}, [router.events]);
	return (
		<SSRProvider>
			<Component {...pageProps} />
		</SSRProvider>
	);
}

export default MyApp;
