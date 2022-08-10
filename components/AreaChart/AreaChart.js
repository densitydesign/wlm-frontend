import styles from "./AreaChart.module.scss";
import classNames from "classnames";
export default function AreaChart({ data }) {
	return <div className={classNames(styles.areaChart)}>area {data.data[0].history.map(h=><p>{h.date}</p>)}</div>;
}
