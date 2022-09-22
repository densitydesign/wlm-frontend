import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/index.module.scss";
import Navigation from "../components/Navigation/Navigation";
import VisualizationController from "../components/VisualizationController";

export default function Home() {
	return (
		<>
			<Head>
				<title>WikiLovesMonuments - Data visualization</title>
				<meta name="title" content="WikiLovesMonuments - Data visualization" />
				<meta name="description" content="Explore the data about photographed monuments from WikiLovesMonuments, in the data visualization system developed using WikiData." />

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://data.wikilovesmonuments.it/" />
				<meta property="og:title" content="WikiLovesMonuments - Data visualization" />
				<meta property="og:description" content="Explore the data about photographed monuments from WikiLovesMonuments, in the data visualization system developed using WikiData. " />
				<meta property="og:image" content="images/og-image.png" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://data.wikilovesmonuments.it/" />
				<meta property="twitter:title" content="WikiLovesMonuments - Data visualization" />
				<meta property="twitter:description" content="Explore the data about photographed monuments from WikiLovesMonuments, in the data visualization system developed using WikiData. " />
				<meta property="twitter:image" content="images/og-image.png" />
			</Head>
      {/* <Navigation/> */}
			<VisualizationController/>
		</>
	);
}
