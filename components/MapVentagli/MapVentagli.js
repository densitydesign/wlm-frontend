import * as d3 from "d3";
import styles from "./MapVentagli.module.scss";
import classNames from "classnames";
import { useRef, useEffect, useMemo } from "react";
import { initialize, update } from "./MapVentagli.render";

export default function MapVentagli({
	ventagli,
	geographies,
	selectedRegion,
	selectedProvince,
	selectedMunicipality,
	typology,
	dateFrom,
	dateTo,
}) {
	const svgEl = useRef();

	const extent = useMemo(() => {
		const max = d3.max(ventagli, (d) => d[1][d[1].length - 1][1][0].valueIncremental);
		return (extent = [0, max]);
	}, [ventagli]);

	useEffect(() => {
		const data_for_viz = {
			ventagli,
			extent,
			geographies,
			selectedRegion,
			selectedProvince,
			selectedMunicipality,
			typology,
			dateFrom,
			dateTo,
		};
		// console.log(JSON.stringify(data_for_viz, null, 4));
		initialize(svgEl.current, data_for_viz);
	}, []);

	useEffect(() => {
		const data_for_viz = {
			ventagli,
			extent,
			geographies,
			selectedRegion,
			selectedProvince,
			selectedMunicipality,
			typology,
			dateFrom,
			dateTo,
		};
		// console.log(data_for_viz);
		update(data_for_viz);
	}, [ventagli, selectedRegion, selectedProvince, selectedMunicipality]);

	return (
		<div className={classNames(styles.map)}>
			<svg ref={svgEl}></svg>
		</div>
	);
}
