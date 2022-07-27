import styles from "./VisualizationController.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";
import TestVentagli from "../test-ventagli/TestVentagli";

export default function VisualizationController() {
	const { asPath, basePath } = useRouter();
  const [data, setData] = useState([]);

	useEffect(() => {
	  fetchData({url:`${basePath}/api-data-simulated/interval-12months.aggregation-province.json`, setState: setData})
	}, [])

	return (
		<>
			<p>VisualizationController eyeyey</p>
			{data.length && <TestVentagli data={data} />}
		</>
	);
}

async function fetchData({url, setState}) {
	const data = await d3.json(url)
	setState(data)
}

// useEffect(() => {
// 	const hash = asPath.split("#")[1];
// 	console.log(hash);
// }, [asPath]);
// https://nextjs.org/docs/api-reference/next/router#routerreplace
// window.location.hash = `k=${d3.event.transform.k.toFixed(3)}&x=${d3.event.transform.x.toFixed(3)}&y=${d3.event.transform.y.toFixed(3)}`
