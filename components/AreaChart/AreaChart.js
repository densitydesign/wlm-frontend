import styles from "./AreaChart.module.scss";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import {
  initialize as init_areaChart,
  update as update_areaChart,
} from "./AreaChart.render";

export default function AreaChart({ data, filterData, showDelta, timeStep }) {
  const svgEl = useRef();

  useEffect(() => {
    init_areaChart(svgEl.current);
  }, []);

  useEffect(() => {
    update_areaChart(data, filterData, showDelta, timeStep);
  }, [data, filterData, showDelta, timeStep]);

  return (
    <div className={classNames(styles.areaChart)}>
      <svg ref={svgEl}>
        <defs>
          <clipPath id="cut-off">
            <rect x="0" y="0" width="150" height="150" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
