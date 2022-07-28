import styles from "./TestVentagli.module.scss";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import ClassNames from "classnames";
import { initialize, update } from "./TestVentagli.render";

export default function TestVentagli({ data, slice }) {
	const svgEl = useRef();
	const [extent, setExtent] = useState();

	useEffect(() => {
		let extents = [];
		//calculate data extent
		data.forEach((d) => {
			const areaName = d[0];
			const snapshots = d[1];
			snapshots.forEach((dd) => {
				const date = dd[0];
				const groups = dd[1];
				const extent = d3.extent(groups, (g) => g.valueIncremental);

				extents.push(...extent);
			});
		});
		const sorted = data.sort((a,b)=>{
			const max_a = a[1][a[1].length-1][1][0].valueIncremental
			const max_b = b[1][b[1].length-1][1][0].valueIncremental
			return max_b - max_a
		})
		// console.log(sorted)
		const temp_extent = d3.extent(extents);
		setExtent(d3.extent(temp_extent));
		initialize(svgEl.current, sorted, temp_extent, slice);
	}, []);

	useEffect(() => {
		if (!data || !extent) {
			return;
		}
		update(data, extent, slice);
	}, [data, slice]);

	return (
		<>
			<svg
				id="test-ventagli"
				className={ClassNames(styles.visualization)}
				ref={svgEl}
			>
				<defs>
					<linearGradient id="tick-background" x1="50%" y1="0%" x2="50%" y2="100%">
						<stop
							offset="0%"
							stopColor="rgb(255,255,255)"
							stopOpacity="0.5"
						/>
						<stop
							offset="100%"
							stopColor="rgb(255,255,255)"
							stopOpacity="0"
						/>
					</linearGradient>
				</defs>
			</svg>
		</>
	);
}
