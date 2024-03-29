import styles from "./DataViewerController.module.scss";
import { useEffect, useState } from "react";
import {
  apiBaseUrl,
  timeFrameData,
  explorationModes,
  fetchGeoAndData,
  dateRanges,
} from "../../utils/fetchData.utils";
import { readParams, writeParams } from "../../utils/urlParameters.utils";
import * as d3 from "d3";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import MapSidebar from "../MapSidebar/MapSidebar";
import { DateTime } from "luxon";
import NavMenu from "../NavMenu";
import QuickLinks from "../QuickLinks/QuickLinks";
import Map from "../Map";
import { Fetching } from "../Fetching";
import { cloneDeep as _cloneDeep } from "lodash";
import { groups } from "d3";
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
  const [isFetching, setIsFetching] = useState(false);
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
  const [dataToUse, setDataToUse] = useState();
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

      const firstYear = DateTime.fromISO("2012-01-01").year;
      const latestYear = DateTime.fromISO(domain.last_snapshot).year;
      const years = [];
      for (var year = firstYear; year <= latestYear; year++) years.push(year);
      dateRanges.years = years;

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
        typologyId,
        selectedTimeFrameLabel,
        dateFrom,
        dateTo,
        selectedRegionLabel,
        selectedProvinceLabel,
        selectedMunicipalityLabel,
      } = readParams(asPath);
      let _explorationMode;
      if (explorationModePar) {
        _explorationMode = explorationModes.find(
          (d) => d.value == explorationModePar
        );
      } else {
        _explorationMode = explorationModes[0];
      }
      setExplorationMode(_explorationMode);

      let _filterData;
      if (filterDataParams) {
        _filterData = filterDataParams
          .split(";")
          .map((d) => d.split(":"))
          .map((d) => ({ label: d[0], active: d[1] === "true" }));
        setFilterData(_filterData);
      }
      let _showDelta = showDeltaPar === "true";
      setShowDelta(_showDelta);

      let _typology;
      if (typologyId) {
        _typology = domain.themes.find((d) => d.id == typologyId);
        setTypology(_typology);
      }

      let _selectedTimeFrame;
      if (selectedTimeFrameLabel) {
        _selectedTimeFrame = timeFrameData.items.find(
          (d) => d.label === selectedTimeFrameLabel
        );
      } else {
        _selectedTimeFrame = timeFrameData.items[3];
      }
      setSelectedTimeFrame(_selectedTimeFrame);

      let _dateFrom;
      if (dateFrom) {
        _dateFrom = dateFrom;
      } else {
        const dateRange = _selectedTimeFrame.getDateRange(domain.last_snapshot);
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
        filterData: _filterData,
        setInitialized,
        setIsFetching,
        setTimeStep,
        setData,
        setLvl6,
        setProvincesList,
        setLvl8,
        setMunicipalitiesList,
        setFilterData,
      };

      if (selectedRegionLabel) {
        _selectedRegion = _regionsList.find(
          (d) => d.label === selectedRegionLabel
        );
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
          if (selectedProvinceLabel) {
            _selectedProvince = _provincesList.find(
              (d) => d.label === selectedProvinceLabel
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
              if (selectedMunicipalityLabel) {
                _selectedMunicipality = _municipalitiesList.find(
                  (d) => d.label === selectedMunicipalityLabel
                );
                setSelectedMunicipality(_selectedMunicipality);
                initFetchOptions.selectedMunicipality = _selectedMunicipality;
                fetchGeoAndData(initFetchOptions);
              } else {
                // no selectedMunicipality
                fetchGeoAndData(initFetchOptions);
              }
            });
          } else {
            // no selectedProvince
            fetchGeoAndData(initFetchOptions);
          }
        });
      } else {
        // no selectedRegion
        fetchGeoAndData(initFetchOptions);
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

  // Handle delta and filters change
  const dataFiltering = (dataGroup) => {
    filterData // can be ventagliData or parentData
      .filter((f) => !f.active)
      .forEach((f) => {
        // remove from data
        dataGroup.data.forEach((area) => {
          area.history.forEach((date) => {
            const groups = date.groups;
            groups.forEach((group, i) => {
              group.diffValue =
                i == 0 ? group.value : group.value - groups[i - 1].value;
            });
            const elm = groups.find((e) => e.label === f.label);
            const index = groups.indexOf(elm);
            if (index > -1) groups.splice(index, 1);
          });
        });
        //remove from extent
        const elm = dataGroup.extent.find((e) => e.label === f.label);
        const index = dataGroup.extent.indexOf(elm);
        if (index > -1) dataGroup.extent.splice(index, 1);
      });
    return dataGroup;
  };
  const dataMakeDelta = (dataGroup) => {
    // console.log(dataGroup);
    let data = dataGroup.data;
    let extent = dataGroup.extent.map((g) => ({
      ...g,
      value: [0, 0],
    }));

    data.forEach((area) => {
      const prevGroups = area.previous.groups;
      area.history.forEach((date, i) => {
        date.groups.forEach((g, ii) => {
          if (g.absoluteValue) {
            // delta already calculated
            return;
          }
          g.absoluteValue = 0 + g.value; // avoid references
          const baseline = prevGroups.find((pg) => pg.label === g.label);
          if (baseline.value > g.value) {
            console.warn(
              "There is a problem in the calculation of delta values."
            );
            console.log("date", date);
            console.log("previous", area.previous);
          }
          const newValue = g.value - baseline.value;
          g.value = newValue;
          if (extent[ii].value[0] > g.value) extent[ii].value[0] = g.value;
          if (extent[ii].value[1] < g.value) extent[ii].value[1] = g.value;
        });
      });
    });
    return { data, extent };
  };
  const modifyData = (data) => {
    const _data = _cloneDeep(data);
    let ventagliData = dataFiltering(_data.ventagliData);
    let parentData = dataFiltering(_data.parentData);
    if (showDelta) {
      ventagliData = dataMakeDelta(ventagliData);
      parentData = dataMakeDelta(parentData);
    }
    setDataToUse({ ventagliData, parentData });
  };
  useEffect(() => {
    if (initialized) {
      modifyData(data);
      writeParams({
        explorationMode,
        filterData,
        showDelta,
        typology,
        selectedTimeFrame,
        dateFrom,
        dateTo,
        selectedRegion,
        selectedProvince,
        selectedMunicipality,
      });
    }
  }, [filterData, showDelta, data]);

  // fetching data
  const handleParameterChange = () => {
    // will update url params
    writeParams({
      explorationMode,
      filterData,
      showDelta,
      typology,
      selectedTimeFrame,
      dateFrom,
      dateTo,
      selectedRegion,
      selectedProvince,
      selectedMunicipality,
    });
    // fetch data
    const fetchParams = {
      explorationMode,
      typology,
      dateFrom,
      dateTo,
      selectedRegion,
      selectedProvince,
      selectedMunicipality,
      filterData,
      setInitialized,
      setIsFetching,
      setTimeStep,
      setData,
      setLvl6,
      setProvincesList,
      setLvl8,
      setMunicipalitiesList,
      setFilterData,
    };
    fetchGeoAndData(fetchParams);
  };
  useEffect(() => {
    if (initialized) {
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
    initialized,
    setInitialized,
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
    isFetching,
    setIsFetching,
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
    data: dataToUse || data,
    setData: setDataToUse,
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
        <Col className={classNames("h-100", "p-2")} lg={3}>
          <NavMenu />
          <QuickLinks />
          <MapSidebar {...allStates} data={_cloneDeep(allStates.data)} />
        </Col>
        <Col
          className={classNames("h-100", "position-relative", "p-2", "px-0")}
        >
          {initialized && (
            <Map {...allStates} data={_cloneDeep(allStates.data)} />
          )}
          {!initialized && <Fetching />}
        </Col>
      </Row>
    </Container>
  );
}
