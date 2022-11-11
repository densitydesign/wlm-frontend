import styles from "./AreaChart.module.scss";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import {
  initialize as init_areaChart,
  update as update_areaChart,
} from "./AreaChart.render";
import { Fetching } from "../Fetching";

export default function AreaChart({
  data,
  filterData,
  showDelta,
  timeStep,
  isFetching,
}) {
  const svgEl = useRef();

  useEffect(() => {
    init_areaChart(svgEl.current);
  }, []);

  useEffect(() => {
    if (!data || !filterData) return;
    update_areaChart(data, filterData, showDelta, timeStep);
  }, [data, filterData, showDelta, timeStep]);

  return (
    <div
      className={classNames(
        styles.areaChart,
        "position-relative",
        "rounded",
        "overflow-hidden"
      )}
    >
      <svg ref={svgEl}>
        <defs>
          <clipPath id="cut-off">
            <rect />
          </clipPath>
        </defs>
      </svg>
      {isFetching && <Fetching />}
    </div>
  );
}
