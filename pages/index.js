import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/index.module.scss";
import Navigation from "../components/Navigation/Navigation";
import VisualizationController from "../components/VisualizationController";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
      {/* <Navigation/> */}
			<Container fluid>
				<Row>
					<Col>
						<VisualizationController/>
					</Col>
				</Row>
			</Container>
		</>
	);
}
