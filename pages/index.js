import Head from "next/head";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/index.module.scss";
import Navigation from "../components/Navigation/Navigation";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
      <Navigation/>
			<Container>
				<Row>
					<Col>
						<h1>Homepage</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
}
