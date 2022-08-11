import styles from "./AreaChart.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { initialize as init_areaChart, update as update_areaChart } from "./AreaChart.render";

export default function AreaChart({ data, filterData }) {
	const svgEl = useRef();

	useEffect(() => {
		init_areaChart(svgEl.current);
	}, []);

	useEffect(() => {
		update_areaChart(data, filterData);
	}, [data, filterData]);

	return (
		<div className={classNames(styles.areaChart, "d-flex", "justify-content-center", "align-items-center")}>
			<svg ref={svgEl}></svg>
		</div>
	);
}
