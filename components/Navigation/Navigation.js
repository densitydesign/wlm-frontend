import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav } from "react-bootstrap";
import classNames from "classnames";
import styles from "./Navigation.module.scss";
import navigationItems from "./navigation.json";

export default function Navigation() {
	const router = useRouter();
	return (
		<>
			<Navbar
				className={classNames(styles.navbar, "px-3")}
				sticky="top"
				expand="lg"
			>
				<Link href="/">
					<a className={classNames(styles.logo, "no-hover")}>
						Project Title
					</a>
				</Link>
				<Navbar.Toggle aria-controls="abilitiamo-main-navbar" />
				<Navbar.Collapse>
					<Nav className={classNames("ms-auto", "align-items-left")}>
						{navigationItems
							.filter((i) => i.menues.indexOf("main") > -1)
							.map((item) => {
								return (
									<Link key={item.label} href={item.url}>
										<a
											className={classNames(
												"nav-link",
												"no-hover",
												styles.item,
												{ [`${styles.active}`]: router.pathname == item.url },
												{
													[`${styles.specificPage}`]: item.url === "/dona-ora",
												}
											)}
										>
											{item.label}
										</a>
									</Link>
								);
							})}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
}