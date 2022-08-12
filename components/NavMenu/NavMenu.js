import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import styles from "./NavMenu.module.scss";
import { HiMenu } from "react-icons/hi";
import { GoHeart } from "react-icons/go";
import classNames from "classnames";

const HairyMenu = forwardRef(({ children, onClick }, ref) => (
	<Button
		href=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		size="sm"
		variant="lightBlue"
		className={classNames(styles.btnWlm, "w-100", "d-flex", "justify-content-between", "align-items-center")}
	>
		<span>{children}</span>
		<HiMenu className={classNames("ms-1")} />
	</Button>
));

HairyMenu.displayName = "HairyMenu";

export default function NavMenu() {
	const { basePath } = useRouter();
	const router = useRouter();

	const forceNavigation = (e, href) => {
		e.preventDefault();
		router.push(href);
		router.reload();
	};

	return (
		<Dropdown className={classNames("mb-2")} autoClose={true}>
			<Dropdown.Toggle as={HairyMenu} id="dropdown-autoclose-false">
				Wiki
				<GoHeart />
				Monuments
			</Dropdown.Toggle>

			<Dropdown.Menu className={classNames("w-100")}>
				<Dropdown.Item href={`/`} onClick={(e) => forceNavigation(e, `/`)}>
					Map
				</Dropdown.Item>
				<Link href={`/list`} passHref>
					<Dropdown.Item>List</Dropdown.Item>
				</Link>
				<Link href={`/about`} passHref>
					<Dropdown.Item>About</Dropdown.Item>
				</Link>
				<Dropdown.Item href="https://www.wikimedia.it/wiki-loves-monuments/">WikiLovesMonuments</Dropdown.Item>
				<Dropdown.Header>Contests</Dropdown.Header>
				<Dropdown.Item
					href={`/#selectedRegion=Umbria&dateFrom=2022-09-01&dateTo=2022-09-30`}
					onClick={(e) => forceNavigation(e, `/#selectedRegion=Umbria&dateFrom=2022-09-01&dateTo=2022-09-30`)}
				>
					2022: Castelli e fortificazioni
				</Dropdown.Item>
				<Dropdown.Item
					href={`/#selectedRegion=Umbria&dateFrom=2021-09-01&dateTo=2021-09-30`}
					onClick={(e) => forceNavigation(e, `/#selectedRegion=Umbria&dateFrom=2021-09-01&dateTo=2021-09-30`)}
				>
					Concorso 2021
				</Dropdown.Item>
				<Dropdown.Item
					href={`/#selectedRegion=Umbria&dateFrom=2020-09-01&dateTo=2020-09-30`}
					onClick={(e) => forceNavigation(e, `/#selectedRegion=Umbria&dateFrom=2020-09-01&dateTo=2020-09-30`)}
				>
					Concorso 2020
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
