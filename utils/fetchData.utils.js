const { DateTime, Interval } = require("luxon");
import { json } from "d3";

const apiBaseUrl = "https://wlm.inmagik.com";
const dataCacheMode = "default";
const geoCacheMode = "default";

const timeFrameData = {
  items: [
    {
      label: "Latest 7 days",
      getDateRange: (dateTo) => {
        const _dt = DateTime.fromISO(dateTo);
        const _dtISO = _dt.toISO().split("T")[0];
        const _df = _dt.minus({ days: 6 });
        const _dfISO = _df.toISO().split("T")[0];
        return [_dfISO, _dtISO];
      },
    },
    {
      label: "Latest 30 days",
      getDateRange: (dateTo) => {
        const _dt = DateTime.fromISO(dateTo);
        const _dtISO = _dt.toISO().split("T")[0];
        const _df = _dt.minus({ days: 29 });
        const _dfISO = _df.toISO().split("T")[0];
        return [_dfISO, _dtISO];
      },
    },
    {
      label: "Latest 12 months",
      getDateRange: (dateTo) => {
        const _dt = DateTime.fromISO(dateTo).endOf("month");
        const _dtISO = _dt.toISO().split("T")[0];
        const _df = _dt.minus({ months: 11 }).endOf("month");
        const _dfISO = _df.toISO().split("T")[0];
        return [_dfISO, _dtISO];
      },
    },
    {
      label: "Latest 5 years",
      getDateRange: (dateTo) => {
        const _dt = DateTime.fromISO(dateTo).endOf("year");
        const _dtISO = _dt.toISO().split("T")[0];
        const _df = _dt.minus({ years: 4 }).endOf("year");
        const _dfISO = _df.toISO().split("T")[0];
        return [_dfISO, _dtISO];
      },
    },
    {
      label: "All history",
      getDateRange: (maxDate) => {
        const _dt = DateTime.fromISO(maxDate).endOf("year");
        const _dtISO = _dt.toISO().split("T")[0];
        const _df = DateTime.fromISO("2012-09-01").endOf("year");
        const _dfISO = _df.toISO().split("T")[0];
        return [_dfISO, _dtISO];
      },
    },
    {
      label: "Custom interval",
      getDateRange: (dateFrom, dateTo) => {
        console.warn(
          "Custom interval getDateRange() should not be called, because calculated by VisualizationController component. If you see this there might be a problem."
        );
      },
    },
  ],
  disabled: false,
};

const dateRanges = {
  months: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ],
  monthsTxt: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
};

const explorationModes = [
  {
    label: "Wiki Loves Monuments",
    value: "wlm",
  },
  {
    label: "All Commons",
    value: "commons",
  },
];

const fetchData = (
  {
    explModeValue,
    selectedRegion,
    selectedProvince,
    selectedMunicipality,
    typology,
    dateFrom,
    dateTo,
  },
  setDataValue,
  setParentDataValue,
  setIsFetching,
  setTimeStep
) => {
  console.log("fetching data...");
  console.time("fetchData");
  setIsFetching(true);
  let dataUrl = apiBaseUrl;
  let parentDataUrl = apiBaseUrl;

  if (selectedMunicipality) {
    // in municipality
    dataUrl += `/api/municipality/${selectedMunicipality.code}/${explModeValue}/`;
    parentDataUrl += `/api/municipality/${selectedMunicipality.code}/${explModeValue}/`;
  } else if (selectedProvince) {
    // municipalities in province
    dataUrl += `/api/province/${selectedProvince.code}/${explModeValue}-areas/`;
    parentDataUrl += `/api/province/${selectedProvince.code}/${explModeValue}/`;
  } else if (selectedRegion) {
    // provinces in region
    dataUrl += `/api/region/${selectedRegion.code}/${explModeValue}-areas/`;
    parentDataUrl += `/api/region/${selectedRegion.code}/${explModeValue}/`;
  } else {
    // no area selected, do all italian regions
    dataUrl += `/api/region/${explModeValue}-regions/`;
    parentDataUrl += `/api/region/${explModeValue}-aggregate`;
  }

  if (dataUrl) {
    const _df = DateTime.fromISO(dateFrom);
    const _dt = DateTime.fromISO(dateTo);
    const i = Interval.fromDateTimes(_df, _dt);
    let max_steps = 15,
      step_size,
      step_unit;
    if (Math.ceil(i.length("days") / 1) <= 31) {
      step_unit = "days";
      step_size = 1;
    }
    // else if (Math.ceil(i.length("days") / 5) <= max_steps) {
    // 	step_unit = "days";
    // 	step_size = 5;
    // }
    // else if (Math.ceil(i.length("days") / 10) <= max_steps) {
    // 	step_unit = "days";
    // 	step_size = 10;
    // }
    else if (Math.ceil(i.length("months") / 1) <= max_steps) {
      step_unit = "months";
      step_size = 1;
    }
    // else if (Math.ceil(i.length("months") / 3) <= max_steps) {
    // 	step_unit = "months";
    // 	step_size = 3;
    // }
    // else if (Math.ceil(i.length("months") / 4) <= max_steps) {
    // 	step_unit = "months";
    // 	step_size = 4;
    // }
    // else if (Math.ceil(i.length("months") / 6) <= max_steps) {
    // 	step_unit = "months";
    // 	step_size = 6;
    // }
    else {
      step_unit = "years";
      step_size = 1;
    }
    const timeStep = [
      step_size,
      " ",
      step_size === 1 ? step_unit.replace("s", "") : step_unit,
    ].join("");
    setTimeStep(timeStep);

    const parameters = { step_size, step_unit };
    parameters.date_from = dateFrom;
    parameters.date_to = dateTo;
    if (typology) parameters.theme = typology.id;
    parameters.format = "json";

    const searchParams = new URLSearchParams(parameters).toString();
    dataUrl += "?" + searchParams;
    parentDataUrl += "?" + searchParams;

    Promise.all([
      json(dataUrl, {
        cache: dataCacheMode,
      }),
      json(parentDataUrl, {
        cache: dataCacheMode,
      }),
    ]).then(([data, parentData]) => {
      // console.log(data, parentData)
      setDataValue(data);
      setParentDataValue(parentData);
      setIsFetching(false);
      console.timeEnd("fetchData");
    });
  }
};

const controller = new AbortController();
const { signal } = controller;

const fetchGeoAndData = (fetchParams) => {
  // Abort request
  controller.abort();

  console.log("fetchGeoAndData", fetchParams);

  let dataUrl = apiBaseUrl;
  let parentDataUrl = apiBaseUrl;

  if (fetchParams.selectedMunicipality) {
    dataUrl += `/api/municipality/${fetchParams.selectedMunicipality.code}/${fetchParams.explorationMode.value}/`;
    parentDataUrl += `/api/municipality/${fetchParams.selectedMunicipality.code}/${fetchParams.explorationMode.value}/`;
  } else if (fetchParams.selectedProvince) {
    dataUrl += `/api/province/${fetchParams.selectedProvince.code}/${fetchParams.explorationMode.value}-areas/`;
    parentDataUrl += `/api/province/${fetchParams.selectedProvince.code}/${fetchParams.explorationMode.value}/`;
  } else if (fetchParams.selectedRegion) {
    dataUrl += `/api/region/${fetchParams.selectedRegion.code}/${fetchParams.explorationMode.value}-areas/`;
    parentDataUrl += `/api/region/${fetchParams.selectedRegion.code}/${fetchParams.explorationMode.value}/`;
  } else {
    // no area selected, do all italian regions
    dataUrl += `/api/region/${fetchParams.explorationMode.value}-regions/`;
    parentDataUrl += `/api/region/${fetchParams.explorationMode.value}-aggregate`;
  }

  const _df = DateTime.fromISO(fetchParams.dateFrom);
  const _dt = DateTime.fromISO(fetchParams.dateTo);
  const i = Interval.fromDateTimes(_df, _dt);
  let max_steps = 15,
    step_size,
    step_unit;
  if (Math.ceil(i.length("days") / 1) <= 31) {
    step_unit = "days";
    step_size = 1;
  } else if (Math.ceil(i.length("months") / 1) <= max_steps) {
    step_unit = "months";
    step_size = 1;
  } else {
    step_unit = "years";
    step_size = 1;
  }
  const timeStep = [
    step_size,
    " ",
    step_size === 1 ? step_unit.replace("s", "") : step_unit,
  ].join("");
  fetchParams.setTimeStep(timeStep);

  const parameters = { step_size, step_unit };
  parameters.date_from = fetchParams.dateFrom;
  parameters.date_to = fetchParams.dateTo;
  if (fetchParams.typology) parameters.theme = fetchParams.typology.id;
  parameters.format = "json";

  const searchParams = new URLSearchParams(parameters).toString();
  dataUrl += "?" + searchParams;
  parentDataUrl += "?" + searchParams;

  console.log("dataUrl", dataUrl);
  console.log("parentDataUrl", parentDataUrl);

  // pass {signal} to requests in order to get them cancelled

  // Promise.all([
  //   json(dataUrl, {
  //     cache: dataCacheMode,
  //   }),
  //   json(parentDataUrl, {
  //     cache: dataCacheMode,
  //   }),
  // ]).then(([data, parentData]) => {
  //   // console.log(data, parentData)
  //   setDataValue(data);
  //   setParentDataValue(parentData);
  //   setIsFetching(false);
  //   console.timeEnd("fetchData");
  // });
};

export {
  apiBaseUrl,
  fetchData,
  fetchGeoAndData,
  dataCacheMode,
  timeFrameData,
  dateRanges,
  geoCacheMode,
  explorationModes,
};
