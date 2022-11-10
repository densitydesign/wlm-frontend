import styles from "./DataViewerController.module.scss";
import { useEffect, useState } from "react";
import {
  apiBaseUrl,
  timeFrameData,
  explorationModes,
  fetchGeoAndData,
  dateRanges,
} from "../../utils/fetchData.utils";
import { readParams } from "../../utils/urlParameters.utils";
import * as d3 from "d3";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import MapSidebar from "../MapSidebar/MapSidebar";
import { DateTime } from "luxon";
export default function DataViewerController() {
  // routing
  const { asPath } = useRouter();
  // parameters
  const [initialized, setInitialized] = useState(false);
  const [explorationMode, setExplorationMode] = useState();
  const [filterData, setFilterData] = useState();
  const [showDelta, setShowDelta] = useState();
  const [typology, setTypology] = useState();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedMunicipality, setSelectedMunicipality] = useState();
  // data for UI
  const [regionsList, setRegionsList] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [typologiesList, setTypologiesList] = useState([]);
  const [minDate, setMinDate] = useState(); // should be "2012-01-01"
  const [maxDate, setMaxDate] = useState();
  const [timeStep, setTimeStep] = useState();
  const [startMonth, setStartMonth] = useState();
  const [startYear, setStartYear] = useState();
  const [endMonth, setEndMonth] = useState();
  const [endYear, setEndYear] = useState();
  // data for visualization
  const [data, setData] = useState(); // includes "ventagliData" and "parentData"
  const [lvl4, setLvl4] = useState([]); // Regions
  const [lvl6, setLvl6] = useState([]); // Provinces
  const [lvl8, setLvl8] = useState([]); // Municipalities

  // intialization
  useEffect(() => {
    console.log("intialization");
    Promise.all([
      d3.json(apiBaseUrl + "/api/domain/?format=json"),
      d3.json(apiBaseUrl + "/api/region/geo/?format=json"),
    ]).then(([domain, regionsGeojson]) => {
      setMinDate("2012-01-01");
      setMaxDate(domain.last_snapshot);
      setTypologiesList(domain.themes);
      setLvl4(regionsGeojson.features);
      const _regionsList = regionsGeojson.features.map((d) => ({
        label: d.properties.name,
        code: d.properties.code,
      }));
      setRegionsList(_regionsList);

      const {
        explorationModePar,
        filterDataParams,
        showDeltaPar,
        typology,
        selectedTimeFramePar,
        dateFrom,
        dateTo,
        selectedRegion,
        selectedProvince,
        selectedMunicipality,
      } = readParams(asPath);
      let _explorationMode;
      if (explorationModePar) {
        _explorationMode = explorationModes.find(
          (d) => d.value == explModeValue
        );
      } else {
        _explorationMode = explorationModes[0];
      }
      setExplorationMode(_explorationMode);

      let _filterData;
      if (filterDataParams) {
        _filterData = filterDataParams
          .split(";")
          .map((d) => d.split("="))
          .map((d) => ({ label: d[0], active: d[1] === "true" }));
        setFilterData(_filterData);
      }
      let _showDelta = showDeltaPar === "true";
      setShowDelta(_showDelta);

      let _typology;
      if (typology) {
        _typology = domain.themes.find((d) => d.id == typology);
        setTypology(_typology);
      }

      let _selectedTimeFrame;
      if (selectedTimeFramePar) {
        _selectedTimeFrame = timeFrameData.items.find(
          (d) => d.label === selectedTimeFramePar
        );
      } else {
        _selectedTimeFrame = timeFrameData.items[0];
      }
      setSelectedTimeFrame(_selectedTimeFrame);

      let _dateFrom;
      if (dateFrom) {
        _dateFrom = dateFrom;
      } else {
        const dateRange = selectedTimeFrame.getDateRange(domain.last_snapshot);
        _dateFrom = dateRange[0];
      }
      setDateFrom(_dateFrom);

      let _dateTo;
      if (dateTo) {
        _dateTo = dateTo;
      } else {
        _dateTo = domain.last_snapshot;
      }
      setDateTo(_dateTo);
      let _selectedRegion, _selectedProvince, _selectedMunicipality;
      const initFetchOptions = {
        explorationMode: _explorationMode,
        typology: _typology,
        dateFrom: _dateFrom,
        dateTo: _dateTo,
        setTimeStep,
      };
      // Check selected areas and set loading to false to trigger data fetching
      if (selectedRegion) {
        _selectedRegion = _regionsList.find((d) => d.label === selectedRegion);
        setSelectedRegion(_selectedRegion);
        initFetchOptions.selectedRegion = _selectedRegion;
        d3.json(
          apiBaseUrl + `/api/region/${_selectedRegion.code}/areas/?format=json`
        ).then((ProvincesGeojson) => {
          setLvl6(ProvincesGeojson.features);
          const _provincesList = ProvincesGeojson.features.map((d) => ({
            label: d.properties.name,
            code: d.properties.code,
          }));
          setProvincesList(_provincesList);
          if (selectedProvince) {
            _selectedProvince = _provincesList.find(
              (d) => d.label === selectedProvince
            );
            setSelectedProvince(_selectedProvince);
            initFetchOptions.selectedProvince = _selectedProvince;
            d3.json(
              apiBaseUrl +
                `/api/province/${_selectedProvince.code}/areas/?format=json`
            ).then((MunicipalitiesGeoJson) => {
              setLvl8(MunicipalitiesGeoJson.features);
              const _municipalitiesList = MunicipalitiesGeoJson.features.map(
                (d) => ({
                  label: d.properties.name,
                  code: d.properties.code,
                })
              );
              setMunicipalitiesList(_municipalitiesList);
              if (selectedMunicipality) {
                _selectedMunicipality = _municipalitiesList.find(
                  (d) => d.label === selectedMunicipality
                );
                setSelectedMunicipality(_selectedMunicipality);
                initFetchOptions.selectedMunicipality = _selectedMunicipality;
                // fetch data with available parameters
                fetchGeoAndData(initFetchOptions);
                setInitialized(true);
              } else {
                // fetch data with available parameters
                fetchGeoAndData(initFetchOptions);
                setInitialized(true);
              }
            });
          } else {
            // fetch data with available parameters
            fetchGeoAndData(initFetchOptions);
            setInitialized(true);
          }
        });
      } else {
        // fetch data with available parameters
        fetchGeoAndData(initFetchOptions);
        setInitialized(true);
      }
    });
  }, []);

  // Handle temporal parameters
  useEffect(() => {
    if (dateFrom) {
      setStartMonth({ label: dateFrom.split("-")[1] });
      setStartYear({ label: dateFrom.split("-")[0] });
    }
  }, [dateFrom]);

  useEffect(() => {
    if (
      startYear &&
      startMonth &&
      selectedTimeFrame.label === "Custom interval"
    ) {
      const newDateFrom = DateTime.fromObject({
        year: startYear.label,
        month: startMonth.label,
      })
        .endOf("month")
        .toISODate();
      if (dateFrom !== newDateFrom) {
        setDateFrom(newDateFrom);
      }
      if (dateFrom !== newDateFrom) {
        setDateFrom(newDateFrom);
      }
    }
  }, [startMonth, startYear]);

  useEffect(() => {
    if (dateTo) {
      setEndMonth({ label: dateTo.split("-")[1] });
      setEndYear({ label: dateTo.split("-")[0] });
    }
  }, [dateTo]);

  useEffect(() => {
    if (endYear && endMonth && selectedTimeFrame.label === "Custom interval") {
      const tempDate = DateTime.fromObject({
        year: endYear.label,
        month: endMonth.label,
      }).endOf("month");
      const useMaxDate = tempDate > DateTime.fromISO(maxDate);
      const newDateTo = useMaxDate ? maxDate : tempDate.toISODate();
      if (dateTo !== newDateTo) {
        setDateTo(newDateTo);
      }
    }
  }, [endMonth, endYear]);

  useEffect(() => {
    if (dateTo && maxDate) {
      if (selectedTimeFrame.label !== "Custom interval") {
        const dateRange = selectedTimeFrame.getDateRange(maxDate);
        if (dateRange[0] !== dateFrom) setDateFrom(dateRange[0]);
        if (dateRange[1] !== dateTo) setDateTo(dateRange[1]);
      }
    }
  }, [selectedTimeFrame]);

  // function for fetching data
  const handleParameterChange = () => {
    // will update url params
    // fetch data
    const fetchParams = {
      explorationMode,
      typology,
      dateFrom,
      dateTo,
      selectedRegion,
      selectedProvince,
      selectedMunicipality,
      setTimeStep,
    };
    fetchGeoAndData(fetchParams);
  };

  useEffect(() => {
    if (initialized) {
      console.log("Parameter change after initialization");
      handleParameterChange();
    }
  }, [
    explorationMode,
    typology,
    dateFrom,
    dateTo,
    selectedRegion,
    selectedProvince,
    selectedMunicipality,
  ]);

  const allStates = {
    explorationMode,
    explorationModes,
    setExplorationMode,
    filterData,
    setFilterData,
    showDelta,
    setShowDelta,
    typology,
    setTypology,
    selectedTimeFrame,
    setSelectedTimeFrame,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    selectedRegion,
    setSelectedRegion,
    selectedProvince,
    setSelectedProvince,
    selectedMunicipality,
    setSelectedMunicipality,
    // data for UI
    regionsList,
    setRegionsList,
    regions: { items: regionsList, disabled: !regionsList.length },
    provincesList,
    setProvincesList,
    provinces: {
      items: provincesList,
      disabled: !provincesList.length,
    },
    municipalitiesList,
    setMunicipalitiesList,
    municipalities: {
      items: municipalitiesList,
      disabled: !municipalitiesList.length,
    },
    typologiesList,
    setTypologiesList,
    timeFrameData,
    dateRanges,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    timeStep,
    setTimeStep,
    startMonth,
    setStartMonth,
    startYear,
    setStartYear,
    endMonth,
    setEndMonth,
    endYear,
    setEndYear,
    // data for visualization
    data,
    setData,
    lvl4,
    setLvl4,
    lvl6,
    setLvl6,
    lvl8,
    setLvl8,
  };

  return (
    <Container className={classNames("vh-100")} fluid>
      <Row className={classNames("h-100")}>
        <Col className={classNames("h-100", "pe-sm-3", "pe-md-0")} lg={3}>
          <MapSidebar {...allStates} />
        </Col>
        <Col className={classNames("h-100", "position-relative")}>
          Visualization
        </Col>
      </Row>
    </Container>
  );
}
