import styles from "./MapVentagli.module.scss";
import classNames from "classnames";

export default function PlaceholderMapVentagli() {
	return <div className={classNames(styles.map, styles.placeholder, "position-relative")} />;
}