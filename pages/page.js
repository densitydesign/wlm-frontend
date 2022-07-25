import Head from "next/head";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Navigation from "../components/Navigation/Navigation";

export default function Page() {
	return (
		<>
			<Head>
				<title>Page</title>
			</Head>
			<Navigation/>
			<Container>
				<Row>
					<Col>
						<h1>A page</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
}
