import styles from "./VisualizationController.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";
import TestVentagli from "../test-ventagli/TestVentagli";

export default function VisualizationController() {
	const { asPath, basePath } = useRouter();
	const [data, setData] = useState();

	const [play, setPlay] = useState(false);
	const [slice, setSlice] = useState();
	const handleOnChangePlay = () => {
		setPlay(!play);
	};

	useEffect(() => {
		const url = `${basePath}/api-data-simulated/interval-12months.aggregation-province.json`;
		fetchData({
			url: url,
			setState: setData,
		});
	}, []);

	useEffect(() => {
		if (!data) return;
		let sliceRight = 0;
		const t = d3.interval(playVisualization, 1250);

		if (play) {
			sliceRight = 0;
			t.restart((elapsed) => playVisualization(elapsed), 1250);
		} else {
			t.stop();
		}

		function playVisualization(elapsed) {
			sliceRight++;
			setSlice([0, sliceRight]);
			// console.log(0, sliceRight, data[0][1][sliceRight-1][0]);
			const amount_snapshots = data[0][1].length;
			if (sliceRight >= amount_snapshots){
				t.stop();
				setPlay(false)
			}
		}
	}, [data, play]);

	return (
		<>
			{data && <TestVentagli data={data} slice={slice} />}
			<input type="checkbox" checked={play} onChange={handleOnChangePlay} />{" "}
			Play
		</>
	);
}

async function fetchData({ url, setState }) {
	const data = await d3.json(url);
	setState(data);
}

// useEffect(() => {
// 	const hash = asPath.split("#")[1];
// 	console.log(hash);
// }, [asPath]);
// https://nextjs.org/docs/api-reference/next/router#routerreplace
// window.location.hash = `k=${d3.event.transform.k.toFixed(3)}&x=${d3.event.transform.x.toFixed(3)}&y=${d3.event.transform.y.toFixed(3)}`
