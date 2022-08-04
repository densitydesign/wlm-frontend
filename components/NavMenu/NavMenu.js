import { forwardRef } from "react";
import Link from "next/link";
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
	  className={classNames(styles.btnWlm, "w-100", "d-flex", "justify-content-between", "align-items-center")}
	>
	  <span>{children}</span>
	  <HiMenu className={classNames("ms-1")} />
	</Button>
  ));
  

export default function NavMenu() {
	return (
		<Dropdown className={classNames("mb-3")} autoClose={true}>
        <Dropdown.Toggle as={HairyMenu} id="dropdown-autoclose-false">
			Wiki<GoHeart/>Monuments 
        </Dropdown.Toggle>

        <Dropdown.Menu className={classNames("w-100")}>
			<Dropdown.Item href="#">About</Dropdown.Item>
          	<Dropdown.Item href="#">WikiLovesMonuments</Dropdown.Item>
			<Dropdown.Header>Contests</Dropdown.Header>
			<Dropdown.Item href="#">2022: Castelli e fortificazioni</Dropdown.Item>
			<Dropdown.Item href="#">Concorso 2021</Dropdown.Item>
			<Dropdown.Item href="#">Concorso 2020</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
	);
}
