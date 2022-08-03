import styles from "./VisualizationController.module.scss";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";
import TestVentagli from "../test-ventagli/TestVentagli";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import { ToolbarUI } from "../UI-Components";
import MapVentagli from "../MapVentagli/MapVentagli";
import { feature } from "topojson-client";

let _regionsList = [],
	_provincesList = [],
	_municipalitiesList = [];

export default function VisualizationController() {
	const { asPath, basePath } = useRouter();

	const [data, setData] = useState();
	const [geographies, setGeographies] = useState();

	const [regionsList, setRegionsList] = useState([]);
	const [provincesList, setProvincesList] = useState([]);
	const [municipalitiesList, setMunicipalitiesList] = useState([]);
	const [typologiesList, setTypologiesList] = useState([{ label: "All monuments" }]);

	const [selectedArea, setselectedArea] = useState();
	const [typology, setTypology] = useState();
	const [dateFrom, setDateFrom] = useState();
	const [dateTo, setDateTo] = useState();

	// Load data
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
			_regionsList = geographiesRegions.features.map((d) => ({
				label: d.properties.DEN_REG,
				code: d.properties.COD_REG,
				type: "region",
				selected: false,
			}));
			_regionsList = _regionsList.sort(function (a, b) {
				var textA = a.label.toUpperCase();
				var textB = b.label.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
			setRegionsList(_regionsList);

			_key = Object.keys(provincesTopo.objects)[0];
			const geographiesProvinces = feature(provincesTopo, provincesTopo.objects[_key]);
			_provincesList = geographiesProvinces.features.map((d) => ({
				label: d.properties.DEN_UTS,
				code: d.properties.COD_UTS,
				codeRegion: d.properties.COD_REG,
				type: "province",
				selected: false,
			}));
			// setProvincesList(_provincesList);

			_key = Object.keys(municipalitiesTopo.objects)[0];
			const geographiesMunicipalities = feature(municipalitiesTopo, municipalitiesTopo.objects[_key]);
			_municipalitiesList = geographiesMunicipalities.features.map((d) => ({
				label: d.properties.COMUNE,
				code: d.properties.PRO_COM,
				codeProvince: d.properties.COD_UTS,
				codeRegion: d.properties.COD_REG,
				type: "municipality",
				selected: false,
			}));
			// setMunicipalitiesList(_municipalitiesList);
			// console.log("_regionsList", _regionsList);
			// console.log("_provincesList", _provincesList);
			// console.log("_municipalitiesList", _municipalitiesList);

			const geographies = {
				regions: geographiesRegions,
				provinces: geographiesProvinces,
				municipalities: geographiesMunicipalities,
			};
			setGeographies(geographies);

			const codeKey = "COD_REG";
			const labelKey = "DEN_REG";

			// setData({ ventagli, geographies: geographiesRegions, codeKey, labelKey, extent });
			setData(ventagli);
		});
	}, []);

	const setSelection = useCallback(() => {
		if (selectedArea) {
			switch (selectedArea.type) {
				case "region":
					let arr = _provincesList.filter((d) => d.codeRegion === selectedArea.code);
					arr = arr.sort(function (a, b) {
						var textA = a.label.toUpperCase();
						var textB = b.label.toUpperCase();
						return textA < textB ? -1 : textA > textB ? 1 : 0;
					});
					setProvincesList(arr);
					break;
				case "province":
					let arr2 = _municipalitiesList.filter((d) => d.codeProvince === selectedArea.code);
					arr2 = arr2.sort(function (a, b) {
						var textA = a.label.toUpperCase();
						var textB = b.label.toUpperCase();
						return textA < textB ? -1 : textA > textB ? 1 : 0;
					});
					setMunicipalitiesList(arr2);
					break;
				case "municipality":
					console.log("is municipality");
					break;
			}
		} else {
			// reset selection
			setProvincesList([]);
			setMunicipalitiesList([]);
		}
	}, [selectedArea]);

	useEffect(() => {
		setSelection();
	}, [selectedArea]);

	useEffect(() => {
		const parameters = {};
		if (selectedArea) {
			parameters.selectedArea = selectedArea.label + "_" + selectedArea.code + "_" + selectedArea.type;
		}
		if (typology) {
			parameters.typology = typology.label;
		}
		if (dateFrom) {
			parameters.dateFrom = dateFrom;
		}
		if (dateTo) {
			parameters.dateTo = dateTo;
		}
		const temp = [];
		for (const key in parameters) {
			temp.push(key + "=" + parameters[key]);
		}
		const hashUrl = temp.join("&");
		window.location.hash = hashUrl;

		// router.replace(url, as, options)

		// const hash = asPath.split("#")[1];
		// console.log(hash);
		// https://nextjs.org/docs/api-reference/next/router#routerreplace
		// window.location.hash = `k=${d3.event.transform.k.toFixed(3)}&x=${d3.event.transform.x.toFixed(3)}&y=${d3.event.transform.y.toFixed(3)}`
	}, [selectedArea, typology, dateFrom, dateTo]);

	return (
		<Container className={classNames(styles.vizController)} fluid>
			<Row className={classNames("h-100")}>
				<Col className={classNames("h-100")} md={3} xl={3}>
					<ToolbarUI
						regions={{ items: regionsList, setSelection: setselectedArea, disabled: !regionsList.length }}
						provinces={{ items: provincesList, setSelection: setselectedArea, disabled: !provincesList.length }}
						municipalities={{
							items: municipalitiesList,
							setSelection: setselectedArea,
							disabled: !municipalitiesList.length,
						}}
						setSelectedArea={setselectedArea}
						typology={typology}
						setTypology={setTypology}
						typologiesList={typologiesList}
						setDateFrom={setDateFrom}
						setDateTo={setDateTo}
					/>
				</Col>
				<Col className={classNames("h-100")}>
					{data && geographies && <MapVentagli ventagli={data} geographies={geographies} selectedArea={selectedArea} />}
					{/* {data && <TestVentagli data={data} slice={slice} />} */}
				</Col>
			</Row>
		</Container>
	);
}
