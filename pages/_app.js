import "../styles/globals.scss";

import { useEffect } from "react";
import { useRouter } from "next/router";

import SSRProvider from "react-bootstrap/SSRProvider";

import "@fontsource/noto-sans";

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
