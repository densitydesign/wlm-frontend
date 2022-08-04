import Link from "next/link";
import styles from "./NavMenu.module.scss";
import { HiMenu } from "react-icons/hi";
import classNames from "classnames";

export default function NavMenu() {
	return (
		<div className={classNames("d-flex", "justify-content-start", "align-items-center", "mb-3")}>
			<h5>
				<Link href="/">W</Link>
				{"<"}3<Link href="/page">M</Link>
			</h5>
			<HiMenu />
		</div>
	);
}
