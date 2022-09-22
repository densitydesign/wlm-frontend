import styles from "./MapVentagli.module.scss";
import classNames from "classnames";
import { useRef, useEffect } from "react";
import { initialize, update } from "./MapVentagli.render";
import { cloneDeep as _cloneDeep } from "lodash";

export default function MapVentagli({
	ventagli,
	lvl4,
	lvl6,
	lvl8,
	selectedRegion,
	selectedProvince,
	selectedMunicipality,
	setSelectedRegion,
	setSelectedProvince,
	setSelectedMunicipality,
	typology,
	dateFrom,
	dateTo,
	showDelta,
	viewbox,
}) {
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
			setSelectedRegion,
			setSelectedProvince,
			setSelectedMunicipality,
			typology,
			dateFrom,
			dateTo,
			viewbox,
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
			setSelectedRegion,
			setSelectedProvince,
			setSelectedMunicipality,
			typology,
			dateFrom,
			dateTo,
			showDelta,
			viewbox,
		};
		update(_cloneDeep(data_for_viz));
	}, [ventagli, selectedRegion, selectedProvince, selectedMunicipality, viewbox]);

	const svg_ns = {
		"xmlns": "http://www.w3.org/2000/svg",
		"version": "1.1"
		// "xmlns:xlink": "http://www.w3.org/1999/xlink"
	};

	return (
		<div className={classNames(styles.map, "position-relative")}>
			<svg {...svg_ns} ref={svgEl}>
				<linearGradient id="tick-background" x1="50%" y1="0%" x2="50%" y2="100%">
					<stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0.75" />
					<stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0" />
				</linearGradient>
			</svg>
		</div>
	);
}
