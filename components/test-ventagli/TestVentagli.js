import styles from "./TestVentagli.module.scss";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import { initialize, update } from "./TestVentagli.render";

export default function TestVentagli({data}) {
	const svgEl = useRef();
	const [extent, setExtent] = useState()

	useEffect(() => {
		let extents = []
		//calculate data extent
		data.forEach(d=>{
			const areaName = d[0]
			const snapshots = d[1]
			snapshots.forEach(dd=>{
				const date = dd[0]
				const groups = dd[1]
				const extent = d3.extent(groups, g=>g.valueIncremental)
				extents.push(...extent)
			})
		})
		const temp_extent = d3.extent(extents)
		setExtent(d3.extent(temp_extent))
		initialize(svgEl.current, data, temp_extent);
	}, []);

	useEffect(()=>{
		if (!data || !extent) {
			return
		}
		update(data, extent)
	}, [data])

	return (
		<>
			<svg className={ClassNames(styles.visualization)} ref={svgEl}></svg>
		</>
	);
}
