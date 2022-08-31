import { Col, Container, Row } from "react-bootstrap";
import styles from "./ListController.module.scss";
import classNames from "classnames";

import ToolsPanel from "./ToolsPanel";
import MoumentsList from "./MoumentsList";

export default function ListController() {
	return (
		<Container fluid>
			<Row>
				<Col lg={3}>
					<ToolsPanel />
				</Col>
				<Col>
					<MoumentsList />
				</Col>
			</Row>
		</Container>
	);
}
