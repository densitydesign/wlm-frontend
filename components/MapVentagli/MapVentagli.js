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
			<svg ref={svgEl}></svg>
		</div>
	);
}
