import styles from "./VisualizationController.module.scss";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import { ToolbarUI } from "../UI-Components";
import MapVentagli from "../MapVentagli/MapVentagli";
import { Fetching } from "../Fetching";
import { apiBaseUrl, fetchData, cacheMode } from "../../utils/fetchData.utils";
import LicenseAttribution from "../LicenseAttribution/LicenseAttribution";

export default function VisualizationController() {
	const { asPath } = useRouter();

	const [loading, setLoading] = useState(true); // changes will trigger initial data fetching and rendering
	const [isFetching, setIsFetching] = useState(false);
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

	const [minDate, setMinDate] = useState("2012-01-01");
	const [dateFrom, setDateFrom] = useState();
	const [maxDate, setMaxDate] = useState();
	const [dateTo, setDateTo] = useState();
	const [timeStep, setTimeStep] = useState();

	// Decode URL, load geographies and domain (themes + max date)
	useEffect(() => {
		const requests = [
			d3.json(apiBaseUrl + "/api/region/geo/?format=json", {
				cache: cacheMode,
			}),
			d3.json(apiBaseUrl + "/api/domain/?format=json", {
				cache: cacheMode,
			}),
		];
		Promise.all(requests).then(([geographiesRegions, domain]) => {
			// set max date
			setMaxDate(domain.last_snapshot);

			// set themes list (typologies)
			const fetchedTypologiesList = domain.themes;
			setTypologiesList(fetchedTypologiesList);

			// set lvl4 (regions)
			setLvl4(geographiesRegions.features);
			const _regionsList = geographiesRegions.features.map((d) => ({
				label: d.properties.name,
				code: d.properties.code,
			}));
			setRegionsList(_regionsList);

			// Decode URL before checking selected areas
			const paramString = asPath.split("#")[1];
			let vizParameters = {};
			if (paramString) {
				vizParameters = Object.fromEntries(paramString.split("&").map((d) => d.split("=").map((dd) => decodeURIComponent(dd))));
			}
			const { typology, dateFrom, dateTo, selectedRegion, selectedProvince, selectedMunicipality, filterDataParams } = vizParameters;

			if (typology) {
				const correspondingType = fetchedTypologiesList.find((d) => d.id == typology);
				setTypology(correspondingType);
			}
			if (dateFrom) {
				setDateFrom(dateFrom);
			} else {
				setDateFrom(minDate);
			}
			if (dateTo) {
				setDateTo(dateTo);
			} else {
				setDateTo(domain.last_snapshot);
			}
			if (filterDataParams) {
				const decoded_filterData = filterDataParams
					.split(";")
					.map((d) => d.split(":"))
					.map((d) => ({ label: d[0], active: d[1] === "true" }));
				setFilterData(decoded_filterData);
			}

			// Check selected areas and set loading to false to trigger data fetching
			if (selectedRegion) {
				const regionItem = _regionsList.find((d) => d.label === selectedRegion);
				setSelectedRegion(regionItem);
				d3.json(apiBaseUrl + `/api/region/${regionItem.code}/areas/?format=json`, {
					cache: cacheMode,
				}).then((geographiesProvinces) => {
					setLvl6(geographiesProvinces.features);
					const _provincesList = geographiesProvinces.features.map((d) => ({
						label: d.properties.name,
						code: d.properties.code,
					}));
					setProvincesList(_provincesList);

					if (selectedProvince) {
						const provinceItem = _provincesList.find((d) => d.label === selectedProvince);
						setSelectedProvince(provinceItem);

						d3.json(apiBaseUrl + `/api/province/${provinceItem.code}/areas/?format=json`, {
							cache: cacheMode,
						}).then((geographiesMunicipalities) => {
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
			d3.json(apiBaseUrl + `/api/region/${selectedRegion.code}/areas/?format=json`).then((geographiesProvinces) => {
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
			d3.json(apiBaseUrl + `/api/province/${selectedProvince.code}/areas/?format=json`).then((geographiesMunicipalities) => {
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

	useEffect(() => {
		if (parentData) {
			const _filterData = parentData.extent.reverse().map((d) => {
				let active = true;
				if (filterData) {
					active = filterData.find((f) => f.label === d.label).active;
				}
				return {
					label: d.label,
					active: active,
				};
			});
			setFilterData(_filterData);
		}
	}, [parentData]);

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
			parameters.typology = encodeURIComponent(typology.id);
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
			fetchData(parametersFetchData, setVentagli, setParentData, setIsFetching, setTimeStep);
		}
	}, [selectedRegion, selectedProvince, selectedMunicipality, typology, dateFrom, dateTo, loading]);

	useEffect(() => {
		if (filterData) {
			const temp_obj = Object.fromEntries(
				location.hash
					.split("#")[1]
					.split("&")
					.map((d) => d.split("=").map((dd) => decodeURIComponent(dd)))
			);
			temp_obj.filterDataParams = encodeURIComponent(filterData.map((d) => d.label + ":" + d.active.toString()).join(";"));
			const temp = [];
			for (const key in temp_obj) {
				temp.push(key + "=" + temp_obj[key]);
			}
			const newHashPath = "#" + temp.join("&");
			location.replace(newHashPath);
		}
	}, [filterData]);

	const filteredVentagli = useMemo(() => {
		if (filterData && ventagli) {
			const newVentagli = JSON.parse(JSON.stringify(ventagli));
			filterData
				.filter((f) => !f.active)
				.forEach((f) => {
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
			return undefined;
		}
	}, [filterData, ventagli]);

	return (
		<Container className={classNames(styles.vizController)} fluid>
			<Row className={classNames("h-100")}>
				<Col className={classNames("h-100", "pe-0")} md={3} xl={3}>
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
						minDate={minDate}
						dateFrom={dateFrom}
						setDateFrom={setDateFrom}
						maxDate={maxDate}
						dateTo={dateTo}
						setDateTo={setDateTo}
						timeStep={timeStep}
						parentData={parentData}
						filterData={filterData}
						setFilterData={setFilterData}
					/>
				</Col>
				<Col className={classNames("h-100", "position-relative")}>
					<>
						{!loading && filteredVentagli && (
							<MapVentagli
								ventagli={filteredVentagli}
								lvl4={lvl4}
								lvl6={lvl6}
								lvl8={lvl8}
								selectedRegion={selectedRegion}
								setSelectedRegion={setSelectedRegion}
								selectedProvince={selectedProvince}
								setSelectedProvince={setSelectedProvince}
								selectedMunicipality={selectedMunicipality}
								setSelectedMunicipality={setSelectedMunicipality}
								typology={typology}
								dateFrom={dateFrom}
								dateTo={dateTo}
								isFetching={isFetching}
							/>
						)}
						<LicenseAttribution />
						{(loading || isFetching) && <Fetching />}
					</>
				</Col>
			</Row>
		</Container>
	);
}
