import styles from "./VisualizationController.module.scss";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";
import TestVentagli from "../test-ventagli/TestVentagli";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import { ToolbarUI } from "../UI-Components";
import MapVentagli from "../MapVentagli/MapVentagli";
import { feature } from "topojson-client";
import { fetchData } from "../../utils/fetchData.utils";

// let _regionsList = [],
// 	_provincesList = [],
// 	_municipalitiesList = [];

const _typologiesList = [{ label: "All monuments" }, { label: "Fortificazioni" }, { label: "Quasi tutti" }, { label: "Una piccola parte" }];

export default function VisualizationController() {
	const { asPath } = useRouter();

	const [loading, setLoading] = useState(true); // changes will trigger initial data fetching and rendering
	const [ventagli, setVentagli] = useState();
	const [parentData, setParentData] = useState();
	const [filterData, setFilterData] = useState();

	// uses OSM admin levels for future compatibility
	const [lvl4, setLvl4] = useState([]); // Regions
	const [lvl6, setLvl6] = useState([]); // Provinces
	const [lvl8, setLvl8] = useState([]); // Municipalities

	const [regionsList, setRegionsList] = useState([]);
	const [provincesList, setProvincesList] = useState([]);
	const [municipalitiesList, setMunicipalitiesList] = useState([]);
	const [typologiesList, setTypologiesList] = useState([]);

	const [selectedRegion, setSelectedRegion] = useState();
	const [selectedProvince, setSelectedProvince] = useState();
	const [selectedMunicipality, setSelectedMunicipality] = useState();
	const [typology, setTypology] = useState();
	const [dateFrom, setDateFrom] = useState("2012-09-01");
	const [dateTo, setDateTo] = useState("2022-09-01");

	// Decode URL and load data
	useEffect(() => {
		const requests = [d3.json("https://wlm.inmagik.com/api/region/geo/?format=json")];
		Promise.all(requests).then(([geographiesRegions]) => {
			const fetchedTypologiesList = _typologiesList;
			setTypologiesList(fetchedTypologiesList);

			setLvl4(geographiesRegions.features);
			const _regionsList = geographiesRegions.features.map((d) => ({
				label: d.properties.name,
				code: d.properties.code,
			}));
			setRegionsList(_regionsList);

			// Decode URL
			const paramString = asPath.split("#")[1];
			let vizParameters = {};
			if (paramString) {
				vizParameters = Object.fromEntries(paramString.split("&").map((d) => d.split("=").map((dd) => decodeURIComponent(dd))));
			}

			const { typology, dateFrom, dateTo, selectedRegion, selectedProvince, selectedMunicipality } = vizParameters;

			if (typology) {
				const correspondingType = fetchedTypologiesList.find((d) => d.label === typology);
				setTypology(correspondingType);
			}
			if (dateFrom) setDateFrom(dateFrom);
			if (dateTo) setDateTo(dateTo);

			if (selectedRegion) {
				const regionItem = _regionsList.find((d) => d.label === selectedRegion);
				setSelectedRegion(regionItem);
				d3.json(`https://wlm.inmagik.com/api/region/${regionItem.code}/areas/?format=json`).then((geographiesProvinces) => {
					setLvl6(geographiesProvinces.features);
					const _provincesList = geographiesProvinces.features.map((d) => ({
						label: d.properties.name,
						code: d.properties.code,
					}));
					setProvincesList(_provincesList);

					if (selectedProvince) {
						const provinceItem = _provincesList.find((d) => d.label === selectedProvince);
						setSelectedProvince(provinceItem);

						d3.json(`https://wlm.inmagik.com/api/province/${provinceItem.code}/areas/?format=json`).then((geographiesMunicipalities) => {
							setLvl8(geographiesMunicipalities.features);
							const _municipalitiesList = geographiesMunicipalities.features.map((d) => ({
								label: d.properties.name,
								code: d.properties.code,
							}));
							setMunicipalitiesList(_municipalitiesList);
							if (selectedMunicipality) {
								const municipalityItem = _municipalitiesList.find((d) => d.label === selectedMunicipality);
								setSelectedMunicipality(municipalityItem);
								// Could fetch more data here and then set loading to false
								setLoading(false);
							} else {
								setLoading(false);
							}
						});
					} else {
						setLoading(false);
					}
				});
			} else {
				setLoading(false);
			}
		});
	}, []);

	useEffect(() => {
		if (selectedRegion && !loading) {
			d3.json(`https://wlm.inmagik.com/api/region/${selectedRegion.code}/areas/?format=json`).then((geographiesProvinces) => {
				setLvl6(geographiesProvinces.features);
				const _provincesList = geographiesProvinces.features.map((d) => ({
					label: d.properties.name,
					code: d.properties.code,
				}));
				setProvincesList(_provincesList);
			});
		} else {
			setLvl6([]);
			setProvincesList([]);
		}
	}, [selectedRegion]);

	useEffect(() => {
		if (selectedProvince && !loading) {
			d3.json(`https://wlm.inmagik.com/api/province/${selectedProvince.code}/areas/?format=json`).then((geographiesMunicipalities) => {
				setLvl8(geographiesMunicipalities.features);
				const _municipalitiesList = geographiesMunicipalities.features.map((d) => ({
					label: d.properties.name,
					code: d.properties.code,
				}));
				setMunicipalitiesList(_municipalitiesList);
			});
		} else {
			setLvl8([]);
			setMunicipalitiesList([]);
		}
	}, [selectedProvince]);

	// Set parameters and fetch data
	useEffect(() => {
		const parameters = {};
		const parametersFetchData = {};
		if (selectedRegion) {
			parameters.selectedRegion = encodeURIComponent(selectedRegion.label);
			parametersFetchData.selectedRegion = selectedRegion;
		}
		if (selectedProvince) {
			parameters.selectedProvince = encodeURIComponent(selectedProvince.label);
			parametersFetchData.selectedProvince = selectedProvince;
		}
		if (selectedMunicipality) {
			parameters.selectedMunicipality = encodeURIComponent(selectedMunicipality.label);
			parametersFetchData.selectedMunicipality = selectedMunicipality;
		}
		if (typology) {
			parameters.typology = encodeURIComponent(typology.label);
			parametersFetchData.typology = typology;
		}
		if (dateFrom) {
			parameters.dateFrom = encodeURIComponent(dateFrom);
			parametersFetchData.dateFrom = dateFrom;
		}
		if (dateTo) {
			parameters.dateTo = encodeURIComponent(dateTo);
			parametersFetchData.dateTo = dateTo;
		}
		const temp = [];
		for (const key in parameters) {
			temp.push(key + "=" + parameters[key]);
		}
		const hashUrl = "#" + temp.join("&");
		location.replace(hashUrl);

		if (!loading) {
			fetchData(parametersFetchData, setVentagli, setParentData);
		}
	}, [selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo, loading]);

	useEffect(() => {
		if (parentData) {
			const _filterData = parentData.extent.map((d) => ({ label: d.label, active: d.active || true }));
			setFilterData(_filterData);
		}
	}, [parentData]);

	const filteredVentagli = useMemo(() => {
		console.log("filteredVentagli Memo")
		if (filterData && ventagli) {
			// console.log("filterData", filterData);
			// console.log("ventagli", ventagli);
			const newVentagli = JSON.parse(JSON.stringify(ventagli));
			filterData
				.filter((f) => !f.active)
				.forEach((f) => {
					console.log("Remove",f.label)
					// remove from data
					newVentagli.data.forEach((area) => {
						area.history.forEach((date) => {
							const arr = date.groups;
							const elm = arr.find((e) => e.label === f.label);
							const index = arr.indexOf(elm);
							if (index > -1) arr.splice(index, 1);
						});
					});
					//remove from extent
					const elm = newVentagli.extent.find((e) => e.label === f.label);
					const index = newVentagli.extent.indexOf(elm);
					if (index > -1) newVentagli.extent.splice(index, 1);
				});
			return newVentagli;
		} else {
			return undefined
		}
	}, [filterData, ventagli]);

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
						parentData={parentData}
						filterData={filterData}
						setFilterData={setFilterData}
					/>
				</Col>
				<Col className={classNames("h-100")}>
					<>
						{!loading && filteredVentagli && (
							<MapVentagli
								ventagli={filteredVentagli}
								lvl4={lvl4}
								lvl6={lvl6}
								lvl8={lvl8}
								selectedRegion={selectedRegion}
								selectedProvince={selectedProvince}
								selectedMunicipality={selectedMunicipality}
								typology={typology}
								dateFrom={dateFrom}
								dateTo={dateTo}
							/>
						)}
						{loading && <p>Loading data</p>}
					</>
					{/* {data && <TestVentagli data={data} slice={slice} />} */}
				</Col>
			</Row>
		</Container>
	);
}
