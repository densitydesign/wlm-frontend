import styles from "./VisualizationController.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";
import TestVentagli from "../test-ventagli/TestVentagli";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import MapVentagli from "../MapVentagli/MapVentagli";
import { feature } from "topojson-client";

export default function VisualizationController() {
	const { asPath, basePath } = useRouter();
	const [data, setData] = useState();

	const [play, setPlay] = useState(false);
	const [slice, setSlice] = useState();
	const handleOnChangePlay = () => {
		setPlay(!play);
	};

	useEffect(() => {
		// fetch initial geography
		const urlGeo = `${basePath}/api-data-simulated/geometries/Reg01012022_WGS84_topoJSON.json`;

		// fetch initial data
		const urlData = `${basePath}/api-data-simulated/interval-12months.aggregation-region.json`;

		Promise.all([d3.json(urlGeo), d3.json(urlData)]).then((values) => {
			const topoJson = values[0];
			const object = Object.keys(topoJson.objects)[0];
			const geographies = feature(topoJson, topoJson.objects[object]);
			const ventagli = values[1];
			const codeKey = "COD_REG"
			const labelKey = "DEN_REG"
			const max = d3.max(ventagli, d=>d[1][d[1].length-1][1][0].valueIncremental)
			const extent = [0, max]
			setData({ ventagli, geographies, codeKey, labelKey, extent });
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
			if (sliceRight >= amount_snapshots) {
				t.stop();
				setPlay(false);
			}
		}
	}, [data, play]);

	return (
		<Container className={classNames(styles.vizController)} fluid>
			<Row className={classNames("h-100")}>
				<Col className={classNames("h-100")} md={3} xl={3}>
					sidebar
					<input
						type="checkbox"
						checked={play}
						onChange={handleOnChangePlay}
					/>{" "}
					Play
				</Col>
				<Col className={classNames("h-100")}>
					<MapVentagli data={data} />
					{/* {data && <TestVentagli data={data} slice={slice} />} */}
				</Col>
			</Row>
		</Container>
	);
}

// useEffect(() => {
// 	const hash = asPath.split("#")[1];
// 	console.log(hash);
// }, [asPath]);
// https://nextjs.org/docs/api-reference/next/router#routerreplace
// window.location.hash = `k=${d3.event.transform.k.toFixed(3)}&x=${d3.event.transform.x.toFixed(3)}&y=${d3.event.transform.y.toFixed(3)}`
