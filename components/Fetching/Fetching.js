import styles from "./Fetching.module.scss";
import Spinner from "react-bootstrap/Spinner";
import classNames from "classnames";

export default function Fetching() {
	return (
		<div
			className={classNames(
				styles.fetching,
				"position-absolute",
				"top-50",
				"start-50",
				"translate-middle",
				"d-flex",
				"flex-column",
				"justify-content-center",
				"align-items-center",
				"w-100",
				"h-100"
			)}
		>
			<Spinner variant="blue-jeans" animation="border" role="status" size="sm">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
			<p className={classNames("position-relative")} style={{ color: "var(--bs-blue-jeans)" }}>Fetching Data</p>
		</div>
	);
}
