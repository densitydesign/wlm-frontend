import styles from "./TestVentagli.module.scss";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import ClassNames from "classnames";
import { initialize, destroy } from "./TestVentagli.render";
import data from "./timeline-regional-incremental.json";

export default function TestVentagli() {
	const svgEl = useRef();

	useEffect(() => {
		console.log("TestVentagli Mounted");

		let nested_data = d3.groups(
			data,
			(d) => d.area,
			(d) => d.date
		);
    // limit data for dev purposes
    nested_data = nested_data.slice(4,5)
    // nested_data[0][1] = nested_data[0][1].slice(17,22)

		// Find extent
    const _totals = [];
    for (const [area, snapshots] of nested_data) {
      for (const [snapshot, groups] of snapshots) {
        const _sum = d3.sum(groups, g=>Number(g.value))
        _totals.push(_sum)
      } 
    }
    const dataExtent = d3.extent(_totals)
    
    // console.log("extent totals", dataExtent)

		initialize(svgEl.current, nested_data, dataExtent);

		return ()=>{
		  console.log("TestVentagli unmounted");
		  destroy(svgEl.current)
		}
	}, []);

	return (
		<>
			<svg className={ClassNames(styles.visualization)} ref={svgEl} />
		</>
	);
}
