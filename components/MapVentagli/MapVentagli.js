import * as d3 from "d3";
import styles from "./MapVentagli.module.scss";
import classNames from "classnames";
import { useRef, useEffect, useMemo } from "react";
import { initialize, update } from "./MapVentagli.render";

export default function MapVentagli({ ventagli, lvl4, lvl6, lvl8, selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo }) {
	const svgEl = useRef();
	const { data, extent } = ventagli;

	useEffect(() => {
		const data_for_viz = {
			data,
			extent,
			lvl4,
			lvl6,
			lvl8,
			selectedRegion,
			selectedProvince,
			selectedMunicipality,
			typology,
			dateFrom,
			dateTo,
		};
		// console.log("Mounted", data_for_viz);
		initialize(svgEl.current, data_for_viz);
	}, []);

	useEffect(() => {
		const data_for_viz = {
			data,
			extent,
			lvl4,
			lvl6,
			lvl8,
			selectedRegion,
			selectedProvince,
			selectedMunicipality,
			typology,
			dateFrom,
			dateTo,
		};
		// console.log("update",data_for_viz);
		update(data_for_viz);
	}, [ventagli, selectedRegion, selectedProvince, selectedMunicipality]);

	return (
		<div className={classNames(styles.map)}>
			<svg ref={svgEl}>
				<linearGradient id="tick-background" x1="50%" y1="0%" x2="50%" y2="100%">
					<stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0.5" />
					<stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0" />
				</linearGradient>
			</svg>
		</div>
	);
}
