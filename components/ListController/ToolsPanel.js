import styles from "./ListController.module.scss";
import classNames from "classnames";

import NavMenu from "../NavMenu";

export default function ToolsPanel() {
	return (
		<div className={classNames("d-flex", "flex-column")}>
			<NavMenu />
			<h6>Areas</h6>
			<h6>Themes</h6>
			<h6>Status Filter</h6>
			<h6>Export</h6>
			<h6>Legend</h6>
		</div>
	);
}
