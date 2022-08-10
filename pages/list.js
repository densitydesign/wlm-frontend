import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames";
import styles from "../styles/index.module.scss";
import NavMenu from "../components/NavMenu";
export default function List() {
	return (
		<Container className={classNames(styles.vizController)} fluid>
			<Row className={classNames("h-100")}>
				<Col className={classNames("h-100", "pe-0")} md={3} xl={3}>
					<div className={classNames(styles.toolBar, "d-flex", "flex-column")}>
						<NavMenu />
					</div>
				</Col>
				<Col className={classNames("h-100")}></Col>
			</Row>
		</Container>
	);
}
