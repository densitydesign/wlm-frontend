import styles from "./AreaChart.module.scss";
import classNames from "classnames";
export default function AreaChart({ data }) {
	return (
		<div className={classNames(styles.areaChart, "d-flex", "justify-content-center", "align-items-center")}>
			[ Areachart will be here ]
			{/* {data.data[0].history.map((h, i) => (
				<p key={i} className="mb-0">{h.date}</p>
			))} */}
		</div>
	);
}
