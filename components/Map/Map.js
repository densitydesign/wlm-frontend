import styles from "./Map.module.scss";
import classNames from "classnames";
import { useRef, useEffect, useLayoutEffect } from "react";
import { initialize, update } from "./Map.render";
import { Fetching } from "../Fetching";

export default function Map({
  data,
  lvl4,
  lvl6,
  lvl8,
  selectedRegion,
  selectedProvince,
  selectedMunicipality,
  setSelectedRegion,
  setSelectedProvince,
  setSelectedMunicipality,
  typology,
  dateFrom,
  dateTo,
  showDelta,
  timeStep,
  viewbox,
  isFetching,
	filterData
}) {
  const svgEl = useRef();

  useLayoutEffect(() => {
    const data_for_viz = {
      data,
      lvl4,
      lvl6,
      lvl8,
      selectedRegion,
      selectedProvince,
      selectedMunicipality,
      setSelectedRegion,
      setSelectedProvince,
      setSelectedMunicipality,
      typology,
      dateFrom,
      dateTo,
      viewbox,
			filterData
    };
    if (selectedProvince && lvl6.length === 0) {
      console.log("No render");
    }
    initialize(svgEl.current, data_for_viz);
  }, []);

  useLayoutEffect(() => {
    const data_for_viz = {
      data,
      lvl4,
      lvl6,
      lvl8,
      selectedRegion,
      selectedProvince,
      selectedMunicipality,
      setSelectedRegion,
      setSelectedProvince,
      setSelectedMunicipality,
      typology,
      dateFrom,
      dateTo,
      showDelta,
      viewbox,
      timeStep,
    };
    update(data_for_viz);
  }, [data, lvl4, lvl6, lvl8]);

  const svg_ns = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlnsXlink":"http://www.w3.org/1999/xlink",
    version: "1.1",
  };

  return (
    <div className={classNames(styles.map, "position-relative", "w-100", "h-100")}>
      <svg {...svg_ns} ref={svgEl}>
        <linearGradient
          id="tick-background"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0" />
        </linearGradient>
      </svg>
      {isFetching && <Fetching />}
    </div>
  );
}