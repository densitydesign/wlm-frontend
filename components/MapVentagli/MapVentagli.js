import * as d3 from "d3";
import styles from "./MapVentagli.module.scss";
import classNames from "classnames";
import { useRef, useEffect, useMemo } from "react";
import { initialize, update } from "./MapVentagli.render";

export default function MapVentagli({ ventagli, geographies, selectedArea }) {
	const svgEl = useRef();

	const extent = useMemo(()=>{
		const max = d3.max(ventagli, (d) => d[1][d[1].length - 1][1][0].valueIncremental);
		return extent = [0, max];
	}, [ventagli, selectedArea])

	useEffect(() => {
		const data_for_viz = { geographies, ventagli, extent, selectedArea };
		// console.log(data_for_viz);
		initialize(svgEl.current, data_for_viz);
	}, []);

	useEffect(() => {
		const data_for_viz = { geographies, ventagli, extent, selectedArea };
		// console.log(data_for_viz);
		// update(data_for_viz);
	}, [ventagli, selectedArea]);

	return (
		<div className={classNames(styles.map)}>
			<svg ref={svgEl}></svg>
		</div>
	);
}
