import styles from "./VisualizationController.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";
import TestVentagli from "../test-ventagli/TestVentagli";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import { ToolbarUI } from "../UI-Components";
import MapVentagli from "../MapVentagli/MapVentagli";
import { feature } from "topojson-client";

export default function VisualizationController() {
	const { asPath, basePath } = useRouter();
	const [data, setData] = useState();
	const [regionsList, setRegionsList] = useState();
	const [provincesList, setProvincesList] = useState();
	const [municipalitiesList, setMunicipalitiesList] = useState();

	useEffect(() => {
		// fetch initial geography
		const geoReg = d3.json(`${basePath}/api-data-simulated/geometries/Reg01012022_WGS84_topoJSON.json`);
		const geoProv = d3.json(`${basePath}/api-data-simulated/geometries/ProvCM01012022_WGS84_topoJSON.json`);
		const geoCom = d3.json(`${basePath}/api-data-simulated/geometries/Com01012022_WGS84_topoJSON.json`);

		// fetch initial data
		const _data = d3.json(`${basePath}/api-data-simulated/interval-12months.aggregation-region.json`);

		Promise.all([geoReg, geoProv, geoCom, _data]).then(([regionsTopo, provincesTopo, municipalitiesTopo, ventagli]) => {
			let _key = Object.keys(regionsTopo.objects)[0];
			const geographiesRegions = feature(regionsTopo, regionsTopo.objects[_key]);
			const _regionsList = geographiesRegions.features.map((d) => ({
				label: d.properties.DEN_REG,
				code: d.properties.COD_REG,
			}));
			setRegionsList(_regionsList);

			_key = Object.keys(provincesTopo.objects)[0];
			const geographiesProvinces = feature(provincesTopo, provincesTopo.objects[_key]);
			const _provincesList = geographiesProvinces.features.map((d) => ({
				label: d.properties.DEN_UTS,
				code: d.properties.COD_UTS,
				codeRegion: d.properties.COD_REG,
			}));
			setProvincesList(_provincesList);

			_key = Object.keys(municipalitiesTopo.objects)[0];
			const geographiesMunicipalities = feature(municipalitiesTopo, municipalitiesTopo.objects[_key]);
			const _municipalitiesList = geographiesMunicipalities.features.map((d) => ({
				label: d.properties.COMUNE,
				code: d.properties.PRO_COM,
				codeProvince: d.properties.COD_UTS,
				codeRegion: d.properties.COD_REG,
			}));
			setMunicipalitiesList(_municipalitiesList);

			const codeKey = "COD_REG";
			const labelKey = "DEN_REG";

			console.log(geographiesMunicipalities);

			const max = d3.max(ventagli, (d) => d[1][d[1].length - 1][1][0].valueIncremental);
			const extent = [0, max];
			setData({ ventagli, geographies: geographiesRegions, codeKey, labelKey, extent });
		});
	}, []);

	return (
		<Container className={classNames(styles.vizController)} fluid>
			<Row className={classNames("h-100")}>
				<Col className={classNames("h-100")} md={3} xl={3}>
					<ToolbarUI regionsList={regionsList} provincesList={provincesList} municipalitiesList={municipalitiesList} />
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
