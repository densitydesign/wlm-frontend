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

const _typologiesList = [
	{ label: "All monuments" },
	{ label: "Fortificazioni" },
	{ label: "Quasi tutti" },
	{ label: "Una piccola parte" },
];

export default function VisualizationController() {
	const { asPath, basePath } = useRouter();

	const [data, setData] = useState();
	const [geographies, setGeographies] = useState();

	const [regionsList, setRegionsList] = useState([]);
	const [provincesList, setProvincesList] = useState([]);
	const [municipalitiesList, setMunicipalitiesList] = useState([]);
	const [typologiesList, setTypologiesList] = useState([]);

	const [selectedRegion, setSelectedRegion] = useState();
	const [selectedProvince, setSelectedProvince] = useState();
	const [selectedMunicipality, setSelectedMunicipality] = useState();
	const [typology, setTypology] = useState();
	const [dateFrom, setDateFrom] = useState();
	const [dateTo, setDateTo] = useState();

	// Decode URL and load data
	useEffect(() => {
		// Decode URL
		const paramString = asPath.split("#")[1];
		// console.log(paramString);
		let vizParameters = {};
		if (paramString) {
			vizParameters = Object.fromEntries(
				paramString.split("&").map((d) => d.split("=").map((dd) => decodeURIComponent(dd)))
			);
			// console.log("vizParameters", vizParameters);
		}

		// fetch initial geography
		const geoReg = d3.json(`${basePath}/api-data-simulated/geometries/Reg01012022_WGS84_topoJSON.json`);
		const geoProv = d3.json(`${basePath}/api-data-simulated/geometries/ProvCM01012022_WGS84_topoJSON.json`);
		const geoCom = d3.json(`${basePath}/api-data-simulated/geometries/Com01012022_WGS84_topoJSON.json`);

		// fetch initial data
		const _data = d3.json(`${basePath}/api-data-simulated/interval-12months.aggregation-region.json`);

		Promise.all([geoReg, geoProv, geoCom, _data]).then(([regionsTopo, provincesTopo, municipalitiesTopo, ventagli]) => {
			const fetchedTypologiesList = _typologiesList;
			setTypologiesList(fetchedTypologiesList);

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

			if (vizParameters) {
				const {
					selectedAreaType,
					selectedAreaLabel,
					selectedRegion,
					selectedProvince,
					selectedMunicipality,
					typology,
					dateFrom,
					dateTo,
				} = vizParameters;
				if (selectedRegion) {
					setSelectedRegion(_regionsList.find((d) => d.label === selectedRegion));
				}
				if (selectedProvince) {
					setSelectedProvince(_provincesList.find((d) => d.label === selectedProvince));
				}
				if (selectedMunicipality) {
					setSelectedMunicipality(_municipalitiesList.find((d) => d.label === selectedMunicipality));
				}
				if (typology) {
					// console.log("typology", typology);
					const correspondingType = fetchedTypologiesList.find((d) => d.label === typology);
					// console.log("correspondingType", correspondingType);
					setTypology(correspondingType);
				}
				if (dateFrom) setDateFrom(dateFrom);
				if (dateTo) setDateTo(dateTo);
			}
			setData(ventagli);
			const codeKey = "COD_REG";
			const labelKey = "DEN_REG";
		});
	}, []);

	useEffect(() => {
		let arr = []
		if (selectedRegion) {
			arr = _provincesList.filter((d) => d.codeRegion === selectedRegion.code);
			arr = arr.sort(function (a, b) {
				var textA = a.label.toUpperCase();
				var textB = b.label.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
			setProvincesList(arr);
		}
	}, [selectedRegion]);

	useEffect(() => {
		let arr2 = [];
		if (selectedProvince) {
			arr2 = _municipalitiesList.filter((d) => d.codeProvince === selectedProvince.code);
			arr2 = arr2.sort(function (a, b) {
				var textA = a.label.toUpperCase();
				var textB = b.label.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
		}
		setMunicipalitiesList(arr2);
	}, [selectedProvince]);

	useEffect(() => {
		const parameters = {};
		if (selectedRegion) {
			parameters.selectedRegion = encodeURIComponent(selectedRegion.label);
		}
		if (selectedProvince) {
			parameters.selectedProvince = encodeURIComponent(selectedProvince.label);
		}
		if (selectedMunicipality) {
			parameters.selectedMunicipality = encodeURIComponent(selectedMunicipality.label);
		}
		if (typology) {
			parameters.typology = encodeURIComponent(typology.label);
		}
		if (dateFrom) {
			parameters.dateFrom = encodeURIComponent(dateFrom);
		}
		if (dateTo) {
			parameters.dateTo = encodeURIComponent(dateTo);
		}
		const temp = [];
		for (const key in parameters) {
			temp.push(key + "=" + parameters[key]);
		}
		const hashUrl = "#" + temp.join("&");
		location.replace(hashUrl);
	}, [selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo]);

	return (
		<Container className={classNames(styles.vizController)} fluid>
			<Row className={classNames("h-100")}>
				<Col className={classNames("h-100")} md={3} xl={3}>
					<ToolbarUI
						regions={{ items: regionsList, disabled: !regionsList.length }}
						selectedRegion={selectedRegion}
						setSelectedRegion={setSelectedRegion}
						provinces={{ items: provincesList, disabled: !provincesList.length }}
						selectedProvince={selectedProvince}
						setSelectedProvince={setSelectedProvince}
						municipalities={{ items: municipalitiesList, disabled: !municipalitiesList.length }}
						selectedMunicipality={selectedMunicipality}
						setSelectedMunicipality={setSelectedMunicipality}
						typologiesList={typologiesList}
						typology={typology}
						setTypology={setTypology}
						dateFrom={dateFrom}
						setDateFrom={setDateFrom}
						dateTo={dateTo}
						setDateTo={setDateTo}
					/>
				</Col>
				<Col className={classNames("h-100")}>
					{data && geographies && (
						<MapVentagli
							ventagli={data}
							geographies={geographies}
							selectedRegion={selectedRegion}
							selectedProvince={selectedProvince}
							selectedMunicipality={selectedMunicipality}
							typology={typology}
							dateFrom={dateFrom}
							dateTo={dateTo}
						/>
					)}
					{/* {data && <TestVentagli data={data} slice={slice} />} */}
				</Col>
			</Row>
		</Container>
	);
}
