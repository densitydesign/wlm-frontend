import Head from "next/head";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/index.module.scss";
import Navigation from "../components/Navigation/Navigation";
import TestVentagli from "../components/test-ventagli";
import MapVentagli from "../components/MapVentagli";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
      <Navigation/>
			<Container fluid>
				<Row>
					<Col>
						<h1>Homepage</h1>
						{/* <TestVentagli /> */}
						<MapVentagli/>
					</Col>
				</Row>
			</Container>
		</>
	);
}
