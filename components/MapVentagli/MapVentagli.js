import styles from "./MapVentagli.module.scss";
import classNames from "classnames";
import { useRef, useEffect } from "react";
import { initialize, update } from "./MapVentagli.render";

export default function MapVentagli({ data }) {
	const svgEl = useRef();

	useEffect(() => {
		if (data) initialize(svgEl.current, data);
	}, [data]);

	return (
		<div className={classNames(styles.map)}>
			<svg ref={svgEl}></svg>
		</div>
	);
}
